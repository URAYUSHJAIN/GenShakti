import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const getLinkClass = (path) =>
    activePath === path
      ? "bg-[--lvl3] text-[--lvl1] font-bold px-8 py-3 rounded-[100px] transition-[0.2s]"
      : "px-4 py-3 text-[--lvl4] hover:text-[--lvl2] transition-colors transition-[0.2s]";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b-[2px] bg-[--lvl0] z-[999]">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="text-2xl text-[--lvl4] p-2 pr-6 rounded-[100px] tracking-[2px] font-bold flex items-center gap-2">
          <div className="h-10 w-10">
            <img src="/src/assets/img/genshakti.png" className="h-full w-full object-cover" alt="Genshakti Logo"/>
          </div>
          GENSHAKTI
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className={getLinkClass("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className={getLinkClass("/services")}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/impact" className={getLinkClass("/impact")}>
                Impact
              </Link>
            </li>
            <li>
              <Link to="/use-cases" className={getLinkClass("/use-cases")}>
                Use Cases
              </Link>
            </li>
            <li>
              <Link to="/contact" className={getLinkClass("/contact")}>
                Contact
              </Link>
            </li>
          </ul>
          <a href="https://sdg-dashboard.netlify.app/" className="bg-[--lvl3] hover:bg-[--lvl4] hover:text-[--lvl0] text-[--lvl1] py-3 px-8 rounded-[100px]">
            Dashboard
          </a>
        </nav>

        {/* Hamburger Button for Mobile */}
        <button
          className="lg:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--lvl4)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                to="/"
                className={getLinkClass("/")}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className={getLinkClass("/services")}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/impact"
                className={getLinkClass("/impact")}
                onClick={() => setIsMenuOpen(false)}
              >
                Impact
              </Link>
            </li>
            <li>
              <Link
                to="/use-cases"
                className={getLinkClass("/use-cases")}
                onClick={() => setIsMenuOpen(false)}
              >
                Use Cases
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={getLinkClass("/contact")}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <a
                href="https://sdg-dashboard.netlify.app/"
                className="w-full bg-[--lvl3] hover:bg-[--lvl4] hover:text-[--lvl0] text-[--lvl1] py-3 px-8 rounded-[100px]"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
