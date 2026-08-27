import { useCallback, useMemo, useState } from 'react';

import { products } from '@/data/products';

import { defaultFilters } from '../data';
import { filterProducts } from '../helpers/filterProducts';
import type { ProductFilters, SortOption } from '../types';

interface UseProductFiltersResult {
    activeFilterCount: number;
    filters: ProductFilters;
    filteredProducts: ReturnType<typeof filterProducts>;
    resetFilters: () => void;
    setMaxPrice: (value: number | null) => void;
    setOnlyAvailable: (value: boolean) => void;
    setOnlyDiscounted: (value: boolean) => void;
    setSort: (value: SortOption) => void;
    sort: SortOption;
    toggleBrand: (value: string) => void;
    toggleCategory: (value: string) => void;
}

function toggleListValue(values: readonly string[], value: string): readonly string[] {
    return values.includes(value)
        ? values.filter((currentValue) => currentValue !== value)
        : [...values, value];
}

export function useProductFilters(query: string, initialCategoryId: string): UseProductFiltersResult {
    const [filters, setFilters] = useState<ProductFilters>(() => ({
        ...defaultFilters,
        categoryIds: initialCategoryId ? [initialCategoryId] : [],
    }));
    const [sort, setSort] = useState<SortOption>('popular');

    const filteredProducts = useMemo(
        () => filterProducts({ products, filters, sort, query }),
        [filters, query, sort],
    );

    const activeFilterCount = useMemo(
        () =>
            filters.categoryIds.length +
            filters.brands.length +
            Number(filters.onlyAvailable) +
            Number(filters.onlyDiscounted) +
            Number(filters.maxPrice !== null),
        [filters],
    );

    const toggleCategory = useCallback((value: string): void => {
        setFilters((currentFilters) => ({
            ...currentFilters,
            categoryIds: toggleListValue(currentFilters.categoryIds, value),
        }));
    }, []);

    const toggleBrand = useCallback((value: string): void => {
        setFilters((currentFilters) => ({
            ...currentFilters,
            brands: toggleListValue(currentFilters.brands, value),
        }));
    }, []);

    const setOnlyAvailable = useCallback((value: boolean): void => {
        setFilters((currentFilters) => ({ ...currentFilters, onlyAvailable: value }));
    }, []);

    const setOnlyDiscounted = useCallback((value: boolean): void => {
        setFilters((currentFilters) => ({ ...currentFilters, onlyDiscounted: value }));
    }, []);

    const setMaxPrice = useCallback((value: number | null): void => {
        setFilters((currentFilters) => ({ ...currentFilters, maxPrice: value }));
    }, []);

    const resetFilters = useCallback((): void => {
        setFilters(defaultFilters);
    }, []);

    return {
        activeFilterCount,
        filters,
        filteredProducts,
        resetFilters,
        setMaxPrice,
        setOnlyAvailable,
        setOnlyDiscounted,
        setSort,
        sort,
        toggleBrand,
        toggleCategory,
    };
}
