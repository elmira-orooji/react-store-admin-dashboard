import {
    Baby,
    BookOpen,
    Dumbbell,
    HeartPulse,
    House,
    Laptop,
    Shirt,
    ShoppingBasket,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { homeCategories } from '../data';
import type { CategoryIconName } from '../types';

const categoryIcons: Record<CategoryIconName, LucideIcon> = {
    baby: Baby,
    beauty: HeartPulse,
    book: BookOpen,
    digital: Laptop,
    fashion: Shirt,
    home: House,
    sport: Dumbbell,
    supermarket: ShoppingBasket,
};

export const CategoryGrid: React.FC = () => {
    return (
        <section className="home-categories content-container" id="categories" aria-labelledby="categories-title">
            <div className="home-section-heading">
                <div>
                    <span>مسیر کوتاه‌تر برای انتخاب</span>
                    <h2 id="categories-title">دسته‌بندی‌های پرکاربرد</h2>
                </div>
                <a href="#categories">مشاهده همه دسته‌ها</a>
            </div>

            <div className="home-categories__grid">
                {homeCategories.map((category) => {
                    const Icon = categoryIcons[category.icon];

                    return (
                        <a className="category-tile" href={`#category-${category.id}`} key={category.id}>
                            <span className={`category-tile__art category-tile__art--${category.tone}`}>
                                <Icon aria-hidden="true" size={31} strokeWidth={1.6} />
                            </span>
                            <strong>{category.title}</strong>
                        </a>
                    );
                })}
            </div>
        </section>
    );
};

export default CategoryGrid;
