import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { ShieldAlert, Users, ChevronDown, CheckCircle2, Database } from 'lucide-react';
import { BACKEND_STATUS } from '../../services/supabase';

export const DemoBanner: React.FC = () => {
  const { currentUser, switchRole, navigateTo } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <aside aria-label="Demo environment notice" className="bg-[#163B65] text-white border-b border-slate-700/50 text-xs py-1.5 px-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-teal-300 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5" />
            <span>Interactive Demo Mode</span>
          </span>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <span className="text-slate-300 hidden md:inline">
            Local browser persistence active — no fake server or email claims.
          </span>
          <button
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="text-teal-300 underline hover:text-white transition-colors cursor-pointer ml-1"
          >
            {detailsOpen ? 'Hide Architecture Notes' : 'Backend & Supabase Readiness'}
          </button>
        </div>

        {/* Role Switcher */}
        <div className="relative flex items-center gap-2">
          <span className="text-slate-300 hidden lg:inline">Viewing as:</span>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded text-white font-medium transition-colors cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-teal-300" />
              <span className="capitalize">{currentUser ? `${currentUser.role} (${currentUser.fullName.split(' ')[0]})` : 'Guest Visitor'}</span>
              <ChevronDown className="w-3 h-3 text-slate-300" />
            </button>

            {menuOpen && (
              <div 
                className="absolute right-0 mt-1 w-64 bg-white text-slate-900 rounded shadow-xl border border-slate-200 py-1.5 z-50"
                onClick={() => setMenuOpen(false)}
              >
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                  Switch User Perspective
                </div>
                
                <button
                  onClick={() => switchRole('researcher')}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-start gap-2 transition-colors cursor-pointer"
                >
                  <div className="mt-0.5 text-teal-600 font-bold">•</div>
                  <div>
                    <div className="font-medium text-slate-900">Researcher (Chiamaka Eze)</div>
                    <div className="text-[11px] text-slate-500">Undergraduate at UNILAG · Create & Track Studies</div>
                  </div>
                </button>

                <button
                  onClick={() => switchRole('participant')}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-start gap-2 transition-colors cursor-pointer"
                >
                  <div className="mt-0.5 text-blue-600 font-bold">•</div>
                  <div>
                    <div className="font-medium text-slate-900">Participant (Babatunde Adebayo)</div>
                    <div className="text-[11px] text-slate-500">Student at OAU · Screen, Consent & Apply</div>
                  </div>
                </button>

                <button
                  onClick={() => switchRole('admin')}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-start gap-2 transition-colors cursor-pointer"
                >
                  <div className="mt-0.5 text-amber-600 font-bold">•</div>
                  <div>
                    <div className="font-medium text-slate-900">Administrator (Dr. Ibrahim Bello)</div>
                    <div className="text-[11px] text-slate-500">Ethics Reviewer at ABU · Approve/Reject Studies</div>
                  </div>
                </button>

                <div className="border-t border-slate-100 my-1"></div>

                <button
                  onClick={() => switchRole('guest')}
                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                >
                  Log out to Public Guest View
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {detailsOpen && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-slate-700/60 text-slate-300 grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] leading-relaxed">
          <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700">
            <span className="font-semibold text-white block mb-1">Architecture & Data Persistence:</span>
            <p>
              This V1.0 preview runs a typed client-side state engine that immediately stores user actions (creating studies, updating responses, recording consent) in browser <code className="text-teal-300 font-mono">localStorage</code>. 
              Service layer in <code className="text-teal-300 font-mono">src/services/supabase.ts</code> is structured for PostgreSQL migration via Row Level Security (RLS).
            </p>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700">
            <span className="font-semibold text-white block mb-1">Unimplemented Backend Functions (Documented):</span>
            <ul className="list-disc list-inside space-y-0.5 text-slate-300">
              {BACKEND_STATUS.unimplementedEndpoints.map((ep, i) => (
                <li key={i}>{ep}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </aside>
  );
};
