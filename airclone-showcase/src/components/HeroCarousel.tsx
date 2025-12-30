import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/products";
import { cn } from "@/lib/utils";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden bg-gradient-to-br from-background via-secondary to-primary/20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Orange accent shapes */}
        <div className="absolute -right-20 top-0 w-[60%] h-full bg-primary/10 skew-x-12" />
        <div className="absolute -right-10 bottom-0 w-40 h-40 md:w-80 md:h-80 bg-primary rounded-full translate-x-1/2 translate-y-1/4" />
        <div className="absolute right-20 top-10 w-20 h-20 md:w-40 md:h-40 bg-foreground/80 rounded-full" />
      </div>

      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 flex items-center transition-all duration-700",
            index === currentSlide
              ? "opacity-100 translate-x-0"
              : index < currentSlide
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
          )}
        >
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div className="space-y-6 text-left">
                <span className="inline-block bg-foreground text-background text-xs md:text-sm font-medium px-4 py-2">
                  {slide.subtitle}
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                  {slide.title}
                </h1>
                <Link
                  to={slide.link}
                  className="inline-block btn-primary"
                >
                  Shop Now
                </Link>
              </div>

              {/* Image */}
              <div className="relative hidden lg:flex justify-center">
                <div className="relative w-[500px] h-[500px] rounded-full overflow-hidden border-8 border-background shadow-2xl">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background/80 hover:bg-background text-foreground rounded-full shadow-lg transition-all z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background/80 hover:bg-background text-foreground rounded-full shadow-lg transition-all z-20"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentSlide
                ? "bg-foreground w-8"
                : "bg-foreground/30 hover:bg-foreground/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;