import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UserProfile, ContactPreferences } from '../../types';
import { NIGERIAN_UNIVERSITIES } from '../../services/mockData';
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Save, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  ExternalLink, 
  BookOpen, 
  Plus, 
  X, 
  Lock, 
  Eye, 
  Sparkles,
  GraduationCap,
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

export const UserProfileManagement: React.FC = () => {
  const { currentUser, setCurrentUser, showToast } = useApp();

  // Active sub-tab within profile management
  const [activeSection, setActiveSection] = useState<'bio' | 'affiliation' | 'contact' | 'preview'>('bio');

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

  // Sync state if currentUser changes outside
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
    showToast('Changes Discarded', 'Profile inputs restored to current saved state.', 'info');
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
      showToast('Profile Updated', 'Academic bio, university affiliation, and contact preferences saved.', 'success');
    }, 450);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Profile Header Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <img
              src={avatarUrl}
              alt={fullName}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 shadow-xs bg-slate-100"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback avatar container
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0F9D8A] text-white rounded-full flex items-center justify-center text-[10px] shadow-xs">
              <Check className="w-3 h-3" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#163B65]">
                {titlePrefix} {fullName || 'Researcher Name'}
              </h1>
              <span className="text-xs bg-blue-50 text-[#163B65] border border-blue-200 px-2 py-0.5 rounded font-medium">
                {academicLevel}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {institution} · {department ? `${department}, ` : ''}{faculty || 'Faculty'}
            </p>
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                <span>{primaryEmail}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <ShieldCheck className="w-3 h-3" />
                <span>Affiliation Verified</span>
              </span>
            </div>
          </div>
        </div>

        {/* Global Save Button */}
        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          {isDirty && (
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Discard Changes</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            className="px-5 py-2 bg-[#163B65] hover:bg-[#112d4e] text-white text-xs font-semibold rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
          >
            {isSaving ? (
              <span>Saving Changes...</span>
            ) : (
              <>
                <Save className="w-3.5 h-3.5 text-teal-300" />
                <span>Save Profile</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Unsaved Changes Banner */}
      {isDirty && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs px-4 py-2.5 rounded flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>You have unsaved changes in your profile. Be sure to click "Save Profile" to persist updates.</span>
          </div>
          <button
            onClick={() => handleSave()}
            className="font-semibold underline hover:text-amber-900 cursor-pointer ml-2"
          >
            Save Now
          </button>
        </div>
      )}

      {/* Section Navigation Tabs (Segmented Control) */}
      <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto text-xs">
        {[
          { id: 'bio', label: '1. Academic Bio & Identity', icon: User },
          { id: 'affiliation', label: '2. University & Department Affiliation', icon: Building2 },
          { id: 'contact', label: '3. Contact & Notification Preferences', icon: Bell },
          { id: 'preview', label: '4. Participant View Preview', icon: Eye }
        ].map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded font-medium whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#163B65] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-300' : 'text-slate-400'}`} />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN FORM VIEW */}
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
        
        {/* ================= SECTION 1: BIO & IDENTITY ================= */}
        {activeSection === 'bio' && (
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-6 text-xs animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900">Academic Bio & Researcher Identity</h2>
              <p className="text-slate-500 text-xs">
                Provide your academic background, research interests, and scholarly identifiers so participants and reviewers understand your inquiry.
              </p>
            </div>

            {/* Title & Name */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-1">
                <label className="block font-semibold text-slate-700 mb-1">Honorific / Title</label>
                <select
                  value={titlePrefix}
                  onChange={(e) => { setTitlePrefix(e.target.value); setIsDirty(true); }}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 bg-white"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                />
              </div>
            </div>

            {/* Avatar Selector */}
            <div className="space-y-2">
              <label className="block font-semibold text-slate-700">Profile Photograph / Avatar</label>
              <div className="flex flex-wrap items-center gap-4">
                {AVATAR_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => { setAvatarUrl(preset.url); setCustomAvatar(false); setIsDirty(true); }}
                    className={`flex items-center gap-2.5 p-2 rounded border transition-all cursor-pointer ${
                      avatarUrl === preset.url && !customAvatar
                        ? 'border-[#0F9D8A] bg-teal-50/40 ring-1 ring-[#0F9D8A]'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-10 h-10 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xs text-slate-700 font-medium">{preset.label}</span>
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCustomAvatar(!customAvatar)}
                  className="text-xs text-[#163B65] underline hover:text-[#0F9D8A] cursor-pointer"
                >
                  {customAvatar ? 'Cancel Custom URL' : 'Use Custom Image URL'}
                </button>
              </div>

              {customAvatar && (
                <div className="pt-2">
                  <input
                    type="url"
                    placeholder="Paste image URL (https://...)"
                    value={avatarUrl}
                    onChange={(e) => { setAvatarUrl(e.target.value); setIsDirty(true); }}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 font-mono text-[11px]"
                  />
                </div>
              )}
            </div>

            {/* Academic Bio */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700">Academic Bio & Research Summary</label>
                <span className={`text-[11px] tabular-nums ${bio.length > 500 ? 'text-amber-600 font-semibold' : 'text-slate-400'}`}>
                  {bio.length} / 600 characters
                </span>
              </div>
              <textarea
                rows={4}
                maxLength={600}
                value={bio}
                onChange={(e) => { setBio(e.target.value); setIsDirty(true); }}
                placeholder="State your academic focus, current thesis inquiry, and how your research contributes to Nigerian scholarly literature..."
                className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 resize-none leading-relaxed"
              />
              <p className="text-[11px] text-slate-400">
                Shown to participants on study briefing sheets to verify academic authenticity.
              </p>
            </div>

            {/* Research Interests (Interactive Tag Input) */}
            <div className="space-y-2">
              <label className="block font-semibold text-slate-700">Research Focus Areas & Keywords</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Agricultural Economics, Maternal Health, Renewable Energy..."
                  value={newInterestInput}
                  onChange={(e) => setNewInterestInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleInterestAdd())}
                  className="flex-1 px-3 py-1.5 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                />
                <button
                  type="button"
                  onClick={handleInterestAdd}
                  className="px-4 py-1.5 bg-[#163B65] text-white rounded font-medium hover:bg-[#112d4e] transition-colors cursor-pointer"
                >
                  Add Topic
                </button>
              </div>

              {/* Tag Badges: Clean unboxed text with border tags */}
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
                      className="text-slate-400 hover:text-red-600 cursor-pointer"
                      aria-label={`Remove ${tag}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Scholarly Identifiers */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ORCID iD (Optional)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-[11px] text-emerald-700 font-bold font-mono">
                    iD
                  </span>
                  <input
                    type="text"
                    placeholder="0009-0004-8921-3401"
                    value={orcidId}
                    onChange={(e) => { setOrcidId(e.target.value); setIsDirty(true); }}
                    className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 font-mono text-[11px]"
                  />
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Connects your international scholarly researcher record.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Google Scholar / ResearchGate Link (Optional)</label>
                <div className="relative">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="url"
                    placeholder="https://scholar.google.com/citations?user=..."
                    value={scholarUrl}
                    onChange={(e) => { setScholarUrl(e.target.value); setIsDirty(true); }}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SECTION 2: UNIVERSITY AFFILIATION ================= */}
        {activeSection === 'affiliation' && (
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-6 text-xs animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900">University & Institutional Affiliation</h2>
              <p className="text-slate-500 text-xs">
                Ensure your university, academic level, and supervisor details match your official departmental enrollment records.
              </p>
            </div>

            {/* University Selection */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Current Academic Tertiary Institution *</label>
              <select
                value={institution}
                onChange={(e) => { setInstitution(e.target.value); setIsDirty(true); }}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 bg-white"
              >
                {NIGERIAN_UNIVERSITIES.map((uni) => (
                  <option key={uni} value={uni}>{uni}</option>
                ))}
              </select>
            </div>

            {/* Academic Level */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Academic Status / Level *</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {ACADEMIC_LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => { setAcademicLevel(lvl as any); setIsDirty(true); }}
                    className={`p-3 text-left rounded border transition-all cursor-pointer ${
                      academicLevel === lvl
                        ? 'border-[#163B65] bg-blue-50/50 ring-1 ring-[#163B65] font-semibold text-[#163B65]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{lvl}</span>
                      {academicLevel === lvl && <Check className="w-3.5 h-3.5 text-[#163B65]" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Faculty & Department */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Faculty / College *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Faculty of Social Sciences"
                  value={faculty}
                  onChange={(e) => { setFaculty(e.target.value); setIsDirty(true); }}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                />
              </div>
            </div>

            {/* Matric / Staff ID */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Student Matriculation Number / University Staff ID</span>
                </label>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-semibold">
                  PRIVATE TO ETHICS REVIEW
                </span>
              </div>
              <input
                type="text"
                placeholder="e.g. 2022/ECN/10892 or STAFF/UNILAG/4891"
                value={matricOrStaffId}
                onChange={(e) => { setMatricOrStaffId(e.target.value); setIsDirty(true); }}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 font-mono text-[11px] bg-white"
              />
              <p className="text-[11px] text-slate-500">
                This identifier is used strictly by ethics moderators to verify academic matriculation. It is <strong>never displayed</strong> to survey participants.
              </p>
            </div>

            {/* Academic Supervisor Name */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Project Supervisor or Head of Department (HOD) Name
              </label>
              <input
                type="text"
                placeholder="e.g. Prof. A. K. Oyedepo (Departmental Supervisor)"
                value={supervisorName}
                onChange={(e) => { setSupervisorName(e.target.value); setIsDirty(true); }}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
              />
              <p className="text-[11px] text-slate-400 mt-0.5">
                Recommended for final-year dissertation studies to confirm academic oversight.
              </p>
            </div>
          </div>
        )}

        {/* ================= SECTION 3: CONTACT & PREFERENCES ================= */}
        {activeSection === 'contact' && (
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-6 text-xs animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900">Contact Channels & Notification Preferences</h2>
              <p className="text-slate-500 text-xs">
                Configure how and when ResearchConnect notifies you about recruitment targets, respondent audits, and ethics approvals.
              </p>
            </div>

            {/* Emails & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Primary University / Login Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={primaryEmail}
                    onChange={(e) => { setPrimaryEmail(e.target.value); setIsDirty(true); }}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Secondary / Personal Backup Email (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    placeholder="personal.email@gmail.com"
                    value={secondaryEmail}
                    onChange={(e) => { setSecondaryEmail(e.target.value); setIsDirty(true); }}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                WhatsApp & Phone Contact Number (+234 format) *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="+234 803 000 0000"
                  value={phoneNumber}
                  onChange={(e) => { setPhoneNumber(e.target.value); setIsDirty(true); }}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 font-mono text-[11px]"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Used for instant SMS/WhatsApp alerts when your target recruitment quota is reached.
              </p>
            </div>

            {/* Preferred Contact Method */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block font-semibold text-slate-700 mb-1.5">
                Preferred Notification & Communication Channel
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'email', label: 'Email Only', desc: 'Detailed updates to your university inbox.' },
                  { id: 'whatsapp', label: 'Email & WhatsApp', desc: 'Instant alerts via WhatsApp for milestones.' },
                  { id: 'in_app', label: 'In-App Console Only', desc: 'No external messages; view on login.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setContactPrefs(prev => ({ ...prev, preferredContactMethod: item.id as any }));
                      setIsDirty(true);
                    }}
                    className={`p-3 text-left rounded border transition-all cursor-pointer ${
                      contactPrefs.preferredContactMethod === item.id
                        ? 'border-[#0F9D8A] bg-teal-50/50 ring-1 ring-[#0F9D8A]'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
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

            {/* Notification Toggles */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <h3 className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-[#163B65]" />
                <span>Granular Notification Subscriptions</span>
              </h3>

              <div className="space-y-2.5 text-xs text-slate-700">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={contactPrefs.urgentComplianceAlerts}
                    onChange={(e) => {
                      setContactPrefs(prev => ({ ...prev, urgentComplianceAlerts: e.target.checked }));
                      setIsDirty(true);
                    }}
                    className="rounded border-slate-300 text-[#163B65] focus:ring-[#163B65] mt-0.5"
                  />
                  <div>
                    <span className="font-medium text-slate-900 block">Ethics & Institutional Review Clearance Notices (Critical)</span>
                    <span className="text-[11px] text-slate-500">Receive immediate alerts when an ethics moderator approves, rejects, or requests changes on your study.</span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={contactPrefs.emailNotifications}
                    onChange={(e) => {
                      setContactPrefs(prev => ({ ...prev, emailNotifications: e.target.checked }));
                      setIsDirty(true);
                    }}
                    className="rounded border-slate-300 text-[#0F9D8A] focus:ring-[#0F9D8A] mt-0.5"
                  />
                  <div>
                    <span className="font-medium text-slate-900 block">Recruitment Target Milestones</span>
                    <span className="text-[11px] text-slate-500">Receive celebratory updates when your study crosses 25%, 50%, 75%, and 100% of required sample size.</span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={contactPrefs.weeklyRecruitmentDigest}
                    onChange={(e) => {
                      setContactPrefs(prev => ({ ...prev, weeklyRecruitmentDigest: e.target.checked }));
                      setIsDirty(true);
                    }}
                    className="rounded border-slate-300 text-[#0F9D8A] focus:ring-[#0F9D8A] mt-0.5"
                  />
                  <div>
                    <span className="font-medium text-slate-900 block">Weekly Recruitment & Response-Quality Digest</span>
                    <span className="text-[11px] text-slate-500">Summary table of response durations, flagged speed runs, and completion rates sent every Monday morning.</span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={contactPrefs.allowParticipantClarityInquiries}
                    onChange={(e) => {
                      setContactPrefs(prev => ({ ...prev, allowParticipantClarityInquiries: e.target.checked }));
                      setIsDirty(true);
                    }}
                    className="rounded border-slate-300 text-[#0F9D8A] focus:ring-[#0F9D8A] mt-0.5"
                  />
                  <div>
                    <span className="font-medium text-slate-900 block">Allow Participant Clarity Questions</span>
                    <span className="text-[11px] text-slate-500">Enable prospective participants to submit clarity inquiries regarding ambiguous survey questions through the platform.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* ================= SECTION 4: REAL-TIME PARTICIPANT VIEW PREVIEW ================= */}
        {activeSection === 'preview' && (
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-5 text-xs animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900">Live Participant-Facing Profile Preview</h2>
              <p className="text-slate-500 text-xs">
                This is exactly how your credentials, bio, and university affiliation appear to students browsing research questionnaires.
              </p>
            </div>

            {/* Mock Study Brief Card */}
            <div className="max-w-xl mx-auto bg-[#F7F9FC] border border-slate-200 rounded-lg p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={avatarUrl}
                    alt={fullName}
                    className="w-14 h-14 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-base text-[#163B65]">
                        {titlePrefix} {fullName || 'Researcher Name'}
                      </span>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-xs text-slate-600 block">
                      {academicLevel} · {department ? `${department}, ` : ''}{institution}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Primary Contact: {primaryEmail}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-semibold uppercase">
                  Verified Academic
                </span>
              </div>

              {/* Bio snippet */}
              <div className="p-3 bg-white rounded border border-slate-200 text-slate-700 leading-relaxed text-xs">
                <strong className="block text-slate-900 font-semibold mb-1">Investigator Summary:</strong>
                <p>{bio || 'No bio provided yet. Complete your bio in Step 1 to build trust with participants.'}</p>
                {supervisorName && (
                  <p className="text-slate-500 italic text-[11px] mt-2 pt-2 border-t border-slate-100">
                    Faculty Oversight: <strong>{supervisorName}</strong>
                  </p>
                )}
              </div>

              {/* Topic tags */}
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

              {/* ORCID / Scholar indicator */}
              {(orcidId || scholarUrl) && (
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  {orcidId && (
                    <span className="font-mono">
                      ORCID: <strong>{orcidId}</strong>
                    </span>
                  )}
                  {scholarUrl && (
                    <a
                      href={scholarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0F9D8A] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Google Scholar Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setActiveSection('bio')}
                className="text-xs text-[#0F9D8A] font-semibold hover:underline"
              >
                ← Return to Edit Bio & Identity
              </button>
            </div>
          </div>
        )}

        {/* Bottom Form Actions */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {isDirty ? (
              <span className="text-amber-700 font-medium">Unsaved changes present</span>
            ) : (
              <span className="text-emerald-700 flex items-center gap-1 font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>All profile changes saved to local session</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isDirty && (
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Discard
              </button>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-[#163B65] hover:bg-[#112d4e] text-white text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isSaving ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-teal-300" />
                  <span>Save Profile</span>
                </>
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
