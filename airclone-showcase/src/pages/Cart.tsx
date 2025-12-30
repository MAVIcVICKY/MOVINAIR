import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import CheckoutModal from "@/components/checkout/CheckoutModal";

const Cart = () => {
    const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const shipping = 0; // Free shipping for now

    return (
        <Layout>
            <div className="container py-12">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                {items.length === 0 ? (
                    <div className="text-center py-16 bg-neutral-900/50 rounded-xl border border-white/5">
                        <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
                        <Link to="/shop">
                            <Button>Continue Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="flex-1 space-y-4">
                            {items.map((item) => (
                                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 p-4 bg-neutral-900 rounded-xl border border-white/5">
                                    <div className="w-24 h-24 shrink-0 bg-neutral-800 rounded-lg overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-white line-clamp-1">{item.name}</h3>
                                                <p className="text-sm text-neutral-400 mt-1">Size: {item.size} • Color: {item.color}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-neutral-500 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-center mt-4">
                                            <div className="flex items-center gap-3 bg-neutral-800 rounded p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-neutral-700 rounded transition-colors disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-neutral-700 rounded transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <span className="font-bold text-white">
                                                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(item.price * item.quantity)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-between items-center pt-4">
                                <button onClick={clearCart} className="text-sm text-red-500 hover:underline">Clear Cart</button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="w-full lg:w-96 shrink-0">
                            <div className="bg-neutral-900 p-6 rounded-xl border border-white/5 sticky top-24">
                                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-neutral-400">
                                        <span>Subtotal</span>
                                        <span className="text-white">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(cartTotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-neutral-400">
                                        <span>Shipping</span>
                                        <span className="text-green-500">Free</span>
                                    </div>
                                    <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(cartTotal)}</span>
                                    </div>
                                </div>
                                <Button
                                    className="w-full h-12 text-base gap-2 bg-red-600 hover:bg-red-700"
                                    onClick={() => setIsCheckoutOpen(true)}
                                >
                                    Proceed to Checkout <ArrowRight size={18} />
                                </Button>
                                <p className="text-xs text-neutral-500 text-center mt-4">
                                    Secure Checkout - SSL Encrypted
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
            />
        </Layout>
    );
};

export default Cart;
