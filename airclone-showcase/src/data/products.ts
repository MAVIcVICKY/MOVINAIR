export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  category: string;
  description: string;
  sizes: number[];
  colors: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

export const products: Product[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Red Kohlapuri Flat Fancy Womens Slippers",
    slug: "red-kohlapuri-flat-fancy-womens-slippers",
    price: 799,
    originalPrice: 1999,
    discount: 60,
    images: [
      "https://movinairshoes.com/wp-content/uploads/2023/07/IMG_2660-Large-800x800.jpeg",
      "https://movinairshoes.com/wp-content/uploads/2023/07/IMG_2668-Large-800x800.jpeg"
    ],
    category: "women",
    description: "Red Kolhapur Flat Fancy Womens Slipper, is a stunning and culturally inspired footwear option that adds a vibrant touch to any outfit.",
    sizes: [36, 37, 38, 39, 40],
    colors: ["Red"],
    inStock: true,
    isSale: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Black Gray Flat Womens Sandals",
    slug: "black-gray-flat-womens-sandals",
    price: 1399,
    originalPrice: 2999,
    discount: 53,
    images: [
      "https://movinairshoes.com/wp-content/uploads/2023/07/IMG_2627-Large-800x800.jpeg",
      "https://movinairshoes.com/wp-content/uploads/2023/07/IMG_2641-Large-800x800.jpeg"
    ],
    category: "women",
    description: "Black Gray Flat Womens Sandals are modern footwear options that combine style and comfort seamlessly.",
    sizes: [36, 37, 38, 39, 40],
    colors: ["Black", "Gray"],
    inStock: true,
    isSale: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Golden High Heel Womens Sandals",
    slug: "golden-high-heel-womens-sandals",
    price: 1299,
    originalPrice: 2999,
    discount: 57,
    images: [
      "https://movinairshoes.com/wp-content/uploads/2023/07/848B3A14-6B6D-4F3D-82DD-A78A3394012F-Large-800x800.jpeg",
      "https://movinairshoes.com/wp-content/uploads/2023/07/176C8633-F228-4517-AD73-DA09961635E1-Large-800x800.jpeg"
    ],
    category: "women",
    description: "Golden High Heel Womens Sandal is a glamorous footwear option that is sure to elevate any ensemble.",
    sizes: [36, 37, 38, 39, 40],
    colors: ["Golden"],
    inStock: true,
    isSale: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Grey Block Heel Womens Sandal",
    slug: "grey-block-heel-womens-sandal",
    price: 1399,
    originalPrice: 2999,
    discount: 53,
    images: [
      "https://movinairshoes.com/wp-content/uploads/2023/07/IMG_2062-Large-800x800.jpeg",
      "https://movinairshoes.com/wp-content/uploads/2023/07/IMG_2065-Large-800x800.jpeg"
    ],
    category: "women",
    description: "Grey Block Heel Womens Sandal truly embodies class and sophistication.",
    sizes: [36, 37, 38, 39, 40],
    colors: ["Grey"],
    inStock: true,
    isSale: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "Golden Kohlapuri Flat Fancy Womens Slip-Ons",
    slug: "golden-kohlapuri-flat-fancy-womens-slip-ons",
    price: 849,
    originalPrice: 1999,
    discount: 58,
    images: [
      "https://movinairshoes.com/wp-content/uploads/2023/07/IMG_2646-Large-800x800.jpeg",
      "https://movinairshoes.com/wp-content/uploads/2023/07/IMG_2654-Large-800x800.jpeg"
    ],
    category: "women",
    description: "The golden Kolhapuri flat fancy womens slip-on is a stunning footwear option.",
    sizes: [36, 37, 38, 39, 40],
    colors: ["Golden"],
    inStock: true,
    isSale: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "Golden Fancy Flat Womens Slippers",
    slug: "golden-fancy-flat-womens-slippers",
    price: 1199,
    originalPrice: 2499,
    discount: 52,
    images: [
      "https://movinairshoes.com/wp-content/uploads/2023/07/B24E6976-FF0A-47B1-8E70-3ABF59C29084-Large-800x800.jpeg",
      "https://movinairshoes.com/wp-content/uploads/2023/07/IMG_2207-Large-800x800.jpeg"
    ],
    category: "women",
    description: "Step into luxury and elegance with the golden fancy flat womens slippers.",
    sizes: [36, 37, 38, 39, 40],
    colors: ["Golden"],
    inStock: true,
    isSale: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    name: "Premium Brown Leather Loafers",
    slug: "premium-brown-leather-loafers",
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    images: [
      "https://movinairshoes.com/wp-content/uploads/2021/02/GTW1.8-1-1024x1024.jpg",
      "https://movinairshoes.com/wp-content/uploads/2021/02/ghw1.7-1-1024x1024.jpg"
    ],
    category: "men",
    description: "Crafted with premium leather, these loafers offer unmatched comfort and style for the modern gentleman.",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Brown"],
    inStock: true,
    isSale: true,
    isNew: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    name: "Classic Black Formal Shoes",
    slug: "classic-black-formal-shoes",
    price: 2999,
    originalPrice: 5499,
    discount: 45,
    images: [
      "https://movinairshoes.com/wp-content/uploads/2021/02/WhatsApp-Image-2023-06-11-at-8.20.20-PM.jpeg",
      "https://movinairshoes.com/wp-content/uploads/2021/02/ghw1.7-1-1024x1024.jpg"
    ],
    category: "men",
    description: "Timeless black formal shoes perfect for business meetings and special occasions.",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Black"],
    inStock: true,
    isSale: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    name: "Tan Leather Monk Strap Shoes",
    slug: "tan-leather-monk-strap-shoes",
    price: 3499,
    originalPrice: 5999,
    discount: 42,
    images: [
      "https://movinairshoes.com/wp-content/uploads/2021/02/GTW1.8-1-1024x1024.jpg",
      "https://movinairshoes.com/wp-content/uploads/2021/02/ghw1.7-1-1024x1024.jpg"
    ],
    category: "men",
    description: "Elegant tan leather monk strap shoes for the discerning gentleman.",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Tan"],
    inStock: true,
    isNew: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    name: "Navy Blue Sports Shoes",
    slug: "navy-blue-sports-shoes",
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    images: [
      "https://movinairshoes.com/wp-content/uploads/2021/02/ghw1.7-1-1024x1024.jpg",
      "https://movinairshoes.com/wp-content/uploads/2021/02/GTW1.8-1-1024x1024.jpg"
    ],
    category: "sports",
    description: "Comfortable and stylish sports shoes for your active lifestyle.",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Navy Blue"],
    inStock: true,
    isSale: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    name: "Black Flat Ankle Strap Womens Sandal",
    slug: "black-flat-ankle-strap-womens-sandal",
    price: 1199,
    originalPrice: 2499,
    discount: 52,
    images: [
      "https://movinairshoes.com/wp-content/uploads/2023/07/IMG_2611-Large-800x800.jpeg",
      "https://movinairshoes.com/wp-content/uploads/2023/07/IMG_2620-Large-800x800.jpeg"
    ],
    category: "women",
    description: "Black Flat Ankle Strap Womens Sandal, is a stylish and practical footwear option.",
    sizes: [36, 37, 38, 39, 40],
    colors: ["Black"],
    inStock: true,
    isSale: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    name: "Grey Kohlapuri Flat Fancy Womens Slip-ons",
    slug: "grey-kohlapuri-flat-fancy-womens-slip-ons",
    price: 849,
    originalPrice: 1999,
    discount: 58,
    images: [
      "https://movinairshoes.com/wp-content/uploads/2023/07/IMG_2674-Large-800x800.jpeg",
      "https://movinairshoes.com/wp-content/uploads/2023/07/IMG_2678-Large-800x800.jpeg"
    ],
    category: "women",
    description: "The grey Kolhapuri flat fancy womens slip-on is a smart footwear option.",
    sizes: [36, 37, 38, 39, 40],
    colors: ["Grey"],
    inStock: true,
    isSale: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440013",
    name: "Royal Black Leather Loafer",
    slug: "royal-black-leather-loafer",
    price: 3999,
    originalPrice: 6999,
    discount: 43,
    images: ["/men-loafer-premium.png"],
    category: "men",
    description: "Handcrafted from pure Italian leather, this premium loafer features subtle red stitching and a comfort-first sole. Perfect for the modern gentleman.",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Black"],
    inStock: true,
    isNew: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440014",
    name: "Midnight Red Sole Stiletto",
    slug: "midnight-red-sole-stiletto",
    price: 4599,
    originalPrice: 8999,
    discount: 49,
    images: ["/women-heels-premium.png"],
    category: "women",
    description: "Make a statement with these high-gloss patent leather stilettos featuring our signature red sole. The epitome of MovinAir luxury.",
    sizes: [36, 37, 38, 39, 40],
    colors: ["Black"],
    inStock: true,
    isNew: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440015",
    name: "Crimson Velocity Runner",
    slug: "crimson-velocity-runner",
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    images: ["/men-runner-premium.png"],
    category: "sports",
    description: "Future-ready design meets performance. Breathable mesh with neon red accents for visibility and style during your night runs.",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Black/Red"],
    inStock: true,
    isSale: true
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440016",
    name: "Scarlet Suede Minimalist Sandal",
    slug: "scarlet-suede-minimalist-sandal",
    price: 1899,
    originalPrice: 2999,
    discount: 37,
    images: ["/women-sandal-premium.png"],
    category: "women",
    description: "Soft premium suede in a vibrant scarlet red. The perfect flat sandal for adding a pop of color to any outfit without compromising comfort.",
    sizes: [36, 37, 38, 39, 40],
    colors: ["Red"],
    inStock: true,
    isNew: true
  }
];

