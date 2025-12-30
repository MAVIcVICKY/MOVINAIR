import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, Grid3X3, Grid2X2, X, ChevronRight, LayoutGrid, List } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { cn } from "@/lib/utils";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const categoryParam = searchParams.get("category");
  const saleParam = searchParams.get("sale");
  const newParam = searchParams.get("new");
  const sortParam = searchParams.get("sort") || "default";

  const typeParam = searchParams.get("type");
  const styleParam = searchParams.get("style");
  const collectionParam = searchParams.get("collection");

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
  const [priceRange, setPriceRange] = useState<[number, number]>([640, 10000]); // Increased max range
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [sortBy, setSortBy] = useState(sortParam);

  // Sync state with URL params
  useEffect(() => {
    setSelectedCategory(categoryParam || "all");
    if (saleParam === "true") setSelectedCategory("all");
  }, [categoryParam, saleParam]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(p =>
        p.category === selectedCategory ||
        categories.find(c => c.slug === selectedCategory)?.id === p.category
      );
    }

    // Type Filter (e.g., Flats, Heels, Bellies)
    if (typeParam) {
      const keyword = typeParam.toLowerCase().replace("s", ""); // simple singularization
      result = result.filter(p => p.name.toLowerCase().includes(keyword) || p.description.toLowerCase().includes(keyword));
    }

    // Style Filter (e.g., Derby, Loafers)
    if (styleParam) {
      const keyword = styleParam.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(keyword) || p.description.toLowerCase().includes(keyword));
    }

    // Collection Filter (e.g., Leather, Go Series)
    if (collectionParam) {
      if (collectionParam === 'leather') {
        result = result.filter(p => p.name.toLowerCase().includes('leather') || p.description.toLowerCase().includes('leather'));
      }
      // Add logic for 'go-series' if needed, or generic mapping
    }

    // Sale filter
    if (saleParam === "true") {
      result = result.filter(p => p.isSale);
    }

    // New filter
    if (newParam === "true") {
      result = result.filter(p => p.isNew);
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Size filter
    if (selectedSize !== "all") {
      result = result.filter(p => p.sizes.includes(Number(selectedSize)));
    }

    // Color filter
    if (selectedColor !== "all") {
      result = result.filter(p => p.colors.some(c => c.toLowerCase() === selectedColor.toLowerCase()));
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "discount":
        result.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, saleParam, newParam, priceRange, selectedSize, selectedColor, sortBy, typeParam, styleParam, collectionParam]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setPriceRange([640, 3000]);
    setSelectedSize("all");
    setSelectedColor("all");
    setSortBy("default");
    setSearchParams({});
  };

  // Get unique sizes and colors
  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes))).sort((a, b) => a - b);
  const allColors = Array.from(new Set(products.flatMap(p => p.colors)));

  const getPageTitle = () => {
    if (saleParam === "true") return "Sale";
    if (newParam === "true") return "New Arrivals";
    if (categoryParam === "men") return "Men's Collection";
    if (categoryParam === "women") return "Women's Collection";
    return "Shop All";
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4 border-b">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={16} />
            <Link to="/shop" className="hover:text-foreground transition-colors">All Shoes</Link>
            <ChevronRight size={16} />
            <span className="text-foreground font-medium">{getPageTitle()}</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-background py-8">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold">{getPageTitle()}</h1>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={cn(
              "lg:w-64 shrink-0",
              showFilters
                ? "fixed inset-0 z-50 bg-background p-6 overflow-auto lg:relative lg:p-0"
                : "hidden lg:block"
            )}
          >
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button onClick={() => setShowFilters(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Filter Header */}
            <div className="mb-6">
              <h3 className="text-lg font-bold uppercase tracking-wide">Filter by Price</h3>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Price: ₹{priceRange[0].toLocaleString()} — ₹{priceRange[1].toLocaleString()}
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                </div>
                <button className="w-full bg-foreground text-background py-2 px-4 hover:bg-foreground/90 transition-colors font-medium">
                  Filter
                </button>
              </div>
            </div>

            {/* Size Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wide mb-3">Filter by Size</h3>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded bg-background"
              >
                <option value="all">Any Shoe-Size (UK)</option>
                {allSizes.map((size) => (
                  <option key={size} value={size}>UK {size}</option>
                ))}
              </select>
            </div>

            {/* Color Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wide mb-3">Filter by Color</h3>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded bg-background"
              >
                <option value="all">Any Color</option>
                {allColors.map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>


          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded"
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => setGridCols(3)}
                    className={cn(
                      "p-2 rounded",
                      gridCols === 3 ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    )}
                  >
                    <Grid2X2 size={18} />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={cn(
                      "p-2 rounded",
                      gridCols === 4 ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    )}
                  >
                    <Grid3X3 size={18} />
                  </button>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-border rounded bg-background text-sm"
                >
                  <option value="default">Sort by latest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="discount">Highest Discount</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div
                className={cn(
                  "grid gap-4 md:gap-6",
                  gridCols === 3
                    ? "grid-cols-2 md:grid-cols-3"
                    : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                )}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No products found</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-primary hover:underline"
                >
                  Clear filters and try again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;