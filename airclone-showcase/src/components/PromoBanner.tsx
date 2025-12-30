import { Link } from "react-router-dom";

const PromoBanner = () => {
  return (
    <section className="py-16 bg-foreground text-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <span className="inline-block border border-primary text-primary text-sm font-medium px-4 py-2">
              LIMITED TIME OFFER
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Up to 70% Off
              <br />
              <span className="text-primary">End of Season Sale</span>
            </h2>
            <p className="text-background/70 text-lg">
              Don't miss out on our biggest sale of the year. Premium quality footwear at unbeatable prices.
            </p>
            <Link
              to="/shop?sale=true"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 font-semibold hover:brightness-110 transition-all"
            >
              Shop Sale Now
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop"
              alt="Sale shoes"
              className="w-full aspect-square object-cover"
            />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-center text-sm">
                UP TO<br />70%<br />OFF
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;