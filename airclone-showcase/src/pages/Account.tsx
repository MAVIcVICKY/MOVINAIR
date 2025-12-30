import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const Account = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        toast.success("Logged out successfully");
        navigate("/");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                toast.success("Successfully logged in!");
                navigate("/");
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                toast.success("Account created! Please check your email/login.");
            }
        } catch (error: any) {
            toast.error(error.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    if (user) {
        return (
            <Layout>
                <div className="container py-20 flex flex-col items-center justify-center min-h-[60vh]">
                    <div className="w-full max-w-md bg-neutral-900/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm text-center">
                        <h1 className="text-2xl font-bold mb-4">My Account</h1>
                        <p className="text-neutral-400 mb-6">You are logged in as {user.email}</p>
                        <div className="space-y-4">
                            <Button onClick={() => navigate("/wishlist")} variant="outline" className="w-full">
                                My Wishlist
                            </Button>
                            <Button onClick={() => navigate("/cart")} variant="outline" className="w-full">
                                My Cart
                            </Button>
                            <Button
                                onClick={handleLogout}
                                className="w-full bg-red-600 hover:bg-red-700 h-11"
                            >
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container py-20 flex items-center justify-center min-h-[60vh]">
                <div className="w-full max-w-md bg-neutral-900/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h1>
                        <p className="text-neutral-400">
                            {isLogin ? "Enter your credentials to access your account" : "Sign up to start shopping with MovinAir"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                placeholder="hello@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-black/50 border-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-black/50 border-white/10"
                            />
                        </div>

                        <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 h-11 mt-4">
                            {loading ? "Loading..." : (isLogin ? "Sign In" : "Sign Up")}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-neutral-400">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-white font-medium hover:underline focus:outline-none"
                        >
                            {isLogin ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Account;
