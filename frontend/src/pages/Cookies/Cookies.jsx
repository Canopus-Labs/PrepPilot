import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LuChevronDown,
  LuFileText,
  LuCookie,
  LuShield,
  LuGlobe,
  LuSettings,
  LuAlertTriangle,
  LuArrowLeft,
  LuList,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const CookiesPolicy = () => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState(new Set(["intro"]));
  const [activeSection, setActiveSection] = useState("intro");

  const toggleSection = (id) => {
    const newSet = new Set(openSections);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setOpenSections(newSet);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // Scroll Spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: "-80px 0px -20% 0px" },
    );
    const sections = document.querySelectorAll(".policy-section");
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const sectionsData = [
    {
      id: "intro",
      title: "Introduction",
      icon: <LuFileText className="w-5 h-5" />,
    },
    {
      id: "what-are-cookies",
      title: "What Are Cookies",
      icon: <LuCookie className="w-5 h-5" />,
    },
    {
      id: "why-we-use",
      title: "Why We Use Cookies",
      icon: <LuSettings className="w-5 h-5" />,
    },
    {
      id: "types-of-cookies",
      title: "Types of Cookies We Use",
      icon: <LuList className="w-5 h-5" />,
    },
    {
      id: "third-party",
      title: "Third-Party Cookies",
      icon: <LuGlobe className="w-5 h-5" />,
    },
    {
      id: "managing-cookies",
      title: "Managing Cookies",
      icon: <LuShield className="w-5 h-5" />,
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      icon: <LuFileText className="w-5 h-5" />,
    },
    {
      id: "contact",
      title: "Contact Us",
      icon: <LuAlertTriangle className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full pt-6 px-6">
        <div
          className="max-w-7xl mx-auto flex items-center justify-between rounded-full px-8 py-4"
          style={{
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="/PrepPilot-Logo.png" alt="Logo" className="w-8 h-8" />
            <span className="font-bold text-xl">
              PrepPilot <span className="text-violet-400">AI</span>
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm px-6 py-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-all"
          >
            <LuArrowLeft className="w-4 h-4" />
            Back to Home
          </motion.button>
        </div>
      </header>

      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 flex gap-12">
        {/* LEFT SIDEBAR */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-28">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <LuFileText className="text-violet-400" />
                Table of Contents
              </h2>
            </div>
            <nav className="space-y-1">
              {sectionsData.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 text-sm transition-all duration-200 ${
                    activeSection === section.id
                      ? "bg-violet-500/10 text-violet-300 border border-violet-500/30"
                      : "hover:bg-white/5 text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <span className="text-violet-400 opacity-70">
                    {section.icon}
                  </span>
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>
            <div className="mt-10 pt-6 border-t border-white/10 text-xs text-gray-500">
              Last Updated: June 22, 2026
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 max-w-3xl">
          <div className="mb-16 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-violet-500/10 border border-violet-500/30 rounded-full mb-6">
              <LuCookie className="text-violet-400" />
              <span className="uppercase tracking-widest text-sm font-semibold text-violet-300">
                LEGAL
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Cookies Policy
            </h1>
            <p className="text-xl text-gray-400 mt-6">
              Last Updated: June 22, 2026
            </p>
          </div>

          <div className="space-y-8">
            {sectionsData.map((sec) => (
              <div
                id={sec.id}
                key={sec.id}
                className="policy-section border border-white/10 rounded-3xl overflow-hidden bg-gray-900/50 backdrop-blur-sm scroll-mt-24"
              >
                <button
                  onClick={() => toggleSection(sec.id)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-violet-400">{sec.icon}</div>
                    <h3 className="text-2xl font-semibold text-white group-hover:text-violet-300 transition-colors">
                      {sec.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openSections.has(sec.id) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LuChevronDown className="w-6 h-6 text-gray-400" />
                  </motion.div>
                </button>

                {openSections.has(sec.id) && (
                  <div className="px-8 pb-8 text-[15.2px] leading-relaxed text-gray-300">
                    {getSectionContent(sec.id)}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Final Note */}
          <div className="mt-20 bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Have Questions?</h3>
            <p className="text-gray-400 mb-8">
              If you have any questions about our Cookies Policy, feel free to
              reach out.
            </p>
            <a
              href="mailto:legal@preppilot.ai"
              className="inline-block px-10 py-4 bg-white text-black font-semibold rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
            >
              Contact Legal Team
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} PrepPilot AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Comprehensive Section Content
const getSectionContent = (id) => {
  switch (id) {
    case "intro":
      return (
        <div className="space-y-4">
          <p>
            This Cookies Policy explains how PrepPilot AI ("we", "us", or "our")
            uses cookies and similar tracking technologies when you visit our
            website and use our services.
          </p>
          <p>
            By using PrepPilot AI, you consent to the use of cookies as
            described in this policy. If you do not agree, you should adjust
            your browser settings accordingly.
          </p>
        </div>
      );

    case "what-are-cookies":
      return (
        <p>
          Cookies are small text files that are placed on your device (computer,
          smartphone, or tablet) when you visit a website. They help websites
          remember your preferences, improve user experience, and provide
          analytical information.
        </p>
      );

    case "why-we-use":
      return (
        <ul className="list-disc pl-6 space-y-2">
          <li>To enable essential functionality of the platform</li>
          <li>To remember your preferences and login sessions</li>
          <li>To analyze website usage and improve our services</li>
          <li>To personalize your learning experience</li>
          <li>To ensure security and prevent fraudulent activity</li>
        </ul>
      );

    case "types-of-cookies":
      return (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-white mb-2">
              1. Essential Cookies
            </h4>
            <p>
              These cookies are necessary for the website to function properly.
              They cannot be disabled.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">
              2. Performance / Analytics Cookies
            </h4>
            <p>
              Help us understand how visitors interact with our platform using
              tools like Google Analytics.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">
              3. Functional Cookies
            </h4>
            <p>
              Allow us to remember your preferences such as theme, language, or
              saved progress.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">
              4. Targeting / Advertising Cookies
            </h4>
            <p>
              May be used to deliver more relevant content and advertisements
              (if applicable).
            </p>
          </div>
        </div>
      );

    case "third-party":
      return (
        <div className="space-y-4">
          <p>
            We may work with third-party service providers who set cookies on
            our site for analytics, security, and performance purposes. These
            include:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Google Analytics</li>
            <li>Payment processors (if applicable)</li>
            <li>Authentication providers</li>
          </ul>
          <p className="text-sm text-gray-400 mt-4">
            These third parties have their own privacy and cookie policies.
          </p>
        </div>
      );

    case "managing-cookies":
      return (
        <div className="space-y-4">
          <p>
            You can control and manage cookies through your browser settings.
            Most browsers allow you to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>View what cookies are set on your device</li>
            <li>Delete existing cookies</li>
            <li>Block future cookies</li>
            <li>Receive notifications when cookies are being set</li>
          </ul>
          <p className="text-sm text-gray-400">
            Please note that disabling essential cookies may affect the
            functionality of PrepPilot AI.
          </p>
        </div>
      );

    case "changes":
      return (
        <p>
          We may update this Cookies Policy from time to time to reflect changes
          in our practices or for legal reasons. The updated policy will be
          posted on this page with a revised "Last Updated" date. We encourage
          you to review this page periodically.
        </p>
      );

    case "contact":
      return (
        <p>
          If you have any questions about our Cookies Policy, please contact us
          at:{" "}
          <a
            href="mailto:legal@preppilot.ai"
            className="text-violet-400 hover:underline"
          >
            legal@preppilot.ai
          </a>
        </p>
      );

    default:
      return <p>Content coming soon.</p>;
  }
};

export default CookiesPolicy;
