import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, BookOpen, AlertCircle, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-white border-t border-slate-200 mt-16 text-slate-600 text-sm">
      {/* Integrity & Ethics Advisory Banner */}
      <div className="bg-slate-50 border-b border-slate-200 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#0F9D8A] shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800">
                Academic Research Integrity & Informed Consent Notice
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 max-w-3xl leading-relaxed">
                ResearchConnect Nigeria operates as an academic participant recruitment facilitator. All questionnaire content, research claims, ethics committee clearances, and final data validities are the sole responsibility of the individual student researchers and supervising faculty.
              </p>
            </div>
          </div>
          <div className="shrink-0 text-xs text-slate-500">
            Targeting Nigerian Tertiary Institutions · V1.0 MVP
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#163B65] text-white flex items-center justify-center font-bold text-xs">
                RC
              </div>
              <span className="font-bold text-[#163B65] text-base">
                ResearchConnect Nigeria
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              "Connecting Research with the Right People."
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              A specialized recruitment platform designed for Nigerian final-year undergraduate students, postgraduate scholars, lecturers, and academic departments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Platform
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('browse-studies')} className="hover:text-[#163B65] transition-colors cursor-pointer">
                  Browse Active Studies
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('how-it-works')} className="hover:text-[#163B65] transition-colors cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('for-researchers')} className="hover:text-[#163B65] transition-colors cursor-pointer">
                  For Student Researchers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('for-participants')} className="hover:text-[#163B65] transition-colors cursor-pointer">
                  For Study Participants
                </button>
              </li>
            </ul>
          </div>

          {/* Quality & Methodology */}
          <div>
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Academic Standards
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('how-it-works')} className="hover:text-[#163B65] transition-colors cursor-pointer">
                  Informed Consent Protocol
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('how-it-works')} className="hover:text-[#163B65] transition-colors cursor-pointer">
                  Response Quality Indicators & Limitations
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-[#163B65] transition-colors cursor-pointer">
                  Participant Privacy & Data Minimization
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms')} className="hover:text-[#163B65] transition-colors cursor-pointer">
                  Academic Ethics & Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional / Contact */}
          <div>
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-3">
              About & Support
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#163B65] transition-colors cursor-pointer">
                  About ResearchConnect
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#163B65] transition-colors cursor-pointer">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('login')} className="hover:text-[#163B65] transition-colors cursor-pointer">
                  Researcher Sign In
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('register')} className="hover:text-[#163B65] transition-colors cursor-pointer">
                  Create Account
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>
            © {new Date().getFullYear()} ResearchConnect Nigeria. Built for higher education and academic inquiry in Nigeria.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('privacy')} className="hover:underline">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => navigateTo('terms')} className="hover:underline">
              Terms of Service
            </button>
            <span>·</span>
            <button onClick={() => navigateTo('contact')} className="hover:underline">
              Help Desk
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
