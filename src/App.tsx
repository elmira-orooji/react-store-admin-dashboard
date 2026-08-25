import { useCallback, useState } from 'react';

import AppShell from '@/app/AppShell';
import HomePage from '~features/home';

const App: React.FC = () => {
    const [cartCount, setCartCount] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const handleSearch = useCallback((query: string): void => {
        setFeedbackMessage(
            query.length > 0
                ? `جست‌وجوی «${query}» در مرحله صفحه نتایج تکمیل می‌شود.`
                : 'برای جست‌وجو، نام محصول یا برند را وارد کنید.',
        );
    }, []);

    const handleAddToCart = useCallback((productName: string): void => {
        setCartCount((currentCount) => currentCount + 1);
        setFeedbackMessage(`«${productName}» به سبد خرید اضافه شد.`);
    }, []);

    return (
        <AppShell cartCount={cartCount} onSearch={handleSearch}>
            <HomePage onAddToCart={handleAddToCart} />
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
