import React from "react";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";

const HelpSupport = () => {
  return (
    <div className="min-h-full w-full py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0b1120] transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Contact Us
          </h1>
          <div className="h-1.5 w-20 bg-violet-600 mx-auto rounded-full shadow-[0_0_8px_rgba(124,58,237,0.5)]"></div>
        </div>

        <div className="bg-gray-50 dark:bg-[#111827] rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 overflow-hidden transition-all duration-300">
          <div className="p-8 md:p-12 space-y-10">
            {/* Get in Touch Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <span className="w-2 h-8 bg-violet-600 rounded-full"></span>
                Get in Touch
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Have any questions or need more information?
                </p>
                <p>
                  We're here to help! Whether you're looking for support, have a business inquiry, or just want to say hello, we'd love to hear from you.
                </p>
                <p>
                  Our team is committed to responding to all queries at the earliest possible time.
                </p>
              </div>
            </section>

            {/* Contact Information Section */}
            <section className="space-y-6 pt-6 border-t border-gray-100 dark:border-white/5">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <span className="w-2 h-8 bg-violet-600 rounded-full"></span>
                Contact Information
              </h2>
              
              <div className="grid gap-6">
                {/* Email */}
                <div className="group p-4 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-violet-500/30 dark:hover:border-violet-500/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform duration-300">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-1">
                        Email
                      </h3>
                      <a 
                        href="mailto:Karanmanickamofficial@gmail.com"
                        className="text-lg font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 break-all transition-colors"
                      >
                        Karanmanickamofficial@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* GitHub */}
                <div className="group p-4 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-violet-500/30 dark:hover:border-violet-500/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300">
                      <Github size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-1">
                        GitHub
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Canopus Labs -</span>
                        <a 
                          href="https://github.com/Canopus-Labs/PrepPilot"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 flex items-center gap-1 transition-colors"
                        >
                          https://github.com/Canopus-Labs/PrepPilot
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="group p-4 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-violet-500/30 dark:hover:border-violet-500/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      <Linkedin size={24} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-1">
                        LinkedIn
                      </h3>
                      <a 
                        href="https://www.linkedin.com/in/karanunix/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 flex items-center gap-1 transition-colors"
                      >
                        https://www.linkedin.com/in/karanunix/
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
