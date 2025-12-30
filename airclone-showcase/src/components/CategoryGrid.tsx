import { Link } from "react-router-dom";
import { categories } from "@/data/products";

const CategoryGrid = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.slug}`}
              className="category-card group aspect-square"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="category-card-overlay group-hover:bg-black/40 flex items-end justify-center pb-6">
                <span className="text-white text-lg md:text-xl font-semibold text-center px-4">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;