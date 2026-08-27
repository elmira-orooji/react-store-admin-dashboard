import { Plus, Star, Truck } from 'lucide-react';
import { memo, useCallback } from 'react';

import type { Product } from '~types/product';

import ProductArtwork from './ProductArtwork';
import './product-card.css';

interface ProductCardProps {
    /** Product data rendered by the card. */
    product: Product;
    /** Visual treatment based on the card context. */
    variant?: 'catalog' | 'offer';
    /** Adds one unit of the product to the cart. */
    onAddToCart: (productName: string) => void;
}

const priceFormatter = new Intl.NumberFormat('fa-IR');

export const ProductCard = memo<ProductCardProps>(function ProductCard({
    product,
    variant = 'catalog',
    onAddToCart,
}) {
    const handleAdd = useCallback((): void => {
        onAddToCart(product.title);
    }, [onAddToCart, product.title]);

    return (
        <article className={`product-card product-card--${variant}${product.available ? '' : ' product-card--unavailable'}`}>
            <a
                className="product-card__link"
                href={`#product-${product.id}`}
                aria-label={product.title}
            >
                <ProductArtwork label={product.title} kind={product.artwork} tone={product.tone} />
                {variant === 'catalog' && <span className="product-card__brand">{product.brand}</span>}
                <h3>{product.title}</h3>
            </a>
            <div className="product-card__meta">
                {product.fastDelivery && (
                    <span className="product-card__delivery">
                        <Truck aria-hidden="true" size={14} />
                        ارسال سریع
                    </span>
                )}
                <span className="product-card__rating" aria-label={`امتیاز ${product.rating.toLocaleString('fa-IR')} از ۵`}>
                    <Star aria-hidden="true" size={14} fill="currentColor" />
                    {product.rating.toLocaleString('fa-IR')}
                </span>
            </div>
            <div className="product-card__pricing">
                {product.discount > 0 && (
                    <span className="product-card__discount">{product.discount.toLocaleString('fa-IR')}٪</span>
                )}
                <strong aria-label={`${priceFormatter.format(product.price)} تومان`}>
                    {priceFormatter.format(product.price)}
                    <small>تومان</small>
                </strong>
                {product.discount > 0 && (
                    <del aria-label={`قیمت قبلی ${priceFormatter.format(product.originalPrice)} تومان`}>
                        {priceFormatter.format(product.originalPrice)}
                    </del>
                )}
            </div>
            <button
                className="product-card__add"
                type="button"
                onClick={handleAdd}
                disabled={!product.available}
                aria-label={product.available ? `افزودن ${product.title} به سبد خرید` : `${product.title} ناموجود است`}
            >
                {product.available ? <Plus aria-hidden="true" size={18} /> : <span>ناموجود</span>}
            </button>
        </article>
    );
});

export default ProductCard;
