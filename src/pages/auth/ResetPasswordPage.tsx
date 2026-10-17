import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      showToast('Password too short', 'Minimum 8 characters required.', 'warning');
      return;
    }
    if (password !== confirmPassword) {
      showToast('Mismatch', 'Passwords do not match.', 'error');
      return;
    }

    setDone(true);
    showToast('Password Updated', 'Your new credentials are saved.', 'success');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        <div className="space-y-1 text-center">
          <h1 className="text-xl font-bold text-[#163B65]">Set New Password</h1>
          <p className="text-xs text-slate-500">
            Create a secure password for your ResearchConnect account.
          </p>
        </div>

        {done ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-xs text-slate-600">
              Your password has been successfully reset.
            </p>
            <button
              onClick={() => navigateTo('login')}
              className="w-full py-2 bg-[#163B65] text-white text-xs font-semibold rounded hover:bg-[#112d4e] transition-colors cursor-pointer"
            >
              Sign In With New Password
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">New Password (Min 8 characters)</label>
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
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Confirm New Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#163B65] hover:bg-[#112d4e] text-white font-semibold rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Update Password</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
