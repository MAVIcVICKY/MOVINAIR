import Layout from "@/components/layout/Layout";
import Features from "@/components/Features";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center bg-foreground text-background">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1920&h=1080&fit=crop)",
          }}
        />
        <div className="relative z-10 text-center container">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About MovinAir</h1>
          <p className="text-xl text-background/80 max-w-2xl mx-auto">
            We walk every shoe to ensure you get nothing but the best
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-medium">OUR STORY</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                Crafting Premium Footwear Since 2015
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  MovinAir was founded with a simple mission: to provide premium quality
                  footwear that combines style, comfort, and durability at accessible prices.
                </p>
                <p>
                  What started as a small family business has grown into one of India's
                  most trusted footwear brands. We believe that everyone deserves to walk
                  in comfort and style, which is why we carefully craft each pair of shoes
                  with attention to detail and quality materials.
                </p>
                <p>
                  Our team of skilled artisans brings decades of experience to every shoe
                  we make. From the initial design to the final stitch, we ensure that
                  every pair meets our high standards of excellence.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=800&fit=crop"
                alt="Our workshop"
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-8">
                <span className="text-5xl font-bold">9+</span>
                <p className="text-sm mt-1">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">OUR VALUES</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">What We Stand For</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality First</h3>
              <p className="text-muted-foreground">
                We never compromise on quality. Every shoe is crafted with premium materials
                and undergoes rigorous quality checks.
              </p>
            </div>
            <div className="bg-background p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💚</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className="text-muted-foreground">
                We're committed to sustainable practices, from eco-friendly materials to
                responsible manufacturing processes.
              </p>
            </div>
            <div className="bg-background p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer Focus</h3>
              <p className="text-muted-foreground">
                Your satisfaction is our priority. We go above and beyond to ensure you
                have the best shopping experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-bold text-primary">50K+</span>
              <p className="text-muted-foreground mt-2">Happy Customers</p>
            </div>
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-bold text-primary">200+</span>
              <p className="text-muted-foreground mt-2">Shoe Designs</p>
            </div>
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-bold text-primary">15+</span>
              <p className="text-muted-foreground mt-2">Cities Served</p>
            </div>
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-bold text-primary">4.8★</span>
              <p className="text-muted-foreground mt-2">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      <Features />
    </Layout>
  );
};

export default About;