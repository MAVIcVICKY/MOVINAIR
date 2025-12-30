import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Share2, Minus, Plus, Truck, RotateCcw, Shield, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductSection from "@/components/ProductSection";
import { getProductBySlug, products } from "@/data/products";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug || "");

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-primary hover:underline">
            Back to Shop
          </Link>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    toast.success(`${product.name} added to cart!`);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <ChevronRight size={14} className="text-muted-foreground" />
            <Link to="/shop" className="text-muted-foreground hover:text-foreground">
              Shop
            </Link>
            <ChevronRight size={14} className="text-muted-foreground" />
            <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-secondary overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "w-20 h-20 border-2 overflow-hidden transition-colors",
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent hover:border-muted-foreground"
                  )}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex items-center gap-3">
              {product.isSale && (
                <span className="bg-sale text-background text-xs font-semibold px-3 py-1">
                  SALE
                </span>
              )}
              {product.isNew && (
                <span className="bg-foreground text-background text-xs font-semibold px-3 py-1">
                  NEW
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4">
              {product.originalPrice > product.price && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-2xl font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.discount > 0 && (
                <span className="bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded">
                  -{product.discount}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">Select Size (UK)</span>
                <button className="text-sm text-primary hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "w-12 h-12 border-2 font-medium transition-all",
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-foreground"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Pincode Checker */}
            <div>
              <span className="font-semibold mb-3 block">Check Delivery</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  maxLength={6}
                  className="flex-1 px-4 py-2 border border-border rounded focus:outline-none focus:border-black"
                />
                <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors font-medium">
                  Check
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Check availability at your location
              </p>
            </div>

            {/* Quantity */}
            <div>
              <span className="font-semibold mb-3 block">Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary text-center"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={cn(
                  "p-4 border-2 transition-all",
                  isWishlisted
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-foreground"
                )}
              >
                <Heart size={20} className={cn(isWishlisted && "fill-current")} />
              </button>
              <button className="p-4 border-2 border-border hover:border-foreground transition-colors">
                <Share2 size={20} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-sm text-muted-foreground">Free Shipping</span>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-sm text-muted-foreground">Easy Returns</span>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-sm text-muted-foreground">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <ProductSection
          title="You May Also Like"
          products={relatedProducts}
          viewAllLink="/shop"
        />
      )}
    </Layout>
  );
};

export default ProductDetail;