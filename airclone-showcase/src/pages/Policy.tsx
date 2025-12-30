import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const policies = {
  shipping: {
    title: "Shipping Policy",
    content: [
      {
        heading: "Delivery Timeframe",
        text: "We aim to deliver your order within 5-7 business days for metro cities and 7-10 business days for other locations across India. International shipping may take 10-15 business days depending on the destination.",
      },
      {
        heading: "Free Shipping",
        text: "Enjoy free shipping on all orders above ₹999. Orders below this amount will incur a flat shipping fee of ₹99.",
      },
      {
        heading: "Order Tracking",
        text: "Once your order is shipped, you will receive an email with the tracking number and link to track your package. You can also track your order from your account dashboard.",
      },
      {
        heading: "Delivery Partners",
        text: "We partner with reputed courier services including BlueDart, FedEx, and Delhivery to ensure safe and timely delivery of your orders.",
      },
      {
        heading: "Delivery Issues",
        text: "If you face any issues with delivery such as delays or damaged packages, please contact our customer support team immediately at support@movinairshoes.com.",
      },
    ],
  },
  returns: {
    title: "Returns & Exchange Policy",
    content: [
      {
        heading: "Return Window",
        text: "We offer a 7-day return window from the date of delivery. Items must be unworn, unwashed, and in their original packaging with all tags attached.",
      },
      {
        heading: "Exchange Process",
        text: "To initiate an exchange, please contact our customer support with your order number and reason for exchange. We will provide you with the necessary instructions and arrange for pickup.",
      },
      {
        heading: "Refund Timeline",
        text: "Once we receive and inspect the returned item, refunds will be processed within 5-7 business days. The amount will be credited to your original payment method.",
      },
      {
        heading: "Non-Returnable Items",
        text: "Items marked as 'Final Sale' or purchased during special promotions may not be eligible for return or exchange. Please check product descriptions carefully before purchasing.",
      },
      {
        heading: "Damaged or Defective Items",
        text: "If you receive a damaged or defective item, please contact us within 48 hours of delivery with photos of the damage. We will arrange for a free replacement or full refund.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    content: [
      {
        heading: "Information We Collect",
        text: "We collect personal information such as your name, email address, phone number, shipping address, and payment details when you place an order or create an account with us.",
      },
      {
        heading: "How We Use Your Information",
        text: "Your information is used to process orders, provide customer support, send promotional communications (with your consent), and improve our services.",
      },
      {
        heading: "Data Security",
        text: "We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology.",
      },
      {
        heading: "Third-Party Sharing",
        text: "We do not sell or rent your personal information to third parties. We may share your information with trusted service providers who assist in operating our business.",
      },
      {
        heading: "Your Rights",
        text: "You have the right to access, correct, or delete your personal information. You can also opt out of marketing communications at any time by clicking the unsubscribe link in our emails.",
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    content: [
      {
        heading: "Acceptance of Terms",
        text: "By accessing and using the MovinAir website, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.",
      },
      {
        heading: "Product Information",
        text: "We strive to provide accurate product descriptions and images. However, actual products may vary slightly in color due to screen settings. Prices are subject to change without notice.",
      },
      {
        heading: "Account Responsibility",
        text: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
      },
      {
        heading: "Intellectual Property",
        text: "All content on this website, including images, logos, and text, is the property of MovinAir and is protected by copyright laws. Unauthorized use is prohibited.",
      },
      {
        heading: "Limitation of Liability",
        text: "MovinAir shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.",
      },
      {
        heading: "Governing Law",
        text: "These Terms and Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai.",
      },
    ],
  },
};

const Policy = () => {
  const { type } = useParams();
  const policy = policies[type as keyof typeof policies];

  if (!policy) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-semibold mb-4">Policy Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <ChevronRight size={14} className="text-muted-foreground" />
            <span className="text-foreground font-medium">{policy.title}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">{policy.title}</h1>
          
          <div className="space-y-8">
            {policy.content.map((section, index) => (
              <div key={index}>
                <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-secondary rounded-lg">
            <h3 className="font-semibold mb-2">Have Questions?</h3>
            <p className="text-muted-foreground mb-4">
              If you have any questions about our policies, please don't hesitate to contact us.
            </p>
            <Link to="/contact" className="text-primary font-medium hover:underline">
              Contact Support →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Policy;