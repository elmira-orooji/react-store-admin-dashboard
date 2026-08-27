import type { Product } from '~types/product';

import type { ProductFilters, SortOption } from '../types';

interface FilterProductsInput {
    products: readonly Product[];
    filters: ProductFilters;
    sort: SortOption;
    query: string;
}

export function filterProducts({ products, filters, sort, query }: FilterProductsInput): Product[] {
    const normalizedQuery = query.trim().toLocaleLowerCase('fa-IR');
    const filteredProducts = products.filter((product) => {
        const matchesQuery =
            normalizedQuery.length === 0 ||
            `${product.title} ${product.brand} ${product.categoryLabel}`
                .toLocaleLowerCase('fa-IR')
                .includes(normalizedQuery);
        const matchesCategory =
            filters.categoryIds.length === 0 || filters.categoryIds.includes(product.categoryId);
        const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand);
        const matchesAvailability = !filters.onlyAvailable || product.available;
        const matchesDiscount = !filters.onlyDiscounted || product.discount > 0;
        const matchesPrice = filters.maxPrice === null || product.price <= filters.maxPrice;

        return (
            matchesQuery &&
            matchesCategory &&
            matchesBrand &&
            matchesAvailability &&
            matchesDiscount &&
            matchesPrice
        );
    });

    return filteredProducts.sort((firstProduct, secondProduct) => {
        switch (sort) {
            case 'newest':
                return secondProduct.addedOrder - firstProduct.addedOrder;
            case 'price-asc':
                return firstProduct.price - secondProduct.price;
            case 'price-desc':
                return secondProduct.price - firstProduct.price;
            case 'discount':
                return secondProduct.discount - firstProduct.discount;
            case 'popular':
                return secondProduct.popularity - firstProduct.popularity;
        }
    });
}
