import { Star } from "lucide-react";

const Reviews = () => {
    const reviews = [
        {
            name: "Priya Sharma",
            rating: 5,
            text: "Absolutely love my new heels! Super comfortable and stylish. The quality is outstanding for the price.",
            image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=000&color=fff"
        },
        {
            name: "Rahul Verma",
            rating: 5,
            text: "Best formal shoes I've bought online. Perfect fit and great leather quality. Highly recommend MOVINAIR!",
            image: "https://ui-avatars.com/api/?name=Rahul+Verma&background=000&color=fff"
        },
        {
            name: "Sneha Patel",
            rating: 5,
            text: "The slip-ons are so comfortable! I can wear them all day without any discomfort. Fast delivery too!",
            image: "https://ui-avatars.com/api/?name=Sneha+Patel&background=000&color=fff"
        },
        {
            name: "Arjun Singh",
            rating: 4,
            text: "Great collection and reasonable prices. The COD option and easy returns policy make shopping hassle-free.",
            image: "https://ui-avatars.com/api/?name=Arjun+Singh&background=000&color=fff"
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
                    <p className="text-gray-600">Real reviews from real customers</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-4 text-sm leading-relaxed">"{review.text}"</p>
                            <div className="flex items-center gap-3">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-sm">{review.name}</p>
                                    <p className="text-xs text-gray-500">Verified Buyer</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
