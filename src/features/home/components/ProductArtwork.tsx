import type { ProductArtworkKind } from '../types';

interface ProductArtworkProps {
    /** Product name used as the accessible image label. */
    label: string;
    /** Artwork variant that represents the product. */
    kind: ProductArtworkKind;
    /** Background color treatment. */
    tone: 'coral' | 'mint' | 'sand' | 'sky';
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({ label, kind, tone }) => {
    return (
        <div className={`product-artwork product-artwork--${tone}`}>
            <svg viewBox="0 0 240 200" role="img" aria-label={`تصویرسازی ${label}`}>
                {kind === 'headphones' && (
                    <g className="artwork-headphones">
                        <path d="M63 112V91c0-35 24-59 57-59s57 24 57 59v21" />
                        <rect x="44" y="96" width="35" height="69" rx="16" />
                        <rect x="161" y="96" width="35" height="69" rx="16" />
                        <path d="M79 124c8-6 13-6 20-5M161 124c-8-6-13-6-20-5" />
                    </g>
                )}
                {kind === 'watch' && (
                    <g className="artwork-watch">
                        <path d="M98 18h44l8 42H90l8-42ZM90 140h60l-8 42H98l-8-42Z" />
                        <rect x="70" y="50" width="100" height="100" rx="29" />
                        <rect x="83" y="63" width="74" height="74" rx="20" />
                        <path d="m101 102 14 13 27-34" />
                    </g>
                )}
                {kind === 'mug' && (
                    <g className="artwork-mug">
                        <path d="M77 42h82l-7 116a17 17 0 0 1-17 16H101a17 17 0 0 1-17-16L77 42Z" />
                        <path d="M83 75h77M91 140h62" />
                        <path d="M159 74h12c26 0 29 48 2 53h-17" />
                        <rect x="87" y="24" width="62" height="23" rx="9" />
                    </g>
                )}
                {kind === 'shoe' && (
                    <g className="artwork-shoe">
                        <path d="M47 123c14-6 26-18 35-48l22 12c9 20 32 28 65 32 14 2 24 12 24 27v7H48c-20 0-24-23-1-30Z" />
                        <path d="M64 112c18 10 43 17 70 19M105 92l-17 18M121 102l-16 15M49 153h143" />
                    </g>
                )}
                {kind === 'serum' && (
                    <g className="artwork-serum">
                        <path d="M102 23h36v40h-36zM94 63h52l9 30v72c0 10-8 18-18 18h-34c-10 0-18-8-18-18V93l9-30Z" />
                        <path d="M110 23V10h20v13M85 104h70" />
                        <path d="M120 124c14 15 14 24 0 36-14-12-14-21 0-36Z" />
                    </g>
                )}
            </svg>
        </div>
    );
};

export default ProductArtwork;
