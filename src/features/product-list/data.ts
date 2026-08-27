import type { FilterOption, ProductFilters, SortOption } from './types';

export const categoryOptions: readonly FilterOption[] = [
    { value: 'digital', label: 'کالای دیجیتال' },
    { value: 'home-kitchen', label: 'خانه و آشپزخانه' },
    { value: 'fashion', label: 'مد و پوشاک' },
    { value: 'beauty', label: 'زیبایی و سلامت' },
    { value: 'sport', label: 'ورزش و سفر' },
    { value: 'kids', label: 'کودک و سرگرمی' },
    { value: 'books', label: 'کتاب و هنر' },
    { value: 'supermarket', label: 'سوپرمارکت' },
];

export const brandOptions: readonly FilterOption[] = [
    { value: 'نوا', label: 'نوا' },
    { value: 'هومیا', label: 'هومیا' },
    { value: 'ریو', label: 'ریو' },
    { value: 'لونا', label: 'لونا' },
    { value: 'سونیک', label: 'سونیک' },
    { value: 'اوربیت', label: 'اوربیت' },
];

export const sortOptions: readonly { value: SortOption; label: string }[] = [
    { value: 'popular', label: 'پربازدیدترین' },
    { value: 'newest', label: 'جدیدترین' },
    { value: 'price-asc', label: 'ارزان‌ترین' },
    { value: 'price-desc', label: 'گران‌ترین' },
    { value: 'discount', label: 'بیشترین تخفیف' },
];

export const defaultFilters: ProductFilters = {
    categoryIds: [],
    brands: [],
    onlyAvailable: false,
    onlyDiscounted: false,
    maxPrice: null,
};
