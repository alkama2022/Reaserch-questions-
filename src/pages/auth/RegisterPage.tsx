import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NIGERIAN_UNIVERSITIES } from '../../services/mockData';
import { UserRole } from '../../types';
import { Eye, EyeOff, Lock, Mail, User, Building2, BookOpen, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { setCurrentUser, navigateTo, showToast } = useApp();
  
  // Registration Role (Strictly limited to researcher or participant - no self-assigned admin)
  const [role, setRole] = useState<'researcher' | 'participant'>('researcher');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState(NIGERIAN_UNIVERSITIES[0]);
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Email verification simulation state
  const [verificationPending, setVerificationPending] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setVerificationPending(true);
      showToast('Registration Initiated', 'Please verify your institutional email address.', 'info');
    }, 600);
  };

  const handleSimulateVerificationDone = () => {
    const newUser = {
      id: `usr-${Date.now()}`,
      email,
      fullName,
      role: role as UserRole,
      institution: university,
      faculty: faculty || 'Academic Faculty',
      department: department || 'Department',
      academicLevel: 'Undergraduate' as const,
      createdAt: new Date().toISOString()
    };

    setCurrentUser(newUser);
    showToast('Email Verified & Account Activated', `Welcome to ResearchConnect Nigeria, ${fullName}!`, 'success');

    if (role === 'researcher') {
      navigateTo('researcher-overview');
    } else {
      navigateTo('participant-overview');
    }
  };

  if (verificationPending) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5 text-center">
          <div className="w-12 h-12 rounded-full bg-teal-50 text-[#0F9D8A] flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#163B65]">Verify Your Email</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            In production, a secure verification link is dispatched to <strong>{email}</strong> via Supabase Auth.
          </p>
          <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs text-slate-500 text-left">
            <span className="font-semibold text-slate-800 block mb-1">Demo Mode Simulation:</span>
            Click below to simulate clicking the email link and instantly activate your verified <strong>{role}</strong> profile.
          </div>
          <button
            onClick={handleSimulateVerificationDone}
            className="w-full py-2.5 bg-[#0F9D8A] hover:bg-[#0c8070] text-white text-xs font-semibold rounded transition-colors cursor-pointer shadow-xs"
          >
            Confirm Email & Open {role === 'researcher' ? 'Researcher Console' : 'Participant Portal'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-[#163B65]">Create Your Account</h1>
          <p className="text-xs text-slate-500">
            Join the Nigerian academic research network
          </p>
        </div>

        {/* Role Selection: Zero-pill, clear functional buttons */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-800">
            Select Your Primary Purpose:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('researcher')}
              className={`p-3.5 text-left rounded border transition-all cursor-pointer ${
                role === 'researcher'
                  ? 'border-[#163B65] bg-blue-50/50 ring-1 ring-[#163B65]'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="font-bold text-xs text-[#163B65] flex items-center justify-between">
                <span>Researcher</span>
                {role === 'researcher' && <CheckCircle2 className="w-3.5 h-3.5 text-[#163B65]" />}
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Final-year undergraduate, MSc/PhD candidate, or lecturer posting research studies.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setRole('participant')}
              className={`p-3.5 text-left rounded border transition-all cursor-pointer ${
                role === 'participant'
                  ? 'border-[#0F9D8A] bg-teal-50/50 ring-1 ring-[#0F9D8A]'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="font-bold text-xs text-[#0F9D8A] flex items-center justify-between">
                <span>Participant</span>
                {role === 'participant' && <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9D8A]" />}
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                University student volunteering to take academic surveys and earn tokens/certificates.
              </p>
            </button>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            Note: Administrative privileges are protected and assigned strictly by system ethics directors.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Full Legal Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                placeholder="e.g. Babatunde Adebayo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">University / Student Email *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="name@student.unilag.edu.ng or personal email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Institution in Nigeria *</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <select
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 bg-white"
              >
                {NIGERIAN_UNIVERSITIES.map((uni) => (
                  <option key={uni} value={uni}>{uni}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Faculty</label>
              <input
                type="text"
                placeholder="e.g. Social Sciences, Engineering"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Department / Course</label>
              <input
                type="text"
                placeholder="e.g. Economics, Medicine"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Create Password (Min 8 chars) *</label>
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

            <div>
              <label className="block font-medium text-slate-700 mb-1">Confirm Password *</label>
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
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#163B65] hover:bg-[#112d4e] text-white font-semibold rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              {loading ? (
                <span>Setting up account...</span>
              ) : (
                <>
                  <span>Create {role === 'researcher' ? 'Researcher' : 'Participant'} Account</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
          <span>Already have an account? </span>
          <button
            onClick={() => navigateTo('login')}
            className="text-[#0F9D8A] font-semibold hover:underline cursor-pointer"
          >
            Sign in here
          </button>
        </div>

      </div>
    </div>
  );
};
