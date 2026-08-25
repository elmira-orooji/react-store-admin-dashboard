import { ArrowLeft, ShieldCheck, Truck } from 'lucide-react';

export const HeroSection: React.FC = () => {
    return (
        <section className="home-hero content-container" id="home" aria-labelledby="home-title">
            <div className="home-hero__main">
                <div className="home-hero__copy">
                    <span className="home-hero__eyebrow">انتخاب تازه ویترینو</span>
                    <h1 id="home-title">تکنولوژی‌ای که با روز شما هماهنگ می‌شود.</h1>
                    <p>
                        مجموعه تازه ابزارهای هوشمند برای کار، ورزش و لحظه‌های روزمره؛
                        ساده انتخاب کنید و با خیال راحت مقایسه کنید.
                    </p>
                    <div className="home-hero__actions">
                        <a className="home-hero__primary-action" href="#special-offers">
                            دیدن مجموعه
                            <ArrowLeft aria-hidden="true" size={18} />
                        </a>
                        <a className="home-hero__secondary-action" href="#categories">
                            مرور دسته‌بندی‌ها
                        </a>
                    </div>
                    <div className="home-hero__assurance" aria-label="مزیت خرید آزمایشی">
                        <span>
                            <ShieldCheck aria-hidden="true" size={18} />
                            ضمانت بازگشت نمونه
                        </span>
                        <span>
                            <Truck aria-hidden="true" size={18} />
                            ارسال قابل پیگیری
                        </span>
                    </div>
                </div>

                <div className="hero-art" aria-hidden="true">
                    <span className="hero-art__halo" />
                    <span className="hero-art__orbit hero-art__orbit--one" />
                    <span className="hero-art__orbit hero-art__orbit--two" />
                    <span className="hero-art__phone" />
                    <span className="hero-art__watch">
                        <span />
                    </span>
                    <span className="hero-art__tag">NEW</span>
                </div>
            </div>

            <aside className="home-hero__side-card" aria-label="ارسال سریع ویترینو">
                <div className="home-hero__side-icon">
                    <Truck aria-hidden="true" size={26} />
                </div>
                <div>
                    <span>ویترینو اکسپرس</span>
                    <strong>امروز سفارش بده، زودتر تحویل بگیر.</strong>
                    <a href="#special-offers">
                        کالاهای آماده ارسال
                        <ArrowLeft aria-hidden="true" size={16} />
                    </a>
                </div>
            </aside>
        </section>
    );
};

export default HeroSection;
