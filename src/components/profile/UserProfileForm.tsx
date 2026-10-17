import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UserProfile, ContactPreferences } from '../../types';
import { NIGERIAN_UNIVERSITIES } from '../../services/mockData';
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Save, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  ExternalLink, 
  X, 
  Lock, 
  Eye, 
  Bell
} from 'lucide-react';

const TITLE_OPTIONS = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Engr.', 'Pharm.', 'Barr.'];

const ACADEMIC_LEVELS = [
  'Undergraduate',
  'Postgraduate (Masters)',
  'Postgraduate (PhD)',
  'Lecturer / Academic Staff',
  'Independent Researcher'
] as const;

const AVATAR_PRESETS = [
  { label: 'Scholar (Female)', url: '/src/assets/images/avatar_nigerian_female_scholar_1792198295926.jpg' },
  { label: 'Scholar (Male)', url: '/src/assets/images/avatar_nigerian_male_scholar_1792198295975.jpg' },
];

export const UserProfileForm: React.FC = () => {
  const { currentUser, setCurrentUser, showToast } = useApp();

  // Active step/tab within UserProfileForm
  const [activeTab, setActiveTab] = useState<'bio' | 'affiliation' | 'contact' | 'preview'>('bio');

  // Form states initialized from currentUser
  const [titlePrefix, setTitlePrefix] = useState(currentUser?.titlePrefix || 'Ms.');
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || AVATAR_PRESETS[0].url);
  const [customAvatar, setCustomAvatar] = useState(false);
  
  // Research interests
  const [interests, setInterests] = useState<string[]>(
    currentUser?.researchInterests || ['Fintech Adoption', 'Financial Inclusion', 'Development Economics']
  );
  const [newInterestInput, setNewInterestInput] = useState('');

  // Scholarly links
  const [orcidId, setOrcidId] = useState(currentUser?.orcidId || '');
  const [scholarUrl, setScholarUrl] = useState(currentUser?.scholarUrl || '');

  // Affiliation
  const [institution, setInstitution] = useState(currentUser?.institution || NIGERIAN_UNIVERSITIES[0]);
  const [faculty, setFaculty] = useState(currentUser?.faculty || '');
  const [department, setDepartment] = useState(currentUser?.department || '');
  const [academicLevel, setAcademicLevel] = useState<UserProfile['academicLevel']>(
    currentUser?.academicLevel || 'Undergraduate'
  );
  const [matricOrStaffId, setMatricOrStaffId] = useState(currentUser?.matricOrStaffId || '');
  const [supervisorName, setSupervisorName] = useState(currentUser?.supervisorName || '');

  // Contact & Preferences
  const [primaryEmail, setPrimaryEmail] = useState(currentUser?.email || '');
  const [secondaryEmail, setSecondaryEmail] = useState(currentUser?.secondaryEmail || '');
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber || '');
  const [contactPrefs, setContactPrefs] = useState<ContactPreferences>(
    currentUser?.contactPreferences || {
      emailNotifications: true,
      whatsappAlerts: true,
      phoneCallsPermitted: false,
      weeklyRecruitmentDigest: true,
      urgentComplianceAlerts: true,
      allowParticipantClarityInquiries: true,
      preferredContactMethod: 'email'
    }
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Sync state if currentUser changes
  useEffect(() => {
    if (currentUser) {
      setTitlePrefix(currentUser.titlePrefix || 'Ms.');
      setFullName(currentUser.fullName || '');
      setBio(currentUser.bio || '');
      setAvatarUrl(currentUser.avatarUrl || AVATAR_PRESETS[0].url);
      setInterests(currentUser.researchInterests || ['Fintech Adoption', 'Financial Inclusion']);
      setOrcidId(currentUser.orcidId || '');
      setScholarUrl(currentUser.scholarUrl || '');
      setInstitution(currentUser.institution || NIGERIAN_UNIVERSITIES[0]);
      setFaculty(currentUser.faculty || '');
      setDepartment(currentUser.department || '');
      setAcademicLevel(currentUser.academicLevel || 'Undergraduate');
      setMatricOrStaffId(currentUser.matricOrStaffId || '');
      setSupervisorName(currentUser.supervisorName || '');
      setPrimaryEmail(currentUser.email || '');
      setSecondaryEmail(currentUser.secondaryEmail || '');
      setPhoneNumber(currentUser.phoneNumber || '');
      if (currentUser.contactPreferences) {
        setContactPrefs(currentUser.contactPreferences);
      }
      setIsDirty(false);
    }
  }, [currentUser]);

  const handleInterestAdd = () => {
    if (!newInterestInput.trim()) return;
    if (interests.includes(newInterestInput.trim())) return;
    setInterests(prev => [...prev, newInterestInput.trim()]);
    setNewInterestInput('');
    setIsDirty(true);
  };

  const handleInterestRemove = (tag: string) => {
    setInterests(prev => prev.filter(t => t !== tag));
    setIsDirty(true);
  };

  const handleReset = () => {
    if (!currentUser) return;
    setTitlePrefix(currentUser.titlePrefix || 'Ms.');
    setFullName(currentUser.fullName || '');
    setBio(currentUser.bio || '');
    setAvatarUrl(currentUser.avatarUrl || AVATAR_PRESETS[0].url);
    setInterests(currentUser.researchInterests || []);
    setOrcidId(currentUser.orcidId || '');
    setScholarUrl(currentUser.scholarUrl || '');
    setInstitution(currentUser.institution || NIGERIAN_UNIVERSITIES[0]);
    setFaculty(currentUser.faculty || '');
    setDepartment(currentUser.department || '');
    setAcademicLevel(currentUser.academicLevel || 'Undergraduate');
    setMatricOrStaffId(currentUser.matricOrStaffId || '');
    setSupervisorName(currentUser.supervisorName || '');
    setPrimaryEmail(currentUser.email || '');
    setSecondaryEmail(currentUser.secondaryEmail || '');
    setPhoneNumber(currentUser.phoneNumber || '');
    if (currentUser.contactPreferences) {
      setContactPrefs(currentUser.contactPreferences);
    }
    setIsDirty(false);
    showToast('Changes Discarded', 'Profile inputs restored to saved state.', 'info');
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentUser) return;

    if (!fullName.trim()) {
      showToast('Validation Error', 'Full name cannot be blank.', 'warning');
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      const updatedUser: UserProfile = {
        ...currentUser,
        titlePrefix,
        fullName: fullName.trim(),
        bio: bio.trim(),
        avatarUrl,
        researchInterests: interests,
        orcidId: orcidId.trim(),
        scholarUrl: scholarUrl.trim(),
        institution,
        faculty: faculty.trim(),
        department: department.trim(),
        academicLevel,
        matricOrStaffId: matricOrStaffId.trim(),
        supervisorName: supervisorName.trim(),
        email: primaryEmail.trim(),
        secondaryEmail: secondaryEmail.trim(),
        phoneNumber: phoneNumber.trim(),
        contactPreferences: contactPrefs
      };

      setCurrentUser(updatedUser);
      setIsSaving(false);
      setIsDirty(false);
      showToast('Account Settings Saved', 'Researcher profile and contact preferences updated.', 'success');
    }, 400);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      
      {/* Unsaved Changes Alert */}
      {isDirty && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs px-3 sm:px-4 py-2.5 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2 animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>You have modified your researcher profile details. Click "Save Changes" to apply.</span>
          </div>
          <button
            type="button"
            onClick={() => handleSave()}
            className="font-semibold underline hover:text-amber-900 cursor-pointer text-left sm:text-right shrink-0"
          >
            Save Now
          </button>
        </div>
      )}

      {/* Sub-tab Navigation (Pill-free segmented buttons) */}
      <div className="bg-slate-100 p-1 sm:p-1.5 rounded-lg flex items-center gap-1 overflow-x-auto text-xs scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
        {[
          { id: 'bio', label: 'Academic Bio & Identity', shortLabel: 'Bio & Identity', icon: User },
          { id: 'affiliation', label: 'University Affiliation', shortLabel: 'Affiliation', icon: Building2 },
          { id: 'contact', label: 'Contact Preferences', shortLabel: 'Contact Prefs', icon: Bell },
          { id: 'preview', label: 'Participant Card Preview', shortLabel: 'Card Preview', icon: Eye }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded font-medium whitespace-nowrap transition-colors cursor-pointer min-h-[44px] shrink-0 ${
                isActive
                  ? 'bg-white text-[#163B65] shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Icon className={`w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0 ${isActive ? 'text-[#0F9D8A]' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden text-xs">{tab.shortLabel}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-5 sm:space-y-6">
        
        {/* ================= TAB 1: BIO & IDENTITY ================= */}
        {activeTab === 'bio' && (
          <div className="space-y-4 sm:space-y-5 text-xs animate-in fade-in">
            {/* Title & Name */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="sm:col-span-1">
                <label className="block font-semibold text-slate-700 mb-1">Honorific / Title</label>
                <select
                  value={titlePrefix}
                  onChange={(e) => { setTitlePrefix(e.target.value); setIsDirty(true); }}
                  className="w-full px-3 py-2 sm:py-1.5 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 bg-white min-h-[42px] sm:min-h-[38px] text-sm sm:text-xs"
                >
                  {TITLE_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block font-semibold text-slate-700 mb-1">Full Legal & Academic Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => { setFullName(e.target.value); setIsDirty(true); }}
                  placeholder="e.g. Chiamaka Eze"
                  className="w-full px-3 py-2 sm:py-1.5 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 min-h-[42px] sm:min-h-[38px] text-sm sm:text-xs"
                />
              </div>
            </div>

            {/* Avatar Selection */}
            <div className="space-y-2">
              <label className="block font-semibold text-slate-700">Researcher Profile Photo</label>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                {AVATAR_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => { setAvatarUrl(preset.url); setCustomAvatar(false); setIsDirty(true); }}
                    className={`flex items-center gap-2.5 p-2 rounded border transition-all cursor-pointer min-h-[44px] ${
                      avatarUrl === preset.url && !customAvatar
                        ? 'border-[#0F9D8A] bg-teal-50/50 ring-1 ring-[#0F9D8A]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xs text-slate-700 font-medium">{preset.label}</span>
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCustomAvatar(!customAvatar)}
                  className="text-xs text-[#163B65] underline hover:text-[#0F9D8A] cursor-pointer min-h-[44px] flex items-center px-2"
                >
                  {customAvatar ? 'Cancel Custom URL' : 'Custom Image URL'}
                </button>
              </div>

              {customAvatar && (
                <div className="pt-1">
                  <input
                    type="url"
                    placeholder="https://..."
                    value={avatarUrl}
                    onChange={(e) => { setAvatarUrl(e.target.value); setIsDirty(true); }}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 font-mono text-xs min-h-[42px]"
                  />
                </div>
              )}
            </div>

            {/* Bio */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700">Academic Biography & Thesis Context</label>
                <span className={`text-[11px] tabular-nums ${bio.length > 500 ? 'text-amber-600 font-semibold' : 'text-slate-400'}`}>
                  {bio.length} / 600 characters
                </span>
              </div>
              <textarea
                rows={4}
                maxLength={600}
                value={bio}
                onChange={(e) => { setBio(e.target.value); setIsDirty(true); }}
                placeholder="State your academic focus, current research questions, and how your project contributes to Nigerian higher education literature..."
                className="w-full px-3 py-2.5 sm:py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 resize-none leading-relaxed text-sm sm:text-xs"
              />
              <p className="text-[11px] text-slate-400">
                Displayed to student participants on study briefings to establish academic trust.
              </p>
            </div>

            {/* Focus Topics */}
            <div className="space-y-2">
              <label className="block font-semibold text-slate-700">Research Focus Areas & Methodology Topics</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="e.g. Econometrics, Health Economics, Renewable Energy..."
                  value={newInterestInput}
                  onChange={(e) => setNewInterestInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleInterestAdd())}
                  className="flex-1 px-3 py-2 sm:py-1.5 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 text-sm sm:text-xs min-h-[42px] sm:min-h-[38px]"
                />
                <button
                  type="button"
                  onClick={handleInterestAdd}
                  className="w-full sm:w-auto px-4 py-2 sm:py-1.5 bg-[#163B65] text-white rounded font-medium hover:bg-[#112d4e] transition-colors cursor-pointer min-h-[42px] sm:min-h-[38px] flex items-center justify-center shrink-0"
                >
                  Add Topic
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {interests.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1 rounded text-xs"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleInterestRemove(tag)}
                      className="text-slate-400 hover:text-red-600 cursor-pointer p-0.5"
                      aria-label={`Remove ${tag}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* ORCID & Scholar Links */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ORCID iD (Optional)</label>
                <input
                  type="text"
                  placeholder="0009-0004-8921-3401"
                  value={orcidId}
                  onChange={(e) => { setOrcidId(e.target.value); setIsDirty(true); }}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 font-mono text-xs min-h-[42px] sm:min-h-[38px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Google Scholar / Profile URL</label>
                <input
                  type="url"
                  placeholder="https://scholar.google.com/citations?user=..."
                  value={scholarUrl}
                  onChange={(e) => { setScholarUrl(e.target.value); setIsDirty(true); }}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 font-mono text-xs min-h-[42px] sm:min-h-[38px]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: UNIVERSITY AFFILIATION ================= */}
        {activeTab === 'affiliation' && (
          <div className="space-y-4 sm:space-y-5 text-xs animate-in fade-in">
            {/* Institution */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tertiary University / Higher Institution *</label>
              <select
                value={institution}
                onChange={(e) => { setInstitution(e.target.value); setIsDirty(true); }}
                className="w-full px-3 py-2 sm:py-1.5 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 bg-white min-h-[42px] sm:min-h-[38px] text-sm sm:text-xs"
              >
                {NIGERIAN_UNIVERSITIES.map((uni) => (
                  <option key={uni} value={uni}>{uni}</option>
                ))}
              </select>
            </div>

            {/* Academic Level */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Academic Level / Designation *</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {ACADEMIC_LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => { setAcademicLevel(lvl as any); setIsDirty(true); }}
                    className={`p-3 text-left rounded border transition-all cursor-pointer min-h-[44px] ${
                      academicLevel === lvl
                        ? 'border-[#163B65] bg-blue-50/50 ring-1 ring-[#163B65] font-semibold text-[#163B65]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-xs">{lvl}</span>
                      {academicLevel === lvl && <Check className="w-4 h-4 text-[#163B65]" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Faculty & Department */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Faculty / College *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Faculty of Social Sciences"
                  value={faculty}
                  onChange={(e) => { setFaculty(e.target.value); setIsDirty(true); }}
                  className="w-full px-3 py-2 sm:py-1.5 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 min-h-[42px] sm:min-h-[38px] text-sm sm:text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Academic Department / Degree Course *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Department of Economics"
                  value={department}
                  onChange={(e) => { setDepartment(e.target.value); setIsDirty(true); }}
                  className="w-full px-3 py-2 sm:py-1.5 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 min-h-[42px] sm:min-h-[38px] text-sm sm:text-xs"
                />
              </div>
            </div>

            {/* Matric / Staff ID */}
            <div className="p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Student Matriculation Number / Staff ID</span>
                </label>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-semibold self-start sm:self-auto">
                  PRIVATE TO ETHICS REVIEW
                </span>
              </div>
              <input
                type="text"
                placeholder="e.g. 2022/ECN/10892"
                value={matricOrStaffId}
                onChange={(e) => { setMatricOrStaffId(e.target.value); setIsDirty(true); }}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 font-mono text-xs bg-white min-h-[42px]"
              />
              <p className="text-[11px] text-slate-500">
                Verified exclusively by ethics reviewers. Never shown publicly to survey participants.
              </p>
            </div>

            {/* Supervisor Oversight */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Project Supervisor or Departmental Head Name
              </label>
              <input
                type="text"
                placeholder="e.g. Prof. A. K. Oyedepo"
                value={supervisorName}
                onChange={(e) => { setSupervisorName(e.target.value); setIsDirty(true); }}
                className="w-full px-3 py-2 sm:py-1.5 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 min-h-[42px] sm:min-h-[38px] text-sm sm:text-xs"
              />
            </div>
          </div>
        )}

        {/* ================= TAB 3: CONTACT PREFERENCES ================= */}
        {activeTab === 'contact' && (
          <div className="space-y-4 sm:space-y-5 text-xs animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primary Institutional Email *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 sm:top-2.5" />
                  <input
                    type="email"
                    required
                    value={primaryEmail}
                    onChange={(e) => { setPrimaryEmail(e.target.value); setIsDirty(true); }}
                    className="w-full pl-9 pr-3 py-2 sm:py-1.5 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 min-h-[42px] sm:min-h-[38px] text-sm sm:text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Secondary / Backup Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 sm:top-2.5" />
                  <input
                    type="email"
                    placeholder="backup.email@gmail.com"
                    value={secondaryEmail}
                    onChange={(e) => { setSecondaryEmail(e.target.value); setIsDirty(true); }}
                    className="w-full pl-9 pr-3 py-2 sm:py-1.5 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 min-h-[42px] sm:min-h-[38px] text-sm sm:text-xs"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">WhatsApp & Mobile Telephone (+234) *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 sm:top-2.5" />
                <input
                  type="tel"
                  placeholder="+234 803 000 0000"
                  value={phoneNumber}
                  onChange={(e) => { setPhoneNumber(e.target.value); setIsDirty(true); }}
                  className="w-full pl-9 pr-3 py-2 sm:py-1.5 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 font-mono text-xs min-h-[42px] sm:min-h-[38px]"
                />
              </div>
            </div>

            {/* Preferred Route */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block font-semibold text-slate-700 mb-1.5">Preferred Contact Route</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {[
                  { id: 'email', label: 'Email Only', desc: 'Updates to your institutional inbox.' },
                  { id: 'whatsapp', label: 'Email & WhatsApp', desc: 'Instant WhatsApp notifications.' },
                  { id: 'in_app', label: 'In-App Console Only', desc: 'View alerts upon portal login.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setContactPrefs(prev => ({ ...prev, preferredContactMethod: item.id as any }));
                      setIsDirty(true);
                    }}
                    className={`p-3 text-left rounded border transition-all cursor-pointer min-h-[44px] ${
                      contactPrefs.preferredContactMethod === item.id
                        ? 'border-[#0F9D8A] bg-teal-50/50 ring-1 ring-[#0F9D8A]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs text-slate-900">
                      <span>{item.label}</span>
                      {contactPrefs.preferredContactMethod === item.id && <Check className="w-3.5 h-3.5 text-[#0F9D8A]" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Checkboxes */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <h3 className="font-semibold text-slate-800 text-xs">Notification Subscriptions</h3>

              <div className="space-y-2.5 text-xs text-slate-700">
                <label className="flex items-start gap-3 cursor-pointer select-none p-1 -m-1 rounded hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={contactPrefs.urgentComplianceAlerts}
                    onChange={(e) => {
                      setContactPrefs(prev => ({ ...prev, urgentComplianceAlerts: e.target.checked }));
                      setIsDirty(true);
                    }}
                    className="w-4 h-4 rounded border-slate-300 text-[#163B65] focus:ring-[#163B65] mt-0.5 shrink-0"
                  />
                  <span>Ethics clearance decision alerts & revision notifications (Critical)</span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer select-none p-1 -m-1 rounded hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={contactPrefs.emailNotifications}
                    onChange={(e) => {
                      setContactPrefs(prev => ({ ...prev, emailNotifications: e.target.checked }));
                      setIsDirty(true);
                    }}
                    className="w-4 h-4 rounded border-slate-300 text-[#0F9D8A] focus:ring-[#0F9D8A] mt-0.5 shrink-0"
                  />
                  <span>Recruitment sample size milestone alerts (25%, 50%, 75%, 100%)</span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer select-none p-1 -m-1 rounded hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={contactPrefs.weeklyRecruitmentDigest}
                    onChange={(e) => {
                      setContactPrefs(prev => ({ ...prev, weeklyRecruitmentDigest: e.target.checked }));
                      setIsDirty(true);
                    }}
                    className="w-4 h-4 rounded border-slate-300 text-[#0F9D8A] focus:ring-[#0F9D8A] mt-0.5 shrink-0"
                  />
                  <span>Weekly response-quality summary and duration anomaly reports</span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer select-none p-1 -m-1 rounded hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={contactPrefs.allowParticipantClarityInquiries}
                    onChange={(e) => {
                      setContactPrefs(prev => ({ ...prev, allowParticipantClarityInquiries: e.target.checked }));
                      setIsDirty(true);
                    }}
                    className="w-4 h-4 rounded border-slate-300 text-[#0F9D8A] focus:ring-[#0F9D8A] mt-0.5 shrink-0"
                  />
                  <span>Allow participants to submit clarity inquiries regarding questionnaire instructions</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: PARTICIPANT CARD PREVIEW ================= */}
        {activeTab === 'preview' && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <p className="text-slate-500">
              This card illustrates how your credentials, bio, and affiliation appear to university students evaluating participation:
            </p>

            <div className="max-w-xl mx-auto bg-slate-50 border border-slate-200 rounded-lg p-3.5 sm:p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={avatarUrl}
                    alt={fullName}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border border-slate-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-sm text-[#163B65]">
                        {titlePrefix} {fullName || 'Researcher Name'}
                      </span>
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    </div>
                    <span className="text-xs text-slate-600 block mt-0.5">
                      {academicLevel} · {department ? `${department}, ` : ''}{institution}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-semibold uppercase self-start">
                  Verified Academic
                </span>
              </div>

              <div className="p-3 bg-white rounded border border-slate-200 text-slate-700 leading-relaxed text-xs">
                <strong className="block text-slate-900 font-semibold mb-1">Investigator Summary:</strong>
                <p className="break-words">{bio || 'No bio provided yet. Complete your bio in the Academic Bio tab.'}</p>
                {supervisorName && (
                  <p className="text-slate-500 italic text-[11px] mt-2 pt-2 border-t border-slate-100">
                    Faculty Supervisor: <strong>{supervisorName}</strong>
                  </p>
                )}
              </div>

              {interests.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Research Disciplines:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {interests.map((t) => (
                      <span key={t} className="bg-slate-200/80 text-slate-800 text-[11px] px-2 py-0.5 rounded font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            {isDirty && (
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-4 py-2.5 text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer min-h-[44px] flex items-center justify-center border border-slate-200 rounded sm:border-0"
              >
                Discard Changes
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#163B65] hover:bg-[#112d4e] text-white text-xs font-semibold rounded flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 min-h-[44px]"
          >
            {isSaving ? (
              <span>Saving Changes...</span>
            ) : (
              <>
                <Save className="w-4 h-4 text-teal-300" />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
