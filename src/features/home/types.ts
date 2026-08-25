export type CategoryIconName =
    | 'baby'
    | 'beauty'
    | 'book'
    | 'digital'
    | 'fashion'
    | 'home'
    | 'sport'
    | 'supermarket';

export type ProductArtworkKind = 'headphones' | 'mug' | 'serum' | 'shoe' | 'watch';

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

export interface OfferProduct {
    /** Stable product identifier. */
    id: string;
    /** Product title shown on its card. */
    title: string;
    /** Current selling price in toman. */
    price: number;
    /** Previous price in toman. */
    originalPrice: number;
    /** Discount percentage. */
    discount: number;
    /** Rating displayed as sample catalog data. */
    rating: number;
    /** Independent vector artwork variant. */
    artwork: ProductArtworkKind;
    /** Color treatment for the artwork surface. */
    tone: 'coral' | 'mint' | 'sand' | 'sky';
}
