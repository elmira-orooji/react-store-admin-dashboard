import type { ReactNode } from 'react';

import MobileNavigation from '~components/layout/MobileNavigation';
import SiteHeader from '~components/layout/SiteHeader';

interface AppShellProps {
    /** Content rendered between the shared header and mobile navigation. */
    children: ReactNode;
    /** Current number of products in the cart. */
    cartCount: number;
    /** Called after either search form is submitted. */
    onSearch: (query: string) => void;
}

export const AppShell: React.FC<AppShellProps> = ({ children, cartCount, onSearch }) => {
    return (
        <div className="app-shell">
            <a className="skip-link" href="#main-content">
                رفتن به محتوای اصلی
            </a>
            <SiteHeader cartCount={cartCount} onSearch={onSearch} />
            <main className="app-shell__main" id="main-content">
                {children}
            </main>
            <MobileNavigation cartCount={cartCount} />
        </div>
    );
};

export default AppShell;

