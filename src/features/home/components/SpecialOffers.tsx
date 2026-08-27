import { ChevronLeft, ChevronRight, Clock3 } from 'lucide-react';
import { useCallback, useRef } from 'react';

import ProductCard from '~components/product/ProductCard';

import { offerProducts } from '../data';

interface SpecialOffersProps {
    /** Adds one unit of a selected offer to the cart. */
    onAddToCart: (productName: string) => void;
}

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
                    <a href="#products">مشاهده همه</a>
                </div>

                <div className="special-offers__body">
                    <div className="special-offers__rail" ref={scrollerRef} tabIndex={0} aria-label="فهرست پیشنهادهای ویژه">
                        {offerProducts.map((product) => (
                            <ProductCard product={product} variant="offer" onAddToCart={onAddToCart} key={product.id} />
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
