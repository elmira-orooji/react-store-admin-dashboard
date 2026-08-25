import { Search } from 'lucide-react';
import type { FormEvent } from 'react';

interface SearchFormProps {
    /** Unique input identifier for desktop and mobile instances. */
    inputId: string;
    /** Extra class name for layout-specific styling. */
    className?: string;
    /** Called with a trimmed query when the form is submitted. */
    onSearch: (query: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
    inputId,
    className = '',
    onSearch,
}) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const queryValue = formData.get('query');
        onSearch(typeof queryValue === 'string' ? queryValue.trim() : '');
    };

    return (
        <form
            className={`site-search ${className}`.trim()}
            role="search"
            onSubmit={handleSubmit}
        >
            <label className="sr-only" htmlFor={inputId}>
                جست‌وجوی محصول یا برند
            </label>
            <Search aria-hidden="true" size={20} strokeWidth={1.8} />
            <input
                id={inputId}
                name="query"
                type="search"
                placeholder="جست‌وجوی محصول یا برند"
                autoComplete="off"
            />
            <button type="submit">جست‌وجو</button>
        </form>
    );
};

export default SearchForm;

