import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, Mail, Phone } from "lucide-react";


function Footer() {
  return (
    <footer className="bg-[--lvl4] text-white py-8 px-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">GENSHAKTI</h3>
            <p className="text-sm">
              AI-powered renewable energy planning for a sustainable future.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm">
              <li>
                <Link to="/" className="hover:text-green-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-green-400">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-green-400">
                  Impact
                </Link>
              </li>
              <li>
                <Link to="/use-cases" className="hover:text-green-400">
                  Use Cases
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-green-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 space-y-2">
            <h4 className="text-lg font-semibold mb-2">Contact</h4>
            <div className="text-sm flex items-center space-x-2">
              <Mail className="text-base" />
              <span>info@genshakti.com</span>
            </div>
            <div className="text-sm flex items-center space-x-2">
              <Phone className="text-base" />
              <span> +91 9044789562</span>
            </div>
            
            <div className="flex space-x-4 mt-2">
              <Instagram className="text-base" />
              <Twitter className="text-base" />
              <Linkedin className="text-base" />
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} GENSHAKTI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
