import { featuredProducts } from '@/data/products';

import type { HomeCategory } from './types';

export const homeCategories: readonly HomeCategory[] = [
    { id: 'digital', title: 'کالای دیجیتال', icon: 'digital', tone: 'sky' },
    { id: 'home-kitchen', title: 'خانه و آشپزخانه', icon: 'home', tone: 'mint' },
    { id: 'fashion', title: 'مد و پوشاک', icon: 'fashion', tone: 'coral' },
    { id: 'beauty', title: 'زیبایی و سلامت', icon: 'beauty', tone: 'sand' },
    { id: 'sport', title: 'ورزش و سفر', icon: 'sport', tone: 'sky' },
    { id: 'kids', title: 'کودک و سرگرمی', icon: 'baby', tone: 'coral' },
    { id: 'books', title: 'کتاب و هنر', icon: 'book', tone: 'mint' },
    { id: 'supermarket', title: 'سوپرمارکت', icon: 'supermarket', tone: 'sand' },
];

export const offerProducts = featuredProducts;
