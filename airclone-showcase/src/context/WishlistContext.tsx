import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { products } from '@/data/products';

export interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface WishlistContextType {
    items: WishlistItem[];
    toggleWishlist: (product: any) => void;
    isInWishlist: (productId: string) => boolean;
    wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [user, setUser] = useState<any>(null);

    // Initial load & Auth Listener
    useEffect(() => {
        // Load local initially
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) setItems(JSON.parse(savedWishlist));

        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) fetchWishlist(currentUser.id);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) {
                fetchWishlist(currentUser.id);
            } else {
                // If logged out, revert to local storage or clear?
                // For now, let's revert to local storage or keep it as is
                const saved = localStorage.getItem('wishlist');
                if (saved) setItems(JSON.parse(saved));
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // Sync to localStorage when items change (only if guest or for backup)
    useEffect(() => {
        if (!user) {
            localStorage.setItem('wishlist', JSON.stringify(items));
        }
    }, [items, user]);

    const fetchWishlist = async (userId: string) => {
        const { data, error } = await supabase
            .from('wishlist')
            .select('product_id');

        if (error) {
            console.error('Error fetching wishlist:', error);
            return;
        }

        if (data) {
            // Map product_ids back to full product objects from our local data
            const loadedItems = data.map(item => {
                const product = products.find(p => p.id === item.product_id);
                if (product) {
                    return {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.images[0]
                    };
                }
                return null;
            }).filter(item => item !== null) as WishlistItem[];

            setItems(loadedItems);
        }
    };

    const toggleWishlist = async (product: any) => {
        const exists = items.some(item => item.id === product.id);
        let newItems = [];

        if (exists) {
            newItems = items.filter(item => item.id !== product.id);
            toast.info(`Removed ${product.name} from wishlist`);

            if (user) {
                // Remove from DB
                const { error } = await supabase
                    .from('wishlist')
                    .delete()
                    .match({ user_id: user.id, product_id: product.id });
                if (error) console.error("Supabase remove error:", error);
            }

        } else {
            newItems = [...items, {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0]
            }];
            toast.success(`Added ${product.name} to wishlist`);

            if (user) {
                // Add to DB
                const { error } = await supabase
                    .from('wishlist')
                    .insert([{
                        user_id: user.id,
                        product_id: product.id,
                        product_slug: product.slug
                    }]);
                if (error) console.error("Supabase insert error:", error);
            }
        }

        setItems(newItems);
    };

    const isInWishlist = (productId: string) => {
        return items.some(item => item.id === productId);
    };

    return (
        <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist, wishlistCount: items.length }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
