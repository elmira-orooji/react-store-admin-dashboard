interface BrandLogoProps {
    /** Compact version removes the written wordmark. */
    compact?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ compact = false }) => {
    return (
        <span className="brand-logo" aria-label="ویترینو">
            <span className="brand-logo__mark" aria-hidden="true">
                و
            </span>
            {!compact && <span className="brand-logo__wordmark">ویترینو</span>}
        </span>
    );
};

export default BrandLogo;

