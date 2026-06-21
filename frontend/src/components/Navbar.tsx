import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Purely visual: adds an elevated shadow once the page has scrolled,
  // matching the "sticky top, shadow on scroll" navbar spec.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClasses = (path: string) =>
    `relative px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ease-in-out
    ${location.pathname === path
      ? "text-primary bg-primary-50"
      : "text-slate-600 hover:text-primary hover:bg-slate-50"}
    `;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutAndCloseMenu = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav
      className={`bg-white sticky top-0 z-50 border-b transition-shadow duration-300 ease-in-out
        ${scrolled ? "shadow-md border-slate-200" : "shadow-none border-slate-100"}`}
    >
      <div className="container-page">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl shadow-sm transition-transform duration-200 group-hover:scale-105">
              🏘️
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              PropSpace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Link to="/dashboard" className={navLinkClasses("/dashboard")}>
                  Dashboard
                </Link>
                <Link to="/mine" className={navLinkClasses("/mine")}>
                  My Listings
                </Link>
                <Link to="/create" className={navLinkClasses("/create")}>
                  Create
                </Link>
                <Link to="/profile" className={navLinkClasses("/profile")}>
                  Profile
                </Link>
                <button
                  onClick={logoutAndCloseMenu}
                  className="ml-4 px-5 py-2.5 text-sm font-semibold rounded-xl text-error-600 hover:bg-error-50 transition-all duration-200 ease-in-out"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={navLinkClasses("/login")}>
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary ml-2 px-6 py-2.5"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-200 ease-in-out"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white animate-slide-up" id="mobile-menu">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`${navLinkClasses("/dashboard")} block`}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/mine"
                  className={`${navLinkClasses("/mine")} block`}
                  onClick={() => setIsOpen(false)}
                >
                  My Listings
                </Link>
                <Link
                  to="/create"
                  className={`${navLinkClasses("/create")} block`}
                  onClick={() => setIsOpen(false)}
                >
                  Create
                </Link>
                <Link
                  to="/profile"
                  className={`${navLinkClasses("/profile")} block`}
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={logoutAndCloseMenu}
                  className="block w-full text-left px-4 py-2.5 text-base font-semibold rounded-xl text-error-600 hover:bg-error-50 transition-all duration-200 ease-in-out"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`${navLinkClasses("/login")} block`}
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary mt-2 w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