export const categories = [
  {
    id: "formal",
    name: "Formal Shoes",
    image: "https://movinairshoes.com/wp-content/uploads/2021/02/WhatsApp-Image-2023-06-11-at-8.20.20-PM.jpeg",
    slug: "formal-shoes"
  },
  {
    id: "sports",
    name: "Sports Shoes",
    image: "https://movinairshoes.com/wp-content/uploads/2021/02/ghw1.7-1-1024x1024.jpg",
    slug: "sports-shoes"
  },
  {
    id: "heels",
    name: "Women Heels",
    image: "https://movinairshoes.com/wp-content/uploads/2021/02/1024-size-website.jpeg",
    slug: "women-heels"
  },
  {
    id: "loafers",
    name: "Loafers",
    image: "https://movinairshoes.com/wp-content/uploads/2021/02/GTW1.8-1-1024x1024.jpg",
    slug: "loafers"
  }
];

export const heroSlides = [
  {
    id: 1,
    title: "Relentlessly Stylish",
    subtitle: "AUTUMN/WINTER COLLECTION",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=800&fit=crop",
    link: "/shop"
  },
  {
    id: 2,
    title: "Pick Your Trend",
    subtitle: "AUTUMN/WINTER",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&h=800&fit=crop",
    link: "/shop?category=loafers"
  },
  {
    id: 3,
    title: "Splash Colors to Your Wardrobe",
    subtitle: "AUTUMN/WINTER COLLECTION",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&h=800&fit=crop",
    link: "/shop?category=sports"
  },
  {
    id: 4,
    title: "End of Season Sale",
    subtitle: "UPTO 70% OFF",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&h=800&fit=crop",
    link: "/shop?sale=true"
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "all") return products;
  return products.filter(p => p.category === category);
};

export const getSaleProducts = (): Product[] => {
  return products.filter(p => p.isSale);
};

export const getNewProducts = (): Product[] => {
  return products.filter(p => p.isNew);
};