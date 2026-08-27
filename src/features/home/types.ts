export type CategoryIconName =
    | 'baby'
    | 'beauty'
    | 'book'
    | 'digital'
    | 'fashion'
    | 'home'
    | 'sport'
    | 'supermarket';

export interface HomeCategory {
    /** Stable identifier used for links and list rendering. */
    id: string;
    /** User-facing category name. */
    title: string;
    /** Icon key resolved by the category grid. */
    icon: CategoryIconName;
    /** Color variant for the category artwork. */
    tone: 'coral' | 'mint' | 'sand' | 'sky';
}
