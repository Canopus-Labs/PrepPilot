import React, { useState, useEffect } from "react";
import {
  LuChevronDown,
  LuFileText,
  LuUser,
  LuTriangleAlert,
  LuShield,
  LuGlobe,
} from "react-icons/lu";
import { Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu"; 
const sectionsData = [
  { id: "intro",        title: "Introduction",          icon: LuFileText      },
  { id: "acceptance",  title: "Acceptance of Terms",    icon: LuUser          },
  { id: "user-accounts", title: "User Accounts",        icon: LuUser          },
  { id: "use-of-service", title: "Use of Service",      icon: LuGlobe         },
  { id: "prohibited",  title: "Prohibited Conduct",     icon: LuTriangleAlert },
  { id: "intellectual", title: "Intellectual Property", icon: LuShield        },
  { id: "termination", title: "Termination",            icon: LuTriangleAlert },
  { id: "liability",   title: "Limitation of Liability", icon: LuShield       },
  { id: "governing",   title: "Governing Law",          icon: LuGlobe         },
  { id: "changes",     title: "Changes to Terms",       icon: LuFileText      },
];

const getSectionContent = (id) => {
  switch (id) {
    case "intro":
      return (
        <p>
          These Terms and Conditions govern your use of PrepPilot AI and its
          services. By accessing or using our platform, you agree to be bound by
          these terms.
        </p>
      );
    case "acceptance":
      return (
        <p>
          By creating an account or using PrepPilot AI, you confirm that you
          have read, understood, and agree to these Terms and Conditions, as
          well as our Privacy Policy.
        </p>
      );
    case "user-accounts":
      return (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>You must provide accurate and complete information when creating an account.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>You must notify us immediately of any unauthorized use of your account.</li>
        </ul>
      );
    case "use-of-service":
      return (
        <p>
          PrepPilot AI is intended for personal and professional interview
          preparation. You may not use the service for any unlawful purpose or
          in violation of these terms.
        </p>
      );
    case "prohibited":
      return (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Sharing or selling access to your account</li>
          <li>Attempting to reverse engineer or scrape the platform</li>
          <li>Using the service to harass, abuse, or harm others</li>
          <li>Uploading malicious code or content</li>
        </ul>
      );
    case "intellectual":
      return (
        <p>
          All content, features, and functionality on PrepPilot AI are owned by
          us and protected by copyright, trademark, and other intellectual
          property laws.
        </p>
      );
    case "termination":
      return (
        <p>
          We reserve the right to suspend or terminate your account at our
          discretion if you violate these terms.
        </p>
      );
    case "liability":
      return (
        <p>
          PrepPilot AI is provided "as is". We are not liable for any indirect,
          incidental, or consequential damages arising from your use of the
          service.
        </p>
      );
    case "governing":
      return (
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of India.
        </p>
      );
    case "changes":
      return (
        <p>
          We may update these Terms from time to time. Continued use of the
          service after changes constitutes acceptance of the new terms.
        </p>
      );
    default:
      return <p>Content coming soon.</p>;
  }
};

const TermsandConditions = () => {
  const [openSections, setOpenSections] = useState(new Set(["intro"]));
  const [activeSection, setActiveSection] = useState("intro");

  const openAndScrollTo = (id) => {
    // Open the section if not already open
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setActiveSection(id);
    // Scroll after state update
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  const toggleSection = (id) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-60px 0px -40% 0px" }
    );
    document.querySelectorAll(".policy-section").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-full bg-white dark:bg-[#0b1120] text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="absolute top-6 right-4 sm:right-6 lg:right-8 z-50">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm"
              >
                <LuArrowLeft size={14} />
                Back to Home
              </Link>
            </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex gap-8">

        {/* LEFT — Table of Contents */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 flex items-center gap-2">
              <LuFileText size={13} />
              Table of Contents
            </p>
            <nav className="space-y-0.5">
              {sectionsData.map((s) => {
                const Icon = s.icon;
                const isActive = activeSection === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => openAndScrollTo(s.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-xs transition-all duration-150 ${
                      isActive
                        ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 font-semibold"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
                    }`}
                  >
                    <Icon size={13} className={isActive ? "text-violet-500" : "text-gray-400"} />
                    {s.title}
                  </button>
                );
              })}
            </nav>
            <p className="mt-6 text-[10px] text-gray-400 dark:text-gray-600">
              Last Updated: June 20, 2026
            </p>
          </div>
        </aside>

        {/* RIGHT — Main Content */}
        <main className="flex-1 min-w-0">
          {/* Page header */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full mb-3">
              <LuFileText size={11} /> Legal
            </span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Terms and Conditions
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Please read these terms carefully before using PrepPilot AI.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-3">
            {sectionsData.map((sec) => {
              const Icon = sec.icon;
              const isOpen = openSections.has(sec.id);
              return (
                <div
                  id={sec.id}
                  key={sec.id}
                  className="policy-section border border-gray-200 dark:border-white/8 rounded-xl overflow-hidden bg-gray-50 dark:bg-white/[0.03] scroll-mt-6"
                >
                  <button
                    onClick={() => toggleSection(sec.id)}
                    className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={15} className="text-violet-500 dark:text-violet-400 shrink-0" />
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                        {sec.title}
                      </span>
                    </div>
                    <LuChevronDown
                      size={15}
                      className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-white/5 pt-3">
                      {getSectionContent(sec.id)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact footer */}
          <div className="mt-10 p-6 rounded-xl border border-violet-500/20 bg-violet-500/5 text-center">
            <p className="text-sm font-semibold text-gray-800 dark:text-white mb-1">Have questions?</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Reach out to us about these Terms at any time.
            </p>
            <a
              href="mailto:Karanmanickamofficial@gmail.com"
              className="inline-block px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-600">
            © {new Date().getFullYear()} PrepPilot AI. All rights reserved.
          </p>
        </main>
      </div>
    </div>
  );
};

export default TermsandConditions;
