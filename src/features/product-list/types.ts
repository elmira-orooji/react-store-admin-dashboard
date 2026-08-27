export type SortOption = 'discount' | 'newest' | 'popular' | 'price-asc' | 'price-desc';

export interface ProductFilters {
    /** Selected category identifiers. */
    categoryIds: readonly string[];
    /** Selected sample brands. */
    brands: readonly string[];
    /** Hide unavailable products when enabled. */
    onlyAvailable: boolean;
    /** Show only discounted products when enabled. */
    onlyDiscounted: boolean;
    /** Maximum price in toman, or null for no limit. */
    maxPrice: number | null;
}

export interface FilterOption {
    /** Stable filter value. */
    value: string;
    /** User-facing label. */
    label: string;
}
