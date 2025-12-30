import { Link } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
    const { items, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();

    return (
        <Layout>
            <div className="container py-12">
                <h1 className="text-3xl font-bold mb-8">My Wishlist ({items.length})</h1>

                {items.length === 0 ? (
                    <div className="text-center py-16 bg-neutral-900/50 rounded-xl border border-white/5">
                        <h2 className="text-xl font-medium mb-4">Your wishlist is empty</h2>
                        <p className="text-muted-foreground mb-6">Save items you love to buy later.</p>
                        <Link to="/shop">
                            <Button>Start Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {items.map((item) => (
                            <div key={item.id} className="bg-neutral-900 rounded-xl border border-white/5 overflow-hidden group">
                                <div className="relative aspect-square">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={() => toggleWishlist(item)}
                                        className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-red-600 text-white rounded-full transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <Link to={`/product/${item.name.toLowerCase().replace(/ /g, "-")}`} className="block">
                                        <h3 className="font-medium text-white line-clamp-1 mb-1 hover:text-red-500 transition-colors">{item.name}</h3>
                                    </Link>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="font-bold text-red-500">
                                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(item.price)}
                                        </span>
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => addToCart(item as any, 42, "Default")} // Mock size/color for quick add
                                            className="gap-2"
                                        >
                                            <ShoppingBag size={14} /> Add
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Wishlist;
