import React, { useState, useEffect } from "react";
import {
  LuChevronDown,
  LuFileText,
  LuUser,
  LuTriangleAlert,
  LuShield,
  LuGlobe,
  LuCookie,
  LuShare2,
  LuLock,
  LuClock,
  LuBaby,
  LuMail,
} from "react-icons/lu";

const sectionsData = [
  { id: "intro",        title: "Introduction",                     icon: LuFileText },
  { id: "info-collect", title: "Information We Collect",           icon: LuUser },
  { id: "info-use",     title: "How We Use Your Information",      icon: LuGlobe },
  { id: "cookies",      title: "Cookies & Tracking Technologies",  icon: LuCookie },
  { id: "sharing",      title: "Data Sharing & Third-Party Services", icon: LuShare2 },
  { id: "security",     title: "Data Security",                    icon: LuLock },
  { id: "rights",       title: "Your Rights",                      icon: LuShield },
  { id: "retention",    title: "Data Retention",                   icon: LuClock },
  { id: "children",     title: "Children's Privacy",               icon: LuBaby },
  { id: "changes",      title: "Changes to This Privacy Policy",   icon: LuTriangleAlert },
  { id: "contact",      title: "Contact Us",                       icon: LuMail },
];

const getSectionContent = (id) => {
  switch (id) {
    case "intro":
      return (
        <p>
          This Privacy Policy explains how PrepPilot AI ("we", "us", or "our")
          collects, uses, discloses, and safeguards your information when you
          use our interview preparation platform. By accessing or using our
          services, you agree to the practices described in this policy.
        </p>
      );
    case "info-collect":
      return (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Account information such as your name, email address, and password</li>
          <li>Profile details, including job role, target companies, and skill level</li>
          <li>Interview responses, transcripts, and audio/video recordings you submit for practice sessions</li>
          <li>Usage data such as pages visited, features used, and session duration</li>
          <li>Device and technical information, including IP address, browser type, and operating system</li>
        </ul>
      );
    case "info-use":
      return (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>To provide, operate, and personalize your interview preparation experience</li>
          <li>To generate AI-driven feedback on your practice responses</li>
          <li>To improve our models, features, and overall platform quality</li>
          <li>To communicate with you about updates, tips, and account-related notices</li>
          <li>To detect, prevent, and address technical issues, fraud, or abuse</li>
        </ul>
      );
    case "cookies":
      return (
        <p>
          We use cookies and similar tracking technologies to keep you signed
          in, remember your preferences, and understand how you interact with
          PrepPilot AI. You can control cookie preferences through your browser
          settings, though disabling certain cookies may affect functionality.
        </p>
      );
    case "sharing":
      return (
        <p>
          We do not sell your personal information. We may share data with
          trusted third-party service providers who help us operate our
          platform (such as cloud hosting and analytics providers), and only
          to the extent necessary for them to perform their services. We may
          also disclose information if required by law or to protect our
          rights and users.
        </p>
      );
    case "security":
      return (
        <p>
          We implement industry-standard technical and organizational measures,
          including encryption in transit and at rest, to protect your data
          from unauthorized access, alteration, or disclosure. However, no
          method of transmission or storage is completely secure, and we
          cannot guarantee absolute security.
        </p>
      );
    case "rights":
      return (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Access, update, or correct your personal information</li>
          <li>Request deletion of your account and associated data</li>
          <li>Opt out of marketing communications at any time</li>
          <li>Request a copy of the data we hold about you</li>
          <li>Withdraw consent where processing is based on consent</li>
        </ul>
      );
    case "retention":
      return (
        <p>
          We retain your personal information for as long as your account is
          active or as needed to provide our services. We may retain certain
          data for longer periods where required by law, for legitimate
          business purposes, or to resolve disputes.
        </p>
      );
    case "children":
      return (
        <p>
          PrepPilot AI is not intended for individuals under the age of 16. We
          do not knowingly collect personal information from children. If you
          believe a child has provided us with personal data, please contact
          us so we can take appropriate action.
        </p>
      );
    case "changes":
      return (
        <p>
          We may update this Privacy Policy from time to time to reflect
          changes in our practices or legal requirements. We will notify you
          of material changes by posting the updated policy on this page with
          a revised "Last Updated" date.
        </p>
      );
    case "contact":
      return (
        <p>
          If you have any questions or concerns about this Privacy Policy or
          how we handle your data, please reach out to us using the contact
          details below.
        </p>
      );
    default:
      return <p>Content coming soon.</p>;
  }
};

const PrivacyPolicy = () => {
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
              <LuShield size={11} /> Legal
            </span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Your privacy matters to us. Here's how PrepPilot AI collects, uses, and protects your information.
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
              Reach out to us about this Privacy Policy at any time.
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

export default PrivacyPolicy;