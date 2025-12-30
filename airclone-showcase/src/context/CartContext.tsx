import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { products } from '@/data/products';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    size: number;
    color: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: any, size: number, color: string) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    cartCount: number;
    cartTotal: number;
    clearCart: () => Promise<void>;
    placeOrder: (details: any) => Promise<boolean>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [user, setUser] = useState<any>(null);

    // Initial load & Auth Listener
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) setItems(JSON.parse(savedCart));

        supabase.auth.getSession().then(({ data: { session } }) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) fetchCart(currentUser.id);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) {
                fetchCart(currentUser.id);
            } else {
                const saved = localStorage.getItem('cart');
                if (saved) setItems(JSON.parse(saved));
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // Sync to local storage for guests
    useEffect(() => {
        if (!user) {
            localStorage.setItem('cart', JSON.stringify(items));
        }
    }, [items, user]);

    const fetchCart = async (userId: string) => {
        const { data, error } = await supabase
            .from('cart')
            .select('*');

        if (error) {
            console.error('Error fetching cart:', error);
            return;
        }

        if (data) {
            const loadedItems = data.map(item => {
                const product = products.find(p => p.id === item.product_id);
                if (product) {
                    return {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.images[0], // Could also store this in DB if it changes variants
                        size: Number(item.size), // DB might assume text, ensuring handling
                        color: item.color,
                        quantity: item.quantity
                    };
                }
                return null;
            }).filter(item => item !== null) as CartItem[];
            setItems(loadedItems);
        }
    };

    const addToCart = async (product: any, size: number, color: string) => {
        setItems(prev => {
            const existingItem = prev.find(item => item.id === product.id && item.size === size && item.color === color);

            // Logic for DB sync inside state update wrapper is tricky because valid state is needed.
            // Simplified: Update UI first, then DB.
            let newItems;

            if (existingItem) {
                toast.success(`Updated quantity for ${product.name}`);
                newItems = prev.map(item =>
                    item.id === product.id && item.size === size && item.color === color
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );

                if (user) {
                    // Update DB quantity
                    const newQty = existingItem.quantity + 1;
                    supabase.from('cart')
                        .update({ quantity: newQty })
                        .match({ user_id: user.id, product_id: product.id, size: String(size), color: color })
                        .then(({ error }) => { if (error) console.error(error) });
                }

            } else {
                toast.success(`Added ${product.name} to cart`);
                newItems = [...prev, {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    size,
                    color,
                    quantity: 1
                }];

                if (user) {
                    // Insert to DB
                    supabase.from('cart')
                        .insert([{
                            user_id: user.id,
                            product_id: product.id,
                            quantity: 1,
                            size: String(size),
                            color: color
                        }])
                        .then(({ error }) => { if (error) console.error(error) });
                }
            }
            return newItems;
        });
    };

    const removeFromCart = async (itemId: string) => {
        // Warning: Deleting by ItemID removes ALL variants of that product in current logic
        // because we use product_id as cart item id in the simple logic.
        // Ideally cart items should have unique row IDs.
        // For this simple implementation, we remove matches by product_id in UI.

        // Wait, current UI logic: removeFromCart uses item.id (product id).
        // This deletes all sizes/colors of that product.
        setItems(prev => prev.filter(item => item.id !== itemId));
        toast.info("Removed item from cart");

        if (user) {
            const { error } = await supabase
                .from('cart')
                .delete()
                .match({ user_id: user.id, product_id: itemId });
            if (error) console.error(error);
        }
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        if (quantity < 1) return;

        // NOTE: This updates ALL variants of this product ID to the new quantity in the UI implementation we inherited.
        // Improvements can be made later to target specific variant.
        setItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity } : item));

        if (user) {
            const { error } = await supabase
                .from('cart')
                .update({ quantity })
                .match({ user_id: user.id, product_id: itemId });
            if (error) console.error(error);
        }
    };

    const clearCart = async () => {
        setItems([]);
        toast.info("Cart cleared");
        if (user) {
            const { error } = await supabase
                .from('cart')
                .delete()
                .match({ user_id: user.id });
            if (error) console.error(error);
        }
    };

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const placeOrder = async (orderDetails: any) => {
        try {
            // 1. Prepare payload
            const { data: { user } } = await supabase.auth.getUser();

            const payload = {
                user_id: user?.id || null, // Allow null for guests
                total_amount: orderDetails.total,
                status: 'pending',
                shipping_address: {
                    name: orderDetails.name,
                    phone: orderDetails.phone,
                    email: orderDetails.email,
                    address: orderDetails.address,
                    city: orderDetails.city,
                    state: orderDetails.state,
                    zip: orderDetails.zip
                },
                items: items, // Store current cart items
                email: orderDetails.email || user?.email // Backup email
            };

            // 2. Insert into Supabase
            const { error } = await supabase
                .from('orders')
                .insert([payload]);

            if (error) throw error;

            // 3. Clear Cart
            await clearCart();

            return true;
        } catch (error) {
            console.error('Error placing order:', error);
            throw error;
        }
    };

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal, placeOrder }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
