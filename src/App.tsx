import { lazy, Suspense, useCallback, useEffect, useState } from 'react';

import AppShell from '@/app/AppShell';
import { getRouteFromHash, homeRoute } from '@/app/navigation';
import HomePage from '~features/home';

const ProductListPage = lazy(() => import('~features/product-list'));

const App: React.FC = () => {
    const [cartCount, setCartCount] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [route, setRoute] = useState(() => getRouteFromHash(window.location.hash) ?? homeRoute);

    useEffect(() => {
        const handleHashChange = (): void => {
            const nextRoute = getRouteFromHash(window.location.hash);
            if (nextRoute !== null) {
                setRoute(nextRoute);
                setFeedbackMessage('');
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    useEffect(() => {
        if (route.anchor) {
            document.getElementById(route.anchor)?.scrollIntoView({ behavior: 'instant' });
        } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [route]);

    const handleSearch = useCallback((query: string): void => {
        if (query.length > 0) {
            window.location.hash = `products?${new URLSearchParams({ q: query })}`;
        } else {
            setFeedbackMessage('برای جست‌وجو، نام محصول یا برند را وارد کنید.');
        }
    }, []);

    const handleAddToCart = useCallback((productName: string): void => {
        setCartCount((currentCount) => currentCount + 1);
        setFeedbackMessage(`«${productName}» به سبد خرید اضافه شد.`);
    }, []);

    return (
        <AppShell cartCount={cartCount} currentPage={route.page} onSearch={handleSearch}>
            {route.page === 'home' ? (
                <HomePage onAddToCart={handleAddToCart} />
            ) : (
                <Suspense fallback={<div className="page-loading" aria-label="در حال بارگذاری محصولات" />}>
                    <ProductListPage
                        key={JSON.stringify([route.query, route.categoryId])}
                        query={route.query}
                        initialCategoryId={route.categoryId}
                        onAddToCart={handleAddToCart}
                    />
                </Suspense>
            )}
            <div
                className={`shop-feedback${feedbackMessage.length > 0 ? ' shop-feedback--visible' : ''}`}
                role="status"
                aria-live="polite"
            >
                {feedbackMessage}
            </div>
        </AppShell>
    );
};

export default App;
