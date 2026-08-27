export interface StorefrontRoute {
    page: 'home' | 'products';
    query: string;
    categoryId: string;
    anchor: string;
}

export const homeRoute: StorefrontRoute = {
    page: 'home',
    query: '',
    categoryId: '',
    anchor: '',
};

export function getRouteFromHash(hash: string): StorefrontRoute | null {
    const [path, search = ''] = hash.slice(1).split('?');

    if (path === 'products' || path.startsWith('product-')) {
        const params = new URLSearchParams(search);
        return {
            page: 'products',
            query: params.get('q')?.trim() ?? '',
            categoryId: params.get('category') ?? '',
            anchor: '',
        };
    }

    if (path === '' || path === 'home' || path === 'categories' || path === 'special-offers') {
        return { ...homeRoute, anchor: path === 'categories' || path === 'special-offers' ? path : '' };
    }

    // In-page anchors and unfinished destinations must not replace the current page.
    return null;
}
