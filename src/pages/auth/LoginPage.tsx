import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_USERS } from '../../services/mockData';
import { Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, Database } from 'lucide-react';
import { isSupabaseConfigured } from '../../services/supabase';

export const LoginPage: React.FC = () => {
  const { setCurrentUser, navigateTo, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide both your registered email address and password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Check if matches one of demo accounts or log in as researcher
      const matched = Object.values(DEMO_USERS).find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (matched) {
        setCurrentUser(matched);
        showToast('Signed In', `Welcome back, ${matched.fullName}!`, 'success');
        if (matched.role === 'researcher') navigateTo('researcher-overview');
        else if (matched.role === 'participant') navigateTo('participant-overview');
        else if (matched.role === 'admin') navigateTo('admin-overview');
      } else {
        // Create authenticated researcher profile in local state
        const customUser = {
          id: `usr-${Date.now()}`,
          email,
          fullName: email.split('@')[0].replace('.', ' '),
          role: 'researcher' as const,
          institution: 'Nigerian Tertiary Institution',
          createdAt: new Date().toISOString()
        };
        setCurrentUser(customUser);
        showToast('Signed In (Local Session)', `Signed in as ${customUser.fullName}`, 'success');
        navigateTo('researcher-overview');
      }
    }, 500);
  };

  const loginWithDemo = (roleKey: 'researcher' | 'participant' | 'admin') => {
    const demo = DEMO_USERS[roleKey];
    setCurrentUser(demo);
    showToast('Demo Access Granted', `Viewing as ${demo.fullName} (${demo.role})`, 'info');
    if (demo.role === 'researcher') navigateTo('researcher-overview');
    else if (demo.role === 'participant') navigateTo('participant-overview');
    else if (demo.role === 'admin') navigateTo('admin-overview');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Brand Lockup */}
        <div className="text-center space-y-1.5">
          <div className="w-10 h-10 rounded bg-[#163B65] text-white flex items-center justify-center font-bold text-base mx-auto">
            RC
          </div>
          <h1 className="text-xl font-bold text-[#163B65]">Sign In to ResearchConnect</h1>
          <p className="text-xs text-slate-500">
            Access your research studies or participant applications
          </p>
        </div>

        {/* Demo Mode / Supabase State Notice */}
        <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-600 space-y-1.5">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <Database className="w-3.5 h-3.5 text-[#0F9D8A]" />
            <span>Interactive Demo Authentication</span>
          </div>
          <p className="text-[11px] text-slate-500">
            {isSupabaseConfigured 
              ? 'Supabase backend connected.' 
              : 'Local session mode active. Quick-click a demo profile below or use your own credentials:'}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => loginWithDemo('researcher')}
              className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Researcher (UNILAG)
            </button>
            <button
              type="button"
              onClick={() => loginWithDemo('participant')}
              className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Participant (OAU)
            </button>
            <button
              type="button"
              onClick={() => loginWithDemo('admin')}
              className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Admin Desk
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="chiamaka.eze@unilag.edu.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-medium text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => navigateTo('forgot-password')}
                className="text-[11px] text-[#0F9D8A] hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-9 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#163B65] hover:bg-[#112d4e] text-white font-semibold rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
          <span>Don't have an account yet? </span>
          <button
            onClick={() => navigateTo('register')}
            className="text-[#0F9D8A] font-semibold hover:underline cursor-pointer"
          >
            Create an Account
          </button>
        </div>

      </div>
    </div>
  );
};
