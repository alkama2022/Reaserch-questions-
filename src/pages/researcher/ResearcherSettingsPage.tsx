import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResearcherSidebar } from './ResearcherSidebar';
import { UserProfileForm } from '../../components/profile/UserProfileForm';
import { 
  User, 
  Lock, 
  Bell, 
  ShieldCheck, 
  Download, 
  Key, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Smartphone,
  Eye,
  EyeOff,
  Building2,
  FileText
} from 'lucide-react';

export const ResearcherSettingsPage: React.FC = () => {
  const { currentUser, showToast } = useApp();

  // Secondary navigation within the settings page
  const [activeSettingsSection, setActiveSettingsSection] = useState<
    'account' | 'security' | 'notifications' | 'compliance' | 'data'
  >('account');

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      showToast('Error', 'Please enter your current password.', 'warning');
      return;
    }
    if (newPassword.length < 8) {
      showToast('Error', 'New password must be at least 8 characters.', 'warning');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Error', 'New passwords do not match.', 'error');
      return;
    }

    showToast('Password Updated', 'Your researcher credentials have been updated.', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleExportAccountData = () => {
    const data = {
      profile: currentUser,
      exportedAt: new Date().toISOString(),
      platform: 'ResearchConnect Nigeria V1.0'
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', jsonStr);
    dlAnchor.setAttribute('download', `Researcher_Account_${currentUser?.id || 'profile'}.json`);
    dlAnchor.click();
    showToast('Account Data Downloaded', 'Exported JSON archive of your researcher profile.', 'info');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-100px)]">
      {/* Primary Workspace Sidebar */}
      <ResearcherSidebar activeTab="settings" />

      {/* Main Workspace Area with Secondary Settings Sidebar */}
      <main className="flex-1 bg-[#F7F9FC] p-3 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 overflow-y-auto">
        
        {/* Top Header & Breadcrumbs */}
        <div className="border-b border-slate-200 pb-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-1">
            <span>Researcher Console</span>
            <span>/</span>
            <span className="text-slate-800 font-medium">Settings & Preferences</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#163B65]">
            Researcher Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your academic bio, university affiliation, security credentials, and communication preferences.
          </p>
        </div>

        {/* 2-Column Layout: Secondary Settings Sidebar (desktop) / Tab bar (mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* Secondary Navigation Sidebar within Settings Page */}
          <nav aria-label="Settings sub-navigation" className="lg:col-span-3 bg-white rounded-lg border border-slate-200 shadow-xs p-2 sm:p-2.5 lg:p-3 space-y-1">
            <div className="hidden lg:block px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
              Settings Navigation
            </div>

            {/* Mobile Native Dropdown Selector (<= sm screens for quick access) */}
            <div className="sm:hidden mb-1">
              <label htmlFor="mobile-settings-select" className="sr-only">Select settings section</label>
              <select
                id="mobile-settings-select"
                value={activeSettingsSection}
                onChange={(e) => setActiveSettingsSection(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded text-xs font-semibold text-slate-800 focus:border-[#0F9D8A] outline-none min-h-[44px]"
              >
                <option value="account">👤 Account Settings (Bio & Affiliation)</option>
                <option value="security">🔒 Security & Passwords</option>
                <option value="notifications">🔔 Notification Rules</option>
                <option value="compliance">🛡️ Ethics & Verification</option>
                <option value="data">💾 Data & Privacy Controls</option>
              </select>
            </div>

            {/* Horizontal Scroll Tab Bar for Mobile/Tablet (< lg) and Vertical Sidebar for Desktop (>= lg) */}
            <div className="flex lg:flex-col gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
              <button
                type="button"
                onClick={() => setActiveSettingsSection('account')}
                className={`flex items-center gap-2 sm:gap-2.5 px-3 py-2.5 rounded text-xs font-medium transition-colors cursor-pointer text-left shrink-0 lg:w-full min-h-[44px] ${
                  activeSettingsSection === 'account'
                    ? 'bg-[#163B65] text-white shadow-2xs font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 bg-slate-50/70 lg:bg-transparent'
                }`}
              >
                <User className={`w-4 h-4 shrink-0 ${activeSettingsSection === 'account' ? 'text-teal-300' : 'text-slate-400'}`} />
                <div className="truncate">
                  <span className="block whitespace-nowrap sm:hidden">Account</span>
                  <span className="hidden sm:block whitespace-nowrap">Account Settings</span>
                  <span className={`hidden lg:block text-[10px] truncate ${activeSettingsSection === 'account' ? 'text-slate-300' : 'text-slate-400'}`}>
                    Bio, Affiliation & Contacts
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveSettingsSection('security')}
                className={`flex items-center gap-2 sm:gap-2.5 px-3 py-2.5 rounded text-xs font-medium transition-colors cursor-pointer text-left shrink-0 lg:w-full min-h-[44px] ${
                  activeSettingsSection === 'security'
                    ? 'bg-[#163B65] text-white shadow-2xs font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 bg-slate-50/70 lg:bg-transparent'
                }`}
              >
                <Lock className={`w-4 h-4 shrink-0 ${activeSettingsSection === 'security' ? 'text-teal-300' : 'text-slate-400'}`} />
                <div className="truncate">
                  <span className="block whitespace-nowrap sm:hidden">Security</span>
                  <span className="hidden sm:block whitespace-nowrap">Security & Passwords</span>
                  <span className={`hidden lg:block text-[10px] truncate ${activeSettingsSection === 'security' ? 'text-slate-300' : 'text-slate-400'}`}>
                    Credentials & 2FA
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveSettingsSection('notifications')}
                className={`flex items-center gap-2 sm:gap-2.5 px-3 py-2.5 rounded text-xs font-medium transition-colors cursor-pointer text-left shrink-0 lg:w-full min-h-[44px] ${
                  activeSettingsSection === 'notifications'
                    ? 'bg-[#163B65] text-white shadow-2xs font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 bg-slate-50/70 lg:bg-transparent'
                }`}
              >
                <Bell className={`w-4 h-4 shrink-0 ${activeSettingsSection === 'notifications' ? 'text-teal-300' : 'text-slate-400'}`} />
                <div className="truncate">
                  <span className="block whitespace-nowrap sm:hidden">Notifications</span>
                  <span className="hidden sm:block whitespace-nowrap">Notification Rules</span>
                  <span className={`hidden lg:block text-[10px] truncate ${activeSettingsSection === 'notifications' ? 'text-slate-300' : 'text-slate-400'}`}>
                    Milestones & SMS/WhatsApp
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveSettingsSection('compliance')}
                className={`flex items-center gap-2 sm:gap-2.5 px-3 py-2.5 rounded text-xs font-medium transition-colors cursor-pointer text-left shrink-0 lg:w-full min-h-[44px] ${
                  activeSettingsSection === 'compliance'
                    ? 'bg-[#163B65] text-white shadow-2xs font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 bg-slate-50/70 lg:bg-transparent'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 shrink-0 ${activeSettingsSection === 'compliance' ? 'text-teal-300' : 'text-slate-400'}`} />
                <div className="truncate">
                  <span className="block whitespace-nowrap sm:hidden">Ethics</span>
                  <span className="hidden sm:block whitespace-nowrap">Ethics & Verification</span>
                  <span className={`hidden lg:block text-[10px] truncate ${activeSettingsSection === 'compliance' ? 'text-slate-300' : 'text-slate-400'}`}>
                    Institutional Clearance
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveSettingsSection('data')}
                className={`flex items-center gap-2 sm:gap-2.5 px-3 py-2.5 rounded text-xs font-medium transition-colors cursor-pointer text-left shrink-0 lg:w-full min-h-[44px] ${
                  activeSettingsSection === 'data'
                    ? 'bg-[#163B65] text-white shadow-2xs font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 bg-slate-50/70 lg:bg-transparent'
                }`}
              >
                <Download className={`w-4 h-4 shrink-0 ${activeSettingsSection === 'data' ? 'text-teal-300' : 'text-slate-400'}`} />
                <div className="truncate">
                  <span className="block whitespace-nowrap sm:hidden">Data</span>
                  <span className="hidden sm:block whitespace-nowrap">Data & Privacy</span>
                  <span className={`hidden lg:block text-[10px] truncate ${activeSettingsSection === 'data' ? 'text-slate-300' : 'text-slate-400'}`}>
                    Export & Policy Controls
                  </span>
                </div>
              </button>
            </div>

            {/* Quick summary info */}
            <div className="hidden lg:block pt-3 mt-2 border-t border-slate-100 px-3 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-700 block">Session Status:</span>
              <span className="text-emerald-700 font-medium">Verified Researcher</span>
              <span className="block text-[10px] text-slate-400 mt-0.5">{currentUser?.institution}</span>
            </div>
          </nav>

          {/* Settings Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* 1. ACCOUNT SETTINGS SECTION (Displays UserProfileForm) */}
            {activeSettingsSection === 'account' && (
              <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-4 sm:p-6 space-y-6 animate-in fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-slate-900">
                    Account Settings
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Update your academic biography, Nigerian university affiliation, and participant contact preferences.
                  </p>
                </div>

                {/* Imported and displayed UserProfileForm component */}
                <UserProfileForm />
              </div>
            )}

            {/* 2. SECURITY & PASSWORDS SECTION */}
            {activeSettingsSection === 'security' && (
              <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-4 sm:p-6 space-y-6 text-xs animate-in fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-slate-900">Security & Authentication</h2>
                  <p className="text-slate-500 text-xs">
                    Update your portal password and manage secondary authorization controls.
                  </p>
                </div>

                <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Current Password *</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">New Password (Min 8 characters) *</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Confirm New Password *</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#163B65] hover:bg-[#112d4e] text-white font-semibold rounded flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Key className="w-3.5 h-3.5 text-teal-300" />
                    <span>Update Password</span>
                  </button>
                </form>

                {/* Two-Factor Authentication Toggle */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-[#163B65]" />
                    <span>Two-Factor Authentication (2FA)</span>
                  </h3>
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded">
                    <div>
                      <span className="font-semibold text-slate-800 block">Require OTP upon portal login</span>
                      <span className="text-[11px] text-slate-500">
                        Sends a 6-digit confirmation code to your verified Nigerian mobile/WhatsApp number.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setTwoFactorEnabled(!twoFactorEnabled);
                        showToast(
                          twoFactorEnabled ? '2FA Disabled' : '2FA Simulation Enabled',
                          twoFactorEnabled ? 'Standard password login active.' : 'OTP will be required on login.',
                          'info'
                        );
                      }}
                      className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors ${
                        twoFactorEnabled ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {twoFactorEnabled ? 'Enabled' : 'Enable 2FA'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. NOTIFICATION RULES SECTION */}
            {activeSettingsSection === 'notifications' && (
              <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-4 sm:p-6 space-y-6 text-xs animate-in fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-slate-900">Notification Rules & Delivery Channels</h2>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Fine-tune notification frequencies for recruitment targets and survey data quality alerts.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-3.5 sm:p-4 rounded bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-semibold text-slate-900 block">Target Quota Alerts</span>
                    <p className="text-slate-600">
                      When active questionnaire responses reach 25%, 50%, 75%, and 100% of your target sample size:
                    </p>
                    <div className="flex flex-wrap gap-3 sm:gap-4 pt-1">
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Email Alert (Active)</span>
                      </span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>WhatsApp Notification (Active)</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-semibold text-slate-900 block">Response Quality Anomaly Alerts</span>
                    <p className="text-slate-600">
                      Immediate alert dispatched when &gt; 3 responses from the same IP network or speed completions (&lt; 2 mins) are detected.
                    </p>
                    <span className="text-xs text-slate-500">Delivered via in-app audit banner.</span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. ETHICS & INSTITUTIONAL CLEARANCE SECTION */}
            {activeSettingsSection === 'compliance' && (
              <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-4 sm:p-6 space-y-6 text-xs animate-in fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-slate-900">Institutional Ethics & Verification</h2>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Overview of your departmental ethics clearance credentials and supervisor oversight.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 sm:p-4 bg-slate-50 rounded border border-slate-200 space-y-2">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Institutional Host</span>
                    <span className="font-bold text-[#163B65] text-sm block">{currentUser?.institution}</span>
                    <span className="text-slate-600 block">{currentUser?.department}, {currentUser?.faculty}</span>
                  </div>

                  <div className="p-3.5 sm:p-4 bg-emerald-50 rounded border border-emerald-200 space-y-2">
                    <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider block">Verification Level</span>
                    <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-sm">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Academic Affiliation Confirmed</span>
                    </div>
                    <span className="text-[11px] text-emerald-700 block">Eligible to submit research study requests.</span>
                  </div>
                </div>
              </div>
            )}

            {/* 5. DATA & PRIVACY CONTROLS */}
            {activeSettingsSection === 'data' && (
              <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-4 sm:p-6 space-y-6 text-xs animate-in fade-in">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-slate-900">Data & Privacy Controls</h2>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Export your complete researcher activity history or manage account data.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-3.5 sm:p-4 bg-slate-50 rounded border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900 block">Export Account Profile Archive</span>
                      <span className="text-slate-500">
                        Download a machine-readable JSON copy of your researcher profile and preferences.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleExportAccountData}
                      className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs shrink-0 min-h-[44px]"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Download Archive</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </main>
    </div>
  );
};
