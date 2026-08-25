import { useCallback, useState } from 'react';

import AppShell from '@/app/AppShell';

const App: React.FC = () => {
    const [searchAnnouncement, setSearchAnnouncement] = useState(
        'جست‌وجوی محصول یا برند را از بالای صفحه شروع کنید.',
    );

    const handleSearch = useCallback((query: string): void => {
        setSearchAnnouncement(
            query.length > 0
                ? `جست‌وجوی «${query}» در مرحله صفحه نتایج تکمیل می‌شود.`
                : 'برای جست‌وجو، نام محصول یا برند را وارد کنید.',
        );
    }, []);

    return (
        <AppShell cartCount={0} onSearch={handleSearch}>
            <section className="shell-intro" id="home" aria-labelledby="shell-intro-title">
                <div className="shell-intro__copy">
                    <span className="shell-intro__eyebrow">خرید ساده، انتخاب مطمئن</span>
                    <h1 id="shell-intro-title">هر چیزی که برای امروز لازم دارید، یک‌جا.</h1>
                    <p>
                        بین دسته‌بندی‌ها بگردید، محصول موردنظرتان را پیدا کنید و یک خرید
                        سریع و بی‌دردسر را تجربه کنید.
                    </p>
                    <p className="shell-intro__status" role="status" aria-live="polite">
                        {searchAnnouncement}
                    </p>
                </div>
                <div className="shell-intro__composition" aria-hidden="true">
                    <span className="shell-intro__orb" />
                    <span className="shell-intro__phone" />
                    <span className="shell-intro__parcel shell-intro__parcel--small" />
                    <span className="shell-intro__parcel shell-intro__parcel--large" />
                </div>
            </section>
        </AppShell>
    );
};

export default App;
