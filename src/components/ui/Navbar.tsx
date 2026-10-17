import React, { useState } from 'react';
import { useApp, NavigationPage } from '../../context/AppContext';
import { Menu, X, ArrowRight, UserCheck, ShieldCheck, GraduationCap, LayoutDashboard } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, currentPage, navigateTo } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPublicPage = [
    'home',
    'how-it-works',
    'for-researchers',
    'for-participants',
    'browse-studies',
    'study-details',
    'about',
    'contact',
    'privacy',
    'terms',
    'login',
    'register',
    'forgot-password',
    'reset-password'
  ].includes(currentPage);

  const getDashboardDestination = (): NavigationPage => {
    if (!currentUser) return 'login';
    if (currentUser.role === 'researcher') return 'researcher-overview';
    if (currentUser.role === 'participant') return 'participant-overview';
    if (currentUser.role === 'admin') return 'admin-overview';
    return 'browse-studies';
  };

  const getDashboardLabel = () => {
    if (!currentUser) return 'Sign In';
    if (currentUser.role === 'researcher') return 'Researcher Console';
    if (currentUser.role === 'participant') return 'Participant Portal';
    if (currentUser.role === 'admin') return 'Admin Review Desk';
    return 'My Portal';
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-[31px] z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly compliant 3-Zone Top Bar */}
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded bg-[#163B65] text-white flex items-center justify-center font-bold text-sm tracking-tighter">
                RC
              </div>
              <span className="text-lg font-bold tracking-tight text-[#163B65] whitespace-nowrap">
                ResearchConnect <span className="text-[#0F9D8A] font-normal">Nigeria</span>
              </span>
            </button>
          </div>

          {/* Zone 2: 4–5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => navigateTo('browse-studies')}
              className={`hover:text-[#163B65] transition-colors whitespace-nowrap cursor-pointer ${currentPage === 'browse-studies' ? 'text-[#163B65] font-semibold border-b-2 border-[#0F9D8A] pb-0.5' : ''}`}
            >
              Browse Studies
            </button>
            <button
              onClick={() => navigateTo('how-it-works')}
              className={`hover:text-[#163B65] transition-colors whitespace-nowrap cursor-pointer ${currentPage === 'how-it-works' ? 'text-[#163B65] font-semibold border-b-2 border-[#0F9D8A] pb-0.5' : ''}`}
            >
              How It Works
            </button>
            <button
              onClick={() => navigateTo('for-researchers')}
              className={`hover:text-[#163B65] transition-colors whitespace-nowrap cursor-pointer ${currentPage === 'for-researchers' ? 'text-[#163B65] font-semibold border-b-2 border-[#0F9D8A] pb-0.5' : ''}`}
            >
              For Researchers
            </button>
            <button
              onClick={() => navigateTo('for-participants')}
              className={`hover:text-[#163B65] transition-colors whitespace-nowrap cursor-pointer ${currentPage === 'for-participants' ? 'text-[#163B65] font-semibold border-b-2 border-[#0F9D8A] pb-0.5' : ''}`}
            >
              For Participants
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`hover:text-[#163B65] transition-colors whitespace-nowrap cursor-pointer ${currentPage === 'about' ? 'text-[#163B65] font-semibold border-b-2 border-[#0F9D8A] pb-0.5' : ''}`}
            >
              About
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {currentUser ? (
              <button
                onClick={() => navigateTo(getDashboardDestination())}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#163B65] hover:bg-[#112d4e] rounded transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-teal-300" />
                <span>{getDashboardLabel()}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => navigateTo('login')}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigateTo('register')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0F9D8A] hover:bg-[#0c8070] rounded transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Recruit Participants</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-3 space-y-2">
            <div className="grid grid-cols-1 gap-1 text-sm">
              <button
                onClick={() => { navigateTo('browse-studies'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded text-slate-700 hover:bg-slate-100 font-medium"
              >
                Browse Studies
              </button>
              <button
                onClick={() => { navigateTo('how-it-works'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded text-slate-700 hover:bg-slate-100 font-medium"
              >
                How It Works
              </button>
              <button
                onClick={() => { navigateTo('for-researchers'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded text-slate-700 hover:bg-slate-100 font-medium"
              >
                For Researchers
              </button>
              <button
                onClick={() => { navigateTo('for-participants'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded text-slate-700 hover:bg-slate-100 font-medium"
              >
                For Participants
              </button>
              <button
                onClick={() => { navigateTo('about'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded text-slate-700 hover:bg-slate-100 font-medium"
              >
                About Platform
              </button>
              <button
                onClick={() => { navigateTo('contact'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded text-slate-700 hover:bg-slate-100 font-medium"
              >
                Contact
              </button>
            </div>

            <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
              {currentUser ? (
                <button
                  onClick={() => { navigateTo(getDashboardDestination()); setMobileMenuOpen(false); }}
                  className="w-full text-center py-2 text-xs font-semibold text-white bg-[#163B65] rounded"
                >
                  Go to {getDashboardLabel()}
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => { navigateTo('login'); setMobileMenuOpen(false); }}
                    className="w-full text-center py-2 text-xs font-medium border border-slate-300 rounded text-slate-700"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => { navigateTo('register'); setMobileMenuOpen(false); }}
                    className="w-full text-center py-2 text-xs font-semibold text-white bg-[#0F9D8A] rounded"
                  >
                    Register / Post Study
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
