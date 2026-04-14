import React, { useContext, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ProfileInfoCard from "../Cards/ProfileinfoCard";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Modal from "../Loader/Modal";
import Login from "../../pages/Auth/Login";
import ThemeToggle from "../ThemeToggle";

const Navbar = () => {
  const SERVICES = [
    { id: 1, title: "AI Assistance", path: "/ai-assistance" },
    { id: 2, title: "Cognitive Builder", path: "/aptitude" },
    { id: 3, title: "Role-Specific Preparation", path: "/role-prep" },
    { id: 4, title: "DSA Master Sheets", path: "/coding-sheets" },
    { id: 5, title: "Skill Assessment", path: "/assessment" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalNode, setPortalNode] = useState(null);
  const { user } = useContext(UserContext);
  // Helper for initial letter or fallback
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U';
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleServiceClick = (service) => {
    if (service.title === "Cognitive Builder" && !user) {
      setShowLoginModal(true);
    } else {
      navigate(service.path);
    }
  };

  // Ensure a single portal root for overlays (avoid duplicates if Navbar rendered more than once)
  useEffect(() => {
    let node = document.getElementById('nav-portal-root');
    if (!node) {
      node = document.createElement('div');
      node.id = 'nav-portal-root';
      document.body.appendChild(node);
    }
    setPortalNode(node);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Navbar Wrapper */}
      <div className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 shadow-sm dark:shadow-[0_4px_30px_rgb(0,0,0,0.5)] transition-colors duration-300">
        
        {/* Glass Container */}
        <div className="h-16 w-full max-w-[1400px] mx-auto flex items-center justify-between px-5 md:px-8 transition-colors duration-300">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h2 className="text-xl md:text-[22px] font-extrabold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">
              PrepPilot{" "}
              <span className="text-violet-600 dark:text-violet-400 drop-shadow-[0_0_8px_rgba(167,139,250,0.2)]">
                AI
              </span>
            </h2>
          </Link>

          {/* Hamburger Icon for mobile */}
          <button
            className="md:hidden flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-md transition"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          {/* Services Nav (Desktop narrow pill format) */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2 text-[14px] font-semibold transition-colors duration-300">
            {SERVICES.map((service) => {
              const isActive = location.pathname === service.path;
              const linkClasses = `relative px-3.5 py-1.5 rounded-full transition-all duration-200 hover:text-violet-700 dark:hover:text-white ${isActive ? "bg-gray-100 text-gray-900 dark:bg-white/10 dark:text-white ring-1 ring-gray-200/50 dark:ring-white/5" : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"}`;

              if (service.title === "DSA Master Sheets") {
                return (
                  <Link to={service.path} key={service.id} className={linkClasses}>
                    {service.title}
                  </Link>
                );
              }
              return (
                <button
                  key={service.id}
                  className={linkClasses}
                  onClick={() => handleServiceClick(service)}
                >
                  {service.title}
                </button>
              );
            })}
          </div>

          {/* Theme Toggle & Profile Info */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <div className="h-4 w-px bg-gray-200 dark:bg-white/10 mx-1"></div>
            <ProfileInfoCard />
          </div>
        </div>
      </div>
        {/* Mobile Menu Drawer */}
        {portalNode && mobileMenuOpen && createPortal(
          <div className="fixed inset-0 z-[999] md:hidden">
            <div
              className="absolute inset-0 bg-gray-900/50 dark:bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <nav
              id="mobile-nav-drawer"
              className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-[#0f172a] shadow-2xl flex flex-col pt-5 pb-8 px-6 overflow-y-auto border-l border-gray-200 dark:border-white/10 transition-transform duration-300 will-change-transform data-[state=closed]:translate-x-full"
              data-state={mobileMenuOpen ? 'open' : 'closed'}
            >
              <div className="flex items-start justify-between mb-4">
                {/* Profile Section */}
                <div className="flex items-center gap-3.5">
                  {user ? (
                    user.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl}
                        alt="Profile"
                        className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 shadow-sm object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-sm">
                        {userInitial}
                      </div>
                    )
                  ) : (
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-gray-500 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                      ?
                    </div>
                  )}
                  <div className="flex flex-col leading-tight">
                    <span className="text-[15px] font-bold text-gray-900 dark:text-white max-w-[150px] truncate">
                      {user ? (user.name || user.email) : 'Guest User'}
                    </span>
                    {user ? (
                      <button
                        onClick={() => {
                          localStorage.clear();
                          window.location.reload();
                        }}
                        className="text-xs text-red-500 dark:text-red-400 hover:text-red-600 transition font-medium self-start mt-0.5"
                      >
                        Logout
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setShowLoginModal(true);
                          setMobileMenuOpen(false);
                        }}
                        className="text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 transition font-medium self-start mt-0.5"
                      >
                        Sign in
                      </button>
                    )}
                  </div>
                </div>
                <button
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              
              {/* Divider */}
              <div className="w-full h-px bg-gray-100 dark:bg-white/10 mb-4" />
              
              {/* Theme Toggle in Mobile Menu */}
              <div className="flex items-center justify-between px-3 py-3 rounded-lg bg-gray-50 dark:bg-white/5 mb-5 border border-gray-100 dark:border-white/5">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Appearance</span>
                <ThemeToggle />
              </div>
              
              <ul className="flex flex-col gap-1.5">
                {SERVICES.map((service) => {
                  const isActive = location.pathname === service.path;
                  const baseClasses = "block w-full text-left px-5 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all";
                  const activeClasses = "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300 border border-violet-100 dark:border-violet-500/20";
                  const idleClasses = "text-gray-600 dark:text-gray-400 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-white/5 dark:hover:text-white border border-transparent";
                  
                  if (service.title === "DSA Master Sheets") {
                    return (
                      <li key={service.id}>
                        <Link
                          to={service.path}
                          className={`${baseClasses} ${isActive ? activeClasses : idleClasses}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {service.title}
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li key={service.id}>
                      <button
                        className={`${baseClasses} ${isActive ? activeClasses : idleClasses}`}
                        onClick={() => {
                          handleServiceClick(service);
                          setMobileMenuOpen(false);
                        }}
                      >
                        {service.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
              
              <div className="mt-auto pt-6 pb-2">
                <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/10 dark:to-fuchsia-900/10 p-4 rounded-xl border border-violet-100/50 dark:border-white/5">
                  <p className="text-[11px] text-violet-700/80 dark:text-white/50 leading-relaxed font-medium">
                    Master your skills with AI-driven interview preparation and comprehensive DSA master sheets.
                  </p>
                </div>
              </div>
            </nav>
          </div>,
          portalNode
        )}

      {/* Login Modal */}
      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Login"
      >
        <Login setCurrentPage={() => {}} />
      </Modal>
    </>
  );
};

export default Navbar;
