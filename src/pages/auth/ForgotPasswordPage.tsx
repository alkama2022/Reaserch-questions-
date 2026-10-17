import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    showToast('Reset Link Dispatched', 'Password reset instructions have been dispatched.', 'info');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        <button
          onClick={() => navigateTo('login')}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </button>

        <div className="space-y-1">
          <h1 className="text-xl font-bold text-[#163B65]">Reset Your Password</h1>
          <p className="text-xs text-slate-500">
            Enter your registered university email to receive recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-xs">
              <strong className="text-slate-900 block">Check your inbox</strong>
              <p className="text-slate-600">
                A password reset token was simulated for <strong>{email}</strong>.
              </p>
            </div>
            <button
              onClick={() => navigateTo('reset-password')}
              className="w-full py-2 bg-[#0F9D8A] text-white text-xs font-semibold rounded hover:bg-[#0c8070] transition-colors cursor-pointer"
            >
              Simulate Password Reset Link
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  placeholder="name@university.edu.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#163B65] hover:bg-[#112d4e] text-white font-semibold rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Send Recovery Link</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
