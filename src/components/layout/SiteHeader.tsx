import {
    ChevronDown,
    CircleUserRound,
    MapPin,
    Menu,
    ShoppingCart,
    Sparkles,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import BrandLogo from '~components/brand/BrandLogo';

import SearchForm from './SearchForm';

interface SiteHeaderProps {
    /** Current number of products in the cart. */
    cartCount: number;
    /** Called after a search form is submitted. */
    onSearch: (query: string) => void;
}

const categories = [
    'کالای دیجیتال',
    'خانه و آشپزخانه',
    'مد و پوشاک',
    'زیبایی و سلامت',
    'ورزش و سفر',
    'کتاب و هنر',
] as const;

export const SiteHeader: React.FC<SiteHeaderProps> = ({ cartCount, onSearch }) => {
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
    const categoryMenuRef = useRef<HTMLDivElement>(null);

    const closeCategoryMenu = useCallback((): void => {
        setIsCategoryMenuOpen(false);
    }, []);

    const toggleCategoryMenu = useCallback((): void => {
        setIsCategoryMenuOpen((isOpen) => !isOpen);
    }, []);

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent): void => {
            if (
                categoryMenuRef.current !== null &&
                event.target instanceof Node &&
                !categoryMenuRef.current.contains(event.target)
            ) {
                closeCategoryMenu();
            }
        };

        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                closeCategoryMenu();
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeCategoryMenu]);

    return (
        <header className="site-header">
            <div className="site-header__campaign">
                <Sparkles aria-hidden="true" size={15} />
                <span>ارسال رایگان برای خریدهای بیشتر از دو میلیون تومان</span>
            </div>

            <div className="site-header__desktop">
                <div className="site-header__main content-container">
                    <a className="site-header__logo-link" href="#home">
                        <BrandLogo />
                    </a>
                    <SearchForm inputId="desktop-search" onSearch={onSearch} />
                    <div className="site-header__actions">
                        <a className="account-action" href="#account">
                            <CircleUserRound aria-hidden="true" size={20} strokeWidth={1.8} />
                            <span>ورود | ثبت‌نام</span>
                        </a>
                        <span className="site-header__separator" aria-hidden="true" />
                        <a className="icon-action cart-action" href="#cart" aria-label="سبد خرید">
                            <ShoppingCart aria-hidden="true" size={23} strokeWidth={1.8} />
                            {cartCount > 0 && (
                                <span className="cart-action__count">{cartCount.toLocaleString('fa-IR')}</span>
                            )}
                        </a>
                    </div>
                </div>

                <div className="site-header__nav-wrap">
                    <div className="site-header__nav content-container">
                        <nav className="primary-navigation" aria-label="ناوبری اصلی">
                            <div className="category-menu" ref={categoryMenuRef}>
                                <button
                                    className="category-menu__trigger"
                                    type="button"
                                    aria-expanded={isCategoryMenuOpen}
                                    aria-controls="category-menu-panel"
                                    onClick={toggleCategoryMenu}
                                >
                                    <Menu aria-hidden="true" size={19} />
                                    <span>دسته‌بندی کالاها</span>
                                    <ChevronDown aria-hidden="true" size={16} />
                                </button>
                                {isCategoryMenuOpen && (
                                    <div className="category-menu__panel" id="category-menu-panel">
                                        <p>دسته‌های پرطرفدار</p>
                                        <ul>
                                            {categories.map((category) => (
                                                <li key={category}>
                                                    <a href="#categories" onClick={closeCategoryMenu}>
                                                        {category}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <a href="#offers">پیشنهادهای امروز</a>
                            <a href="#best-sellers">پرفروش‌ترین‌ها</a>
                            <a href="#new-products">تازه‌ها</a>
                        </nav>
                        <button className="location-action" type="button">
                            <MapPin aria-hidden="true" size={17} strokeWidth={1.8} />
                            <span>انتخاب شهر</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="site-header__mobile content-container">
                <SearchForm
                    inputId="mobile-search"
                    className="site-search--mobile"
                    onSearch={onSearch}
                />
                <button className="mobile-location" type="button">
                    <MapPin aria-hidden="true" size={17} strokeWidth={1.8} />
                    <span>انتخاب نشانی ارسال</span>
                    <ChevronDown aria-hidden="true" size={15} />
                </button>
            </div>
        </header>
    );
};

export default SiteHeader;

