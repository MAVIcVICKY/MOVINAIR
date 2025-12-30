import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0]); // Default to first size/color for quick add
  };

  return (
    <div className="product-card group bg-neutral-900 rounded-xl border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-900/20">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-xl aspect-square bg-neutral-800">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images[currentImage]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onMouseEnter={() => product.images.length > 1 && setCurrentImage(1)}
            onMouseLeave={() => setCurrentImage(0)}
          />
        </Link>

        {/* Sale Badge */}
        {product.isSale && product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
            -{product.discount}% OFF
          </span>
        )}

        {/* New Badge */}
        {product.isNew && !product.isSale && (
          <span className="absolute top-3 left-3 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full z-10">
            NEW DROP
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={cn(
            "absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 z-10",
            isWishlisted
              ? "bg-red-600 text-white opacity-100"
              : "bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-black/70"
          )}
          aria-label="Add to wishlist"
        >
          <Heart size={18} className={cn(isWishlisted && "fill-current")} />
        </button>

        {/* Add to Cart Overlay Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-4 right-4 py-3 bg-white text-black font-bold uppercase tracking-wide text-sm rounded-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-neutral-200"
        >
          <ShoppingBag size={16} />
          Add to Cart
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="text-xs text-neutral-400 mb-1 uppercase tracking-wider">{product.category}</div>
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-white text-lg mb-2 line-clamp-1 hover:text-red-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-red-500 font-bold text-lg">{formatPrice(product.price)}</span>
          {product.isSale && product.originalPrice > product.price && (
            <span className="text-neutral-500 text-sm line-through decoration-red-500/50">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;