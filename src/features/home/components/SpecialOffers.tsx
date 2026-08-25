import { ChevronLeft, ChevronRight, Clock3, Plus, Star } from 'lucide-react';
import { memo, useCallback, useRef } from 'react';

import { offerProducts } from '../data';
import type { OfferProduct } from '../types';
import ProductArtwork from './ProductArtwork';

interface ProductCardProps {
    /** Product data rendered by the card. */
    product: OfferProduct;
    /** Adds one unit of the product to the cart. */
    onAddToCart: (productName: string) => void;
}

interface SpecialOffersProps {
    /** Adds one unit of a selected offer to the cart. */
    onAddToCart: (productName: string) => void;
}

const priceFormatter = new Intl.NumberFormat('fa-IR');

const ProductCard = memo<ProductCardProps>(function ProductCard({ product, onAddToCart }) {
    const handleAdd = useCallback((): void => {
        onAddToCart(product.title);
    }, [onAddToCart, product.title]);

    return (
        <article className="offer-card">
            <a
                className="offer-card__link"
                href={`#product-${product.id}`}
                aria-label={product.title}
            >
                <ProductArtwork label={product.title} kind={product.artwork} tone={product.tone} />
                <h3>{product.title}</h3>
            </a>
            <div className="offer-card__rating" aria-label={`امتیاز ${product.rating.toLocaleString('fa-IR')} از ۵`}>
                <Star aria-hidden="true" size={14} fill="currentColor" />
                <span>{product.rating.toLocaleString('fa-IR')}</span>
            </div>
            <div className="offer-card__pricing">
                <span className="offer-card__discount">{product.discount.toLocaleString('fa-IR')}٪</span>
                <strong aria-label={`${priceFormatter.format(product.price)} تومان`}>
                    {priceFormatter.format(product.price)}
                    <small>تومان</small>
                </strong>
                <del aria-label={`قیمت قبلی ${priceFormatter.format(product.originalPrice)} تومان`}>
                    {priceFormatter.format(product.originalPrice)}
                </del>
            </div>
            <button className="offer-card__add" type="button" onClick={handleAdd} aria-label={`افزودن ${product.title} به سبد خرید`}>
                <Plus aria-hidden="true" size={18} />
            </button>
        </article>
    );
});

export const SpecialOffers: React.FC<SpecialOffersProps> = ({ onAddToCart }) => {
    const scrollerRef = useRef<HTMLDivElement>(null);

    const scrollOffers = useCallback((distance: number): void => {
        scrollerRef.current?.scrollBy({ left: distance, behavior: 'smooth' });
    }, []);

    const handleNext = useCallback((): void => {
        scrollOffers(-280);
    }, [scrollOffers]);

    const handlePrevious = useCallback((): void => {
        scrollOffers(280);
    }, [scrollOffers]);

    return (
        <section className="special-offers" id="special-offers" aria-labelledby="special-offers-title">
            <div className="special-offers__inner content-container">
                <div className="special-offers__header">
                    <div>
                        <span className="special-offers__eyebrow">فرصت محدود امروز</span>
                        <h2 id="special-offers-title">پیشنهادهای ویترینو</h2>
                    </div>
                    <div className="special-offers__timer" aria-label="تا پایان امروز">
                        <Clock3 aria-hidden="true" size={18} />
                        <span>تا پایان امروز</span>
                        <bdi>۰۸ : ۲۴ : ۳۶</bdi>
                    </div>
                    <a href="#all-offers">مشاهده همه</a>
                </div>

                <div className="special-offers__body">
                    <div className="special-offers__rail" ref={scrollerRef} tabIndex={0} aria-label="فهرست پیشنهادهای ویژه">
                        {offerProducts.map((product) => (
                            <ProductCard product={product} onAddToCart={onAddToCart} key={product.id} />
                        ))}
                    </div>
                    <div className="special-offers__controls" aria-label="کنترل پیمایش پیشنهادها">
                        <button type="button" onClick={handlePrevious} aria-label="پیشنهادهای قبلی">
                            <ChevronRight aria-hidden="true" size={21} />
                        </button>
                        <button type="button" onClick={handleNext} aria-label="پیشنهادهای بعدی">
                            <ChevronLeft aria-hidden="true" size={21} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffers;
