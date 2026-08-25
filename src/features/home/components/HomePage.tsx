import CategoryGrid from './CategoryGrid';
import HeroSection from './HeroSection';
import SpecialOffers from './SpecialOffers';
import '../home.css';

interface HomePageProps {
    /** Adds one unit of a selected product to the cart. */
    onAddToCart: (productName: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onAddToCart }) => {
    return (
        <div className="home-page">
            <HeroSection />
            <CategoryGrid />
            <SpecialOffers onAddToCart={onAddToCart} />
        </div>
    );
};

export default HomePage;
