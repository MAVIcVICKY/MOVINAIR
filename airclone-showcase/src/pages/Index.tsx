import Layout from "@/components/layout/Layout";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryGrid from "@/components/CategoryGrid";
import ProductSection from "@/components/ProductSection";
import TrustBadges from "@/components/TrustBadges";
import InstagramFeed from "@/components/InstagramFeed";
import Reviews from "@/components/Reviews";
import { products, getNewProducts, getSaleProducts } from "@/data/products";

const Index = () => {
  const bestSellers = getSaleProducts().slice(0, 8);
  const newArrivals = getNewProducts().length > 0 ? getNewProducts() : products.slice(0, 8);

  return (
    <Layout>
      {/* Hero Section */}
      <HeroCarousel />

      {/* Categories */}
      <CategoryGrid />

      {/* Best Sellers */}
      <ProductSection
        title="Best Sellers"
        subtitle="Most popular shoes this season"
        products={bestSellers}
        viewAllLink="/shop?sale=true"
      />

      {/* New Arrivals */}
      <ProductSection
        title="New Arrivals"
        subtitle="Fresh styles just in"
        products={newArrivals}
        viewAllLink="/shop?new=true"
      />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Customer Reviews */}
      <Reviews />
    </Layout>
  );
};

export default Index;