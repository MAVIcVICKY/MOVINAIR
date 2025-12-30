import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-950 border-t border-white/10 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <span className="text-2xl font-bold italic tracking-tighter text-white">MOVINAIR</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Comfortable Every Where. We craft premium footwear that combines Italian elegance with modern comfort technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-red-600 hover:text-white transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-red-600 hover:text-white transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-red-600 hover:text-white transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-red-600 hover:text-white transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-neutral-400 hover:text-red-500 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/shop" className="text-neutral-400 hover:text-red-500 transition-colors text-sm">Shop Collection</Link></li>
              <li><Link to="/contact" className="text-neutral-400 hover:text-red-500 transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/wishlist" className="text-neutral-400 hover:text-red-500 transition-colors text-sm">Wishlist</Link></li>
              <li><Link to="/account" className="text-neutral-400 hover:text-red-500 transition-colors text-sm">My Account</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Customer Support</h3>
            <ul className="space-y-4">
              <li><Link to="/policies/shipping" className="text-neutral-400 hover:text-red-500 transition-colors text-sm">Shipping Policy</Link></li>
              <li><Link to="/policies/returns" className="text-neutral-400 hover:text-red-500 transition-colors text-sm">Returns & Exchange</Link></li>
              <li><Link to="/policies/privacy" className="text-neutral-400 hover:text-red-500 transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/policies/terms" className="text-neutral-400 hover:text-red-500 transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="/policies/faq" className="text-neutral-400 hover:text-red-500 transition-colors text-sm">faqs</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Stay Updated</h3>
            <p className="text-neutral-400 text-sm mb-4">Subscribe to our newsletter for exclusive offers and updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500 flex-1 transition-colors"
              />
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">© 2024 MovinAir. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <Phone size={14} className="text-red-500" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <Mail size={14} className="text-red-500" />
              <span>support@movinair.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
