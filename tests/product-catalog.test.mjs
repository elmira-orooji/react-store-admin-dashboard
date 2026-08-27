import assert from 'node:assert/strict';
import { test } from 'node:test';

import { getRouteFromHash } from '../src/app/navigation.ts';
import { products } from '../src/data/products.ts';
import { defaultFilters } from '../src/features/product-list/data.ts';
import { filterProducts } from '../src/features/product-list/helpers/filterProducts.ts';

const findProducts = (filters = {}, sort = 'popular', query = '') =>
    filterProducts({ products, filters: { ...defaultFilters, ...filters }, sort, query });

test('the unfiltered catalog includes every sample product', () => {
    assert.equal(findProducts().length, products.length);
});

test('category, brand and availability filters work together', () => {
    assert.equal(findProducts({ categoryIds: ['digital'] }).length, 4);
    assert.equal(findProducts({ categoryIds: ['digital'], onlyAvailable: true }).length, 3);
    assert.equal(findProducts({ brands: ['هومیا'] }).length, 3);
    assert.equal(findProducts({ categoryIds: ['digital'], brands: ['هومیا'] }).length, 0);
});

test('discount and inclusive price limits exclude nonmatching products', () => {
    assert.equal(findProducts({ onlyDiscounted: true }).length, 10);
    assert.equal(findProducts({ maxPrice: 1_000_000 }).length, 5);
    assert.equal(findProducts({ maxPrice: 385_000 })[0].id, 'homia-ceramic-mug');
});

test('search matches brands and ignores surrounding whitespace and Latin case', () => {
    assert.equal(findProducts({}, 'popular', '  هومیا  ').length, 3);
    assert.equal(findProducts({}, 'popular', 'air 2')[0].id, 'nova-air-2');
    assert.equal(findProducts({}, 'popular', 'محصول نامشخص').length, 0);
});

for (const [sort, field, direction] of [
    ['price-asc', 'price', 1],
    ['price-desc', 'price', -1],
    ['popular', 'popularity', -1],
    ['newest', 'addedOrder', -1],
    ['discount', 'discount', -1],
]) {
    test(`sorts by ${sort} without mutating the shared catalog`, () => {
        const sourceOrder = products.map((product) => product.id);
        const result = findProducts({}, sort);
        assert.ok(result.every((product, index) =>
            index === 0 || direction * (product[field] - result[index - 1][field]) >= 0));
        assert.deepEqual(products.map((product) => product.id), sourceOrder);
    });
}

test('catalog routes restore search and category from the URL', () => {
    const route = getRouteFromHash('#products?q=%D9%84%D9%88%D9%86%D8%A7&category=beauty');
    assert.equal(route.page, 'products');
    assert.equal(route.query, 'لونا');
    assert.equal(route.categoryId, 'beauty');
    assert.equal(getRouteFromHash('#products').query, '');
    assert.equal(getRouteFromHash('#products').categoryId, '');
});

test('home section links keep their anchors while skip links leave the route unchanged', () => {
    assert.equal(getRouteFromHash('#special-offers').anchor, 'special-offers');
    assert.equal(getRouteFromHash('#categories').page, 'home');
    assert.equal(getRouteFromHash('#home').anchor, '');
    assert.equal(getRouteFromHash('#main-content'), null);
    assert.equal(getRouteFromHash('#products-unknown'), null);
});
