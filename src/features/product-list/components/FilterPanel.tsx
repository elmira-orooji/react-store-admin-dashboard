import { RotateCcw, X } from 'lucide-react';

import { brandOptions, categoryOptions } from '../data';
import type { ProductFilters } from '../types';

interface FilterPanelProps {
    /** Number of active filter values. */
    activeFilterCount: number;
    /** Current filter values. */
    filters: ProductFilters;
    /** Prefix used to keep duplicated mobile and desktop control IDs unique. */
    idPrefix: string;
    /** Current number of matching products. */
    resultCount: number;
    /** Whether the mobile close action is shown. */
    showClose?: boolean;
    /** Closes the mobile filter drawer. */
    onClose?: () => void;
    /** Clears all filter values. */
    onReset: () => void;
    /** Updates the maximum price. */
    onMaxPriceChange: (value: number | null) => void;
    /** Updates the available-only filter. */
    onOnlyAvailableChange: (value: boolean) => void;
    /** Updates the discounted-only filter. */
    onOnlyDiscountedChange: (value: boolean) => void;
    /** Toggles one brand value. */
    onBrandToggle: (value: string) => void;
    /** Toggles one category value. */
    onCategoryToggle: (value: string) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
    activeFilterCount,
    filters,
    idPrefix,
    resultCount,
    showClose = false,
    onClose,
    onReset,
    onMaxPriceChange,
    onOnlyAvailableChange,
    onOnlyDiscountedChange,
    onBrandToggle,
    onCategoryToggle,
}) => {
    return (
        <div className="filter-panel">
            <div className="filter-panel__heading">
                <div>
                    <strong>فیلترها</strong>
                    {activeFilterCount > 0 && <span>{activeFilterCount.toLocaleString('fa-IR')} انتخاب</span>}
                </div>
                {showClose && (
                    <button type="button" onClick={onClose} aria-label="بستن فیلترها">
                        <X aria-hidden="true" size={21} />
                    </button>
                )}
            </div>

            <fieldset className="filter-group">
                <legend>دسته‌بندی</legend>
                {categoryOptions.map((option) => (
                    <label className="filter-check" htmlFor={`${idPrefix}-category-${option.value}`} key={option.value}>
                        <input
                            id={`${idPrefix}-category-${option.value}`}
                            type="checkbox"
                            checked={filters.categoryIds.includes(option.value)}
                            onChange={() => onCategoryToggle(option.value)}
                        />
                        <span>{option.label}</span>
                    </label>
                ))}
            </fieldset>

            <fieldset className="filter-group">
                <legend>برند</legend>
                <div className="filter-group__brands">
                    {brandOptions.map((option) => (
                        <label className="filter-check" htmlFor={`${idPrefix}-brand-${option.value}`} key={option.value}>
                            <input
                                id={`${idPrefix}-brand-${option.value}`}
                                type="checkbox"
                                checked={filters.brands.includes(option.value)}
                                onChange={() => onBrandToggle(option.value)}
                            />
                            <span>{option.label}</span>
                        </label>
                    ))}
                </div>
            </fieldset>

            <fieldset className="filter-group">
                <legend>محدوده قیمت</legend>
                {[
                    { label: 'بدون محدودیت', value: null },
                    { label: 'تا ۱ میلیون تومان', value: 1_000_000 },
                    { label: 'تا ۲ میلیون تومان', value: 2_000_000 },
                    { label: 'تا ۳ میلیون تومان', value: 3_000_000 },
                ].map((option) => (
                    <label className="filter-check" htmlFor={`${idPrefix}-price-${option.value ?? 'all'}`} key={option.label}>
                        <input
                            id={`${idPrefix}-price-${option.value ?? 'all'}`}
                            type="radio"
                            name={`${idPrefix}-max-price`}
                            checked={filters.maxPrice === option.value}
                            onChange={() => onMaxPriceChange(option.value)}
                        />
                        <span>{option.label}</span>
                    </label>
                ))}
            </fieldset>

            <div className="filter-switches">
                <label className="filter-switch" htmlFor={`${idPrefix}-available`}>
                    <span>فقط کالاهای موجود</span>
                    <input
                        id={`${idPrefix}-available`}
                        type="checkbox"
                        checked={filters.onlyAvailable}
                        onChange={(event) => onOnlyAvailableChange(event.target.checked)}
                    />
                    <span aria-hidden="true" />
                </label>
                <label className="filter-switch" htmlFor={`${idPrefix}-discounted`}>
                    <span>فقط کالاهای تخفیف‌دار</span>
                    <input
                        id={`${idPrefix}-discounted`}
                        type="checkbox"
                        checked={filters.onlyDiscounted}
                        onChange={(event) => onOnlyDiscountedChange(event.target.checked)}
                    />
                    <span aria-hidden="true" />
                </label>
            </div>

            <div className="filter-panel__footer">
                <button className="filter-panel__apply" type="button" onClick={onClose}>
                    نمایش {resultCount.toLocaleString('fa-IR')} کالا
                </button>
                <button className="filter-panel__reset" type="button" onClick={onReset} disabled={activeFilterCount === 0}>
                    <RotateCcw aria-hidden="true" size={15} />
                    پاک‌کردن فیلترها
                </button>
            </div>
        </div>
    );
};

export default FilterPanel;
