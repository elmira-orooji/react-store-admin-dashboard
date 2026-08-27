import { ArrowUpDown } from 'lucide-react';
import type { ChangeEvent } from 'react';

import { sortOptions } from '../data';
import type { SortOption } from '../types';

interface SortBarProps {
    /** Current number of matching products. */
    resultCount: number;
    /** Active sort option. */
    sort: SortOption;
    /** Updates the active sort option. */
    onSortChange: (value: SortOption) => void;
}

export const SortBar: React.FC<SortBarProps> = ({ resultCount, sort, onSortChange }) => {
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        onSortChange(event.target.value as SortOption);
    };

    return (
        <div className="sort-bar">
            <div className="sort-bar__options" aria-label="مرتب‌سازی محصولات">
                <span>
                    <ArrowUpDown aria-hidden="true" size={17} />
                    مرتب‌سازی:
                </span>
                {sortOptions.map((option) => (
                    <button
                        type="button"
                        className={sort === option.value ? 'sort-bar__option sort-bar__option--active' : 'sort-bar__option'}
                        onClick={() => onSortChange(option.value)}
                        aria-pressed={sort === option.value}
                        key={option.value}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            <label className="sort-bar__select">
                <span>مرتب‌سازی</span>
                <select value={sort} onChange={handleSelectChange}>
                    {sortOptions.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
            <span className="sort-bar__count">{resultCount.toLocaleString('fa-IR')} کالا</span>
        </div>
    );
};

export default SortBar;
