import React from "react";
import {
  Headset,
  Info,
  Mail,
  Github,
  Linkedin,
  HelpCircle,
  ExternalLink,
  Heart,
  MessageCircle,
  Sparkles,
} from "lucide-react";

// Reusable card for a single contact channel — dashboard-style, with
// circular icon badge, equal height, and a lifted hover state.

const contactItems = [
  {
    icon: Mail,
    title: "Email",
    description: "Reach out to us anytime via email.",
    href: "mailto:Karanmanickamofficial@gmail.com",
    linkLabel: "Karanmanickamofficial@gmail.com",
  },
  {
    icon: Github,
    title: "GitHub",
    description: "Browse the project repository and report issues.",
    href: "https://github.com/Canopus-Labs/PrepPilot",
    linkLabel: "PrepPilot GitHub Repository",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    description: "Connect with the project maintainer.",
    href: "https://www.linkedin.com/in/karanunix/",
    linkLabel: "Connect on LinkedIn",
  },
];
const ContactCard = ({ icon: Icon, title, description, href, linkLabel }) => (
  <a
    href={href}
    aria-label={title}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex h-full flex-col gap-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.04] p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-[3px] hover:border-violet-400/60 dark:hover:border-violet-500/50 hover:bg-white
dark:hover:bg-white/[0.06]
hover:shadow-lg
hover:shadow-violet-500/20"
  >
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 transition-transform duration-300 ease-out group-hover:scale-110">
      <Icon size={24} />
    </span>
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 mt-auto">
      <span className="group-hover:underline">{linkLabel}</span>
      <ExternalLink
        size={14}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </span>
  </a>
);

const HelpSupport = () => {
  return (
    <div className="min-h-full w-full py-14 px-4 sm:px-6 lg:px-10 bg-[#f8f9fb] dark:bg-[#0b1120] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white">Help & Support</h1>

          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-400">
            Need assistance? Reach out through the support channels below and
            we'll be happy to help.
          </p>
        </header>

        {/* Get in Touch */}
        <section className="mb-16 overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-white to-violet-50/60 dark:from-white/[0.04] dark:to-violet-500/[0.06] shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-10 p-8 sm:p-10">
            <div className="flex-1 w-full">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400">
                  <Info size={20} />
                </span>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Get in Touch
                </h2>
              </div>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>Have any questions or need more information?</p>
                <p>
                  We're here to help! Whether you're looking for support, have a
                  business inquiry, or just want to say hello, we'd love to hear
                  from you.
                </p>
                <p>
                  Our team is committed to responding to all queries at the
                  earliest possible time.
                </p>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative hidden md:flex h-48 w-48 shrink-0 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-violet-500/10 blur-xl" />
              <span className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-violet-600 text-white shadow-lg shadow-violet-500/30 rotate-3">
                <MessageCircle size={48} />
              </span>
              <span className="absolute -top-2 -right-2 flex h-11 w-11 items-center justify-center rounded-full bg-white dark:bg-[#0b1120] ring-1 ring-violet-200 dark:ring-white/10 text-violet-500 shadow-md">
                <Sparkles size={18} />
              </span>
            </div>
          </div>
        </section>

        {/* Support Channels */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Support Channels
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            <ContactCard
              icon={Mail}
              title="Email"
              description="Send us an email anytime."
              href="mailto:Karanmanickamofficial@gmail.com"
              linkLabel="Karanmanickamofficial@gmail.com"
            />
            <ContactCard
              icon={Github}
              title="GitHub"
              description="Check out our source code or report issues."
              href="https://github.com/Canopus-Labs/PrepPilot"
              linkLabel="PrepPilot GitHub Repository"
            />
            <ContactCard
              icon={Linkedin}
              title="LinkedIn"
              description="Connect with the maintainer on LinkedIn."
              href="https://www.linkedin.com/in/karanunix/"
              linkLabel="Connect on LinkedIn"
            />
          </div>
        </section>

        {/* Need More Help */}
        <section className="mb-14 overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.04] shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-8 p-8 sm:p-10">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400">
              <HelpCircle size={28} />
            </span>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Need More Help?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Need assistance or have a question? We're always happy to help
                and would love to hear from you.
              </p>
            </div>
            <div className="hidden sm:flex h-20-20 shrink-0 items-center justify-center rounded-2xl bg-violet-600/10 text-violet-500 -rotate-3">
              <Mail size={30} />
            </div>
          </div>
        </section>

        {/* Footer note */}
        <p className="flex items-center justify-center gap-2 text-sm text-gray-400 dark:text-gray-400 text-center">
          <Heart size={14} className="text-violet-500 fill-violet-500" />
          Thank you for being a part of the PrepPilot community!
        </p>
      </div>
    </div>
  );
};

export default HelpSupport;
