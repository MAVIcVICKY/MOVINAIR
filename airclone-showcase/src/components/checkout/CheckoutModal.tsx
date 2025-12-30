import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
    const { placeOrder, cartTotal } = useCart();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
    });

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await placeOrder({
                ...formData,
                total: cartTotal,
                status: "pending"
            });
            toast.success("Order placed successfully!");
            onClose();
        } catch (error: any) {
            toast.error(error.message || "Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-neutral-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h2 className="text-xl font-bold">Checkout Details</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="overflow-y-auto p-6">
                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Full Name</label>
                            <Input
                                required
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-neutral-800 border-white/10 focus:ring-red-600"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-400">Phone Number</label>
                                <Input
                                    required
                                    name="phone"
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="bg-neutral-800 border-white/10"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-400">Email (Optional)</label>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-neutral-800 border-white/10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Shipping Address</label>
                            <Input
                                required
                                name="address"
                                placeholder="123 Street Name, Area"
                                value={formData.address}
                                onChange={handleChange}
                                className="bg-neutral-800 border-white/10"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-400">City</label>
                                <Input
                                    required
                                    name="city"
                                    placeholder="New Delhi"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="bg-neutral-800 border-white/10"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-400">State</label>
                                <Input
                                    required
                                    name="state"
                                    placeholder="Delhi"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="bg-neutral-800 border-white/10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Zip Code</label>
                            <Input
                                required
                                name="zip"
                                placeholder="110001"
                                value={formData.zip}
                                onChange={handleChange}
                                className="bg-neutral-800 border-white/10"
                            />
                        </div>
                    </form>
                </div>

                <div className="p-4 border-t border-white/10 bg-neutral-900">
                    <Button
                        type="submit"
                        form="checkout-form"
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            `Place Order • ₹${cartTotal.toLocaleString()}`
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
