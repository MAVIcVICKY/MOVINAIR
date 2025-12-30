import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-foreground text-background py-2">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="https://facebook.com/movinairshoes"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={16} />
          </a>
          <a
            href="https://twitter.com/MovinAir"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={16} />
          </a>
          <a
            href="https://instagram.com/movinairshoes"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
          <a
            href="https://linkedin.com/company/movinair"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
        </div>
        <p className="text-xs hidden sm:block">Free Shipping on Orders Above ₹999</p>
      </div>
    </div>
  );
};

export default TopBar;