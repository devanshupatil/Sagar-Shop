import { Twitter, Linkedin, Github, ShoppingBag } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' }
  ];

  const socialLinks = [
    { label: 'Twitter', href: '#', icon: <Twitter size={20} /> },
    { label: 'LinkedIn', href: '#', icon: <Linkedin size={20} /> },
    { label: 'GitHub', href: '#', icon: <Github size={20} /> }
  ];

  return (
    <footer className="bg-neutral-800 text-gray-200">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="text-white" size={24} />
              <h3 className="text-xl font-bold">Sagar Shop</h3>
            </div>
            <p className="text-gray-400">
              Your one-stop destination for quality shopping since 2022
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white hover:underline transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  className="hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Sagar Shop. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-white transition-colors duration-200">
                Privacy
              </a>
              <span>•</span>
              <a href="/terms" className="hover:text-white transition-colors duration-200">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;