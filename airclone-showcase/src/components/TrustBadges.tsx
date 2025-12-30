const TrustBadges = () => {
    const badges = [
        {
            icon: "🚚",
            title: "Free Shipping",
            description: "On orders above ₹999"
        },
        {
            icon: "💳",
            title: "COD Available",
            description: "Cash on delivery"
        },
        {
            icon: "↩️",
            title: "5 Days Easy Returns",
            description: "No questions asked"
        },
        {
            icon: "🔒",
            title: "Secure Payment",
            description: "100% protected"
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {badges.map((badge, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl mb-3">{badge.icon}</div>
                            <h3 className="font-bold text-lg mb-1">{badge.title}</h3>
                            <p className="text-sm text-gray-600">{badge.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustBadges;
