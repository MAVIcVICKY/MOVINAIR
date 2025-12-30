import { Instagram } from "lucide-react";

const InstagramFeed = () => {
    // Placeholder images - in production these would come from Instagram API
    const posts = [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-acc8b8bdc748?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop"
    ];

    return (
        <section className="py-16">
            <div className="container">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Instagram size={28} />
                        <h2 className="text-3xl font-bold">Follow Us</h2>
                    </div>
                    <p className="text-gray-600">@movinairshoes</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {posts.map((image, index) => (
                        <a
                            key={index}
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-square overflow-hidden rounded group cursor-pointer"
                        >
                            <img
                                src={image}
                                alt={`Instagram post ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstagramFeed;
