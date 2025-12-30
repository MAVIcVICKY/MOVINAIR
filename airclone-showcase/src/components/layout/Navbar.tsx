import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Heart, ShoppingBag, User, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const menuData = {
  collections: [
    { name: "Go Series", path: "/shop?collection=go-series" },
    { name: "Leather Collection", path: "/shop?collection=leather" },
  ],
  categories: [
    { name: "Casual Shoes", path: "/shop?category=casual" },
    { name: "Formal Shoes", path: "/shop?category=formal" },
    { name: "Sports Shoes", path: "/shop?category=sports" },
    { name: "Sneakers", path: "/shop?category=sneakers" },
    { name: "Boots", path: "/shop?category=boots" },
    { name: "Sandals / Flip Flops", path: "/shop?category=sandals" },
    { name: "All Shoes", path: "/shop" },
  ],
  styles: [
    { name: "Derby", path: "/shop?style=derby" },
    { name: "Lace Up", path: "/shop?style=lace-up" },
    { name: "Slip Ons", path: "/shop?style=slip-ons" },
    { name: "Brogues", path: "/shop?style=brogues" },
    { name: "Loafers", path: "/shop?style=loafers" },
    { name: "Monk", path: "/shop?style=monk" },
  ],
  womens: [
    { name: "Women Flats", path: "/shop?category=women&type=flats" },
    { name: "Women Bellies", path: "/shop?category=women&type=bellies" },
    { name: "Women Heels", path: "/shop?category=women&type=heels" },
    { name: "Party Wear / Bridal", path: "/shop?category=women&type=party" },
    { name: "Shop All", path: "/shop?category=women" },
  ],
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-b border-white/10",
          isScrolled ? "bg-transparent backdrop-blur-sm" : "bg-black"
        )}
      >
        {/* Top Bar - Social Links */}
        <div className="text-white text-xs py-1">
          <div className="container flex items-center justify-between">
            <div className="flex items-center justify-between w-full">
              <a href="http://localhost:8000/website/" className="flex items-center gap-2 hover:text-red-500 transition-colors" title="Back to Landing">
                <ArrowRight className="rotate-180" size={18} />
              </a>
              <div className="flex items-center gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  Facebook
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  Twitter
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  Instagram
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <nav className="container flex items-center justify-between py-4">
          {/* Left: Hamburger + Desktop Nav */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-md transition-colors text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link to="/shop?new=true" className="nav-link text-sm font-medium text-white hover:text-red-500 transition-colors">
                New In
              </Link>
              <Link to="/shop?category=men" className="nav-link text-sm font-medium text-white hover:text-red-500 transition-colors">
                Mens Collection
              </Link>

              {/* Womens Collection with Dropdown */}
              <div className="relative group">
                <button className="nav-link text-sm font-medium flex items-center gap-1 text-white hover:text-red-500 transition-colors">
                  Womens Collection
                  <ChevronDown size={16} />
                </button>
                <div className="absolute left-0 top-full mt-2 bg-neutral-900 border border-white/10 shadow-lg py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {menuData.womens.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-4 py-2 text-sm hover:bg-white/10 text-gray-200 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/shop?sale=true" className="nav-link text-sm font-medium text-red-600 hover:text-red-400">
                Sale
              </Link>
            </div>
          </div>

          {/* Center: Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img
              src="/movinair-logo-final.png"
              alt="MOVINAIR - Comfortable Every Where"
              className="h-14 w-auto object-contain invert"
            />
          </Link>

          {/* Right: Utility Icons */}
          <div className="flex items-center gap-3 text-white">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link
              to="/account"
              className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:flex"
              aria-label="Account"
            >
              <User size={20} />
            </Link>
            <Link
              to="/wishlist"
              className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:flex relative"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Fullscreen Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-50 bg-neutral-950 transition-all duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container py-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6 overflow-auto max-h-[calc(100vh-100px)]">
            {/* Collections */}
            <div>
              <button
                onClick={() => setOpenDropdown(openDropdown === "collections" ? null : "collections")}
                className="flex items-center justify-between w-full text-lg font-semibold py-2"
              >
                COLLECTION
                <ChevronDown className={cn("transition-transform", openDropdown === "collections" && "rotate-180")} size={20} />
              </button>
              {openDropdown === "collections" && (
                <div className="pl-4 space-y-2 mt-2">
                  {menuData.collections.map((item) => (
                    <Link key={item.name} to={item.path} className="block py-2 text-gray-300">
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Categories */}
            <div>
              <button
                onClick={() => setOpenDropdown(openDropdown === "categories" ? null : "categories")}
                className="flex items-center justify-between w-full text-lg font-semibold py-2"
              >
                CATEGORIES
                <ChevronDown className={cn("transition-transform", openDropdown === "categories" && "rotate-180")} size={20} />
              </button>
              {openDropdown === "categories" && (
                <div className="pl-4 space-y-2 mt-2">
                  {menuData.categories.map((item) => (
                    <Link key={item.name} to={item.path} className="block py-2 text-gray-300">
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Styles */}
            <div>
              <button
                onClick={() => setOpenDropdown(openDropdown === "styles" ? null : "styles")}
                className="flex items-center justify-between w-full text-lg font-semibold py-2"
              >
                STYLES
                <ChevronDown className={cn("transition-transform", openDropdown === "styles" && "rotate-180")} size={20} />
              </button>
              {openDropdown === "styles" && (
                <div className="pl-4 space-y-2 mt-2">
                  {menuData.styles.map((item) => (
                    <Link key={item.name} to={item.path} className="block py-2 text-gray-300">
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="border-t border-white/10 pt-4 space-y-2">
              <Link to="/shop?new=true" className="block py-2 font-medium">New In</Link>
              <Link to="/shop?category=men" className="block py-2 font-medium">Mens Collection</Link>
              <Link to="/shop?category=women" className="block py-2 font-medium">Womens Collection</Link>
              <Link to="/shop?sale=true" className="block py-2 font-medium text-red-500">Sale</Link>
            </div>

            {/* Mobile Utility Links */}
            <div className="border-t border-white/10 pt-4 space-y-2">
              <Link to="/account" className="flex items-center gap-2 py-2">
                <User size={18} />
                Account
              </Link>
              <Link to="/wishlist" className="flex items-center gap-2 py-2">
                <Heart size={18} />
                Wishlist
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-40 bg-black/80" onClick={() => setShowSearch(false)}>
          <div className="bg-neutral-900 p-6 max-w-2xl mx-auto mt-20 border border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-4 text-white">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 outline-none text-lg bg-transparent"
                autoFocus
              />
              <button onClick={() => setShowSearch(false)}>
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;