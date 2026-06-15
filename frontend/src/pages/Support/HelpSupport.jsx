import React from "react";
import { ExternalLink } from "lucide-react";

const HelpSupport = () => {
  return (
    <div className="min-h-full w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#f8f9fb] dark:bg-[#0b1120] transition-colors duration-300">
      <div className="max-w-2xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
          Contact Us
        </h1>

        {/* Get in Touch */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Get in Touch
          </h2>
          <div className="space-y-3 text-gray-600 dark:text-gray-400 text-base leading-relaxed">
            <p>Have any questions or need more information?</p>
            <p>
              We're here to help! Whether you're looking for support, have a
              business inquiry, or just want to say hello, we'd love to hear
              from you.
            </p>
            <p>
              Our team is committed to responding to all queries at the earliest
              possible time.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-gray-200 dark:border-white/10 mb-10" />

        {/* Contact Information */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Contact Information
          </h2>

          <div className="space-y-5 text-base text-gray-700 dark:text-gray-300">

            {/* Email */}
            <div>
              <p className="font-bold text-gray-900 dark:text-white mb-1">Email:</p>
              <a
                href="mailto:Karanmanickamofficial@gmail.com"
                className="text-violet-600 dark:text-violet-400 hover:underline"
              >
                Karanmanickamofficial@gmail.com
              </a>
            </div>

            {/* GitHub */}
            <div>
              <p className="font-bold text-gray-900 dark:text-white mb-1">GitHub:</p>
              <a
                href="https://github.com/Canopus-Labs/PrepPilot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-600 dark:text-violet-400 hover:underline inline-flex items-center gap-1"
              >
                https://github.com/Canopus-Labs/PrepPilot
                <ExternalLink size={14} />
              </a>
            </div>

            {/* LinkedIn */}
            <div>
              <p className="font-bold text-gray-900 dark:text-white mb-1">LinkedIn:</p>
              <a
                href="https://www.linkedin.com/in/karanunix/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-600 dark:text-violet-400 hover:underline inline-flex items-center gap-1"
              >
                https://www.linkedin.com/in/karanunix/
                <ExternalLink size={14} />
              </a>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default HelpSupport;
