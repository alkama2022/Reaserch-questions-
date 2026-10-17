import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResearcherSidebar } from './ResearcherSidebar';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Save, 
  Send, 
  Plus, 
  Trash2, 
  AlertCircle, 
  FileText, 
  ShieldCheck, 
  Clock, 
  HelpCircle,
  Building2
} from 'lucide-react';
import { ResearchCategory, EligibilityQuestion, Study } from '../../types';
import { NIGERIAN_UNIVERSITIES } from '../../services/mockData';

const CATEGORIES: ResearchCategory[] = [
  'Social Sciences',
  'Health & Medical Sciences',
  'Business & Management',
  'Engineering & Technology',
  'Education & Pedagogy',
  'Agricultural Sciences',
  'Humanities & Arts',
  'Environmental Sciences'
];

export const CreateStudyPage: React.FC = () => {
  const { currentUser, createStudy, navigateTo, showToast } = useApp();

  // Wizard Step (1 to 4)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Study Information
  const [title, setTitle] = useState('');
  const [researchPurpose, setResearchPurpose] = useState('');
  const [briefDescription, setBriefDescription] = useState('');
  const [category, setCategory] = useState<ResearchCategory>('Social Sciences');
  const [institution, setInstitution] = useState(currentUser?.institution || NIGERIAN_UNIVERSITIES[0]);
  const [facultyDepartment, setFacultyDepartment] = useState(currentUser?.department || '');

  // Step 2: Participant Requirements
  const [targetPopulation, setTargetPopulation] = useState('Full-time Nigerian university undergraduate students');
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(30);
  const [targetUniversities, setTargetUniversities] = useState<string[]>([currentUser?.institution || 'University of Lagos (UNILAG)']);
  const [inclusionCriteria, setInclusionCriteria] = useState<string[]>([
    'Currently enrolled student in a recognized Nigerian higher education institution',
    'Willing to complete the full questionnaire attentively'
  ]);
  const [newInclusion, setNewInclusion] = useState('');
  const [exclusionCriteria, setExclusionCriteria] = useState<string[]>([
    'Students who have already participated in this pilot study'
  ]);
  const [newExclusion, setNewExclusion] = useState('');
  const [eligibilityQuestions, setEligibilityQuestions] = useState<EligibilityQuestion[]>([
    {
      id: 'eq-1',
      question: 'Are you currently an enrolled undergraduate student at an accredited Nigerian university?',
      expectedAnswer: 'yes',
      disqualifyingNotice: 'This survey is strictly limited to enrolled undergraduate students in Nigeria.'
    }
  ]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionAnswer, setNewQuestionAnswer] = useState<'yes' | 'no'>('yes');
  const [newQuestionNotice, setNewQuestionNotice] = useState('');

  // Step 3: Recruitment Requirements
  const [targetSampleSize, setTargetSampleSize] = useState(200);
  const [recruitmentDeadline, setRecruitmentDeadline] = useState('2026-11-30');
  const [surveyTool, setSurveyTool] = useState<'Google Forms' | 'KoboToolbox' | 'Microsoft Forms' | 'Qualtrics' | 'Custom'>('Google Forms');
  const [estimatedMinutes, setEstimatedMinutes] = useState(10);
  const [questionnaireUrl, setQuestionnaireUrl] = useState('');
  const [incentiveType, setIncentiveType] = useState<Study['incentiveType']>('None');
  const [incentiveDetails, setIncentiveDetails] = useState('');

  // Step 4: Consent & Review Declarations
  const [ethicsApprovalNumber, setEthicsApprovalNumber] = useState('');
  const [supervisorName, setSupervisorName] = useState('');
  const [isEthicsApproved, setIsEthicsApproved] = useState(false);
  const [agreedAcademicPolicy, setAgreedAcademicPolicy] = useState(false);
  const [agreedDataPrivacy, setAgreedDataPrivacy] = useState(false);

  const [formError, setFormError] = useState<string | null>(null);

  // Inclusion helpers
  const addInclusion = () => {
    if (!newInclusion.trim()) return;
    setInclusionCriteria(prev => [...prev, newInclusion.trim()]);
    setNewInclusion('');
  };
  const removeInclusion = (idx: number) => {
    setInclusionCriteria(prev => prev.filter((_, i) => i !== idx));
  };

  // Exclusion helpers
  const addExclusion = () => {
    if (!newExclusion.trim()) return;
    setExclusionCriteria(prev => [...prev, newExclusion.trim()]);
    setNewExclusion('');
  };
  const removeExclusion = (idx: number) => {
    setExclusionCriteria(prev => prev.filter((_, i) => i !== idx));
  };

  // Question helpers
  const addQuestion = () => {
    if (!newQuestionText.trim()) return;
    setEligibilityQuestions(prev => [
      ...prev,
      {
        id: `eq-${Date.now()}`,
        question: newQuestionText.trim(),
        expectedAnswer: newQuestionAnswer,
        disqualifyingNotice: newQuestionNotice.trim() || 'You do not meet the specified inclusion criteria.'
      }
    ]);
    setNewQuestionText('');
    setNewQuestionNotice('');
  };
  const removeQuestion = (id: string) => {
    setEligibilityQuestions(prev => prev.filter(q => q.id !== id));
  };

  // Step Navigation & Validation
  const validateStep1 = () => {
    if (!title.trim() || title.length < 10) {
      setFormError('Study title must be at least 10 characters long.');
      return false;
    }
    if (!researchPurpose.trim() || researchPurpose.length < 20) {
      setFormError('Please provide a substantive research purpose statement (min 20 characters).');
      return false;
    }
    if (!briefDescription.trim()) {
      setFormError('Brief description is required.');
      return false;
    }
    setFormError(null);
    return true;
  };

  const validateStep2 = () => {
    if (!targetPopulation.trim()) {
      setFormError('Target population description is required.');
      return false;
    }
    if (inclusionCriteria.length === 0) {
      setFormError('Provide at least one inclusion criterion.');
      return false;
    }
    setFormError(null);
    return true;
  };

  const validateStep3 = () => {
    if (targetSampleSize < 10 || targetSampleSize > 5000) {
      setFormError('Target sample size must be between 10 and 5,000 participants.');
      return false;
    }
    if (!questionnaireUrl.trim() || !questionnaireUrl.startsWith('http')) {
      setFormError('A valid questionnaire URL starting with http:// or https:// is required.');
      return false;
    }
    if (!recruitmentDeadline) {
      setFormError('Please specify a recruitment deadline.');
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) setStep(4);
  };

  const handleSaveDraft = () => {
    const newId = createStudy({
      researcherId: currentUser?.id || 'usr-res-001',
      researcherName: currentUser?.fullName || 'Academic Researcher',
      researcherInstitution: institution,
      title: title || 'Untitled Study Draft',
      researchPurpose,
      briefDescription,
      category,
      facultyDepartment,
      targetPopulation,
      ageMin,
      ageMax,
      targetUniversities,
      inclusionCriteria,
      exclusionCriteria,
      eligibilityQuestions,
      targetSampleSize,
      recruitmentDeadline,
      estimatedMinutes,
      questionnaireUrl: questionnaireUrl || 'https://docs.google.com/forms',
      surveyTool,
      incentiveType,
      incentiveDetails,
      status: 'Draft',
      ethicsApprovalNumber,
      supervisorName,
      isEthicsApproved,
    });
    navigateTo('researcher-studies');
  };

  const handleSubmitForReview = () => {
    if (!agreedAcademicPolicy || !agreedDataPrivacy) {
      setFormError('You must acknowledge institutional ethics and data privacy terms before submitting.');
      return;
    }

    createStudy({
      researcherId: currentUser?.id || 'usr-res-001',
      researcherName: currentUser?.fullName || 'Academic Researcher',
      researcherInstitution: institution,
      title,
      researchPurpose,
      briefDescription,
      category,
      facultyDepartment,
      targetPopulation,
      ageMin,
      ageMax,
      targetUniversities,
      inclusionCriteria,
      exclusionCriteria,
      eligibilityQuestions,
      targetSampleSize,
      recruitmentDeadline,
      estimatedMinutes,
      questionnaireUrl,
      surveyTool,
      incentiveType,
      incentiveDetails,
      status: 'Pending Review',
      ethicsApprovalNumber,
      supervisorName,
      isEthicsApproved,
    });

    navigateTo('researcher-studies');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-100px)]">
      <ResearcherSidebar activeTab="create" />

      <main className="flex-1 bg-[#F7F9FC] p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto max-w-4xl">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-1">
            <span>Researcher Console</span>
            <span>/</span>
            <span className="text-slate-800 font-medium">Create Research Study</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#163B65]">
            New Study Recruitment Request
          </h1>
          <p className="text-xs text-slate-500">
            Define research objectives, screening filters, and link your external questionnaire.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="grid grid-cols-4 gap-2">
            {[
              { num: 1, label: 'Study Info' },
              { num: 2, label: 'Eligibility' },
              { num: 3, label: 'Recruitment' },
              { num: 4, label: 'Review & Consent' },
            ].map((s) => (
              <div 
                key={s.num}
                className={`flex items-center gap-2 p-2 rounded text-xs transition-colors ${
                  step === s.num
                    ? 'bg-blue-50 text-[#163B65] font-bold border border-blue-200'
                    : step > s.num
                    ? 'text-emerald-700 bg-emerald-50 font-medium'
                    : 'text-slate-400 bg-slate-50'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  step === s.num ? 'bg-[#163B65] text-white' : step > s.num ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {step > s.num ? <Check className="w-3 h-3" /> : s.num}
                </div>
                <span className="hidden sm:inline truncate">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {formError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Multi-Step Content */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-6">
          
          {/* STEP 1: STUDY INFORMATION */}
          {step === 1 && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-2">
                <h2 className="text-sm font-bold text-slate-900">Step 1: Academic Study Information</h2>
                <p className="text-slate-500">Provide official dissertation or thesis details</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Study Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Assessment of Cassava Value Chain Financing and Post-Harvest Losses in Enugu State"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Academic Research Category *</label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Host University / Institution *</label>
                  <select
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 bg-white"
                  >
                    {NIGERIAN_UNIVERSITIES.map((uni) => (
                      <option key={uni} value={uni}>{uni}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Faculty & Department</label>
                <input
                  type="text"
                  placeholder="e.g. Faculty of Agriculture / Dept of Agricultural Economics"
                  value={facultyDepartment}
                  onChange={(e) => setFacultyDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Research Purpose & Academic Background *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain why this research is being conducted, the problem addressed, and academic degree context (e.g. Final-Year BSc project, MSc thesis)..."
                  value={researchPurpose}
                  onChange={(e) => setResearchPurpose(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Brief Description for Participants *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="A concise 2-sentence summary explaining what participants will be asked to complete..."
                  value={briefDescription}
                  onChange={(e) => setBriefDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 2: PARTICIPANT ELIGIBILITY */}
          {step === 2 && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-2">
                <h2 className="text-sm font-bold text-slate-900">Step 2: Participant Requirements & Screening</h2>
                <p className="text-slate-500">Define precise demographic parameters and inclusion criteria</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Population Description *</label>
                <input
                  type="text"
                  placeholder="e.g. Full-time undergraduate clinical medical students (400L–600L)"
                  value={targetPopulation}
                  onChange={(e) => setTargetPopulation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Minimum Age</label>
                  <input
                    type="number"
                    min={16}
                    max={65}
                    value={ageMin}
                    onChange={(e) => setAgeMin(parseInt(e.target.value) || 18)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 tabular-nums"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Maximum Age</label>
                  <input
                    type="number"
                    min={18}
                    max={80}
                    value={ageMax}
                    onChange={(e) => setAgeMax(parseInt(e.target.value) || 35)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 tabular-nums"
                  />
                </div>
              </div>

              {/* Inclusion Criteria List */}
              <div className="space-y-2">
                <label className="block font-semibold text-slate-700">Inclusion Criteria (Participants MUST meet):</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add an inclusion criterion (e.g. Has used banking app in last 30 days)..."
                    value={newInclusion}
                    onChange={(e) => setNewInclusion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addInclusion())}
                    className="flex-1 px-3 py-1.5 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={addInclusion}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-1.5 pt-1">
                  {inclusionCriteria.map((c, idx) => (
                    <li key={idx} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                      <span className="text-slate-800">{c}</span>
                      <button
                        type="button"
                        onClick={() => removeInclusion(idx)}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusion Criteria List */}
              <div className="space-y-2 pt-2">
                <label className="block font-semibold text-slate-700">Exclusion Criteria (Do NOT participate if):</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add an exclusion criterion (e.g. Pre-degree students)..."
                    value={newExclusion}
                    onChange={(e) => setNewExclusion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addExclusion())}
                    className="flex-1 px-3 py-1.5 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={addExclusion}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-1.5 pt-1">
                  {exclusionCriteria.map((c, idx) => (
                    <li key={idx} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                      <span className="text-slate-800">{c}</span>
                      <button
                        type="button"
                        onClick={() => removeExclusion(idx)}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Automated Screening Questions */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block font-semibold text-slate-700">Pre-Screening Verification Questions:</label>
                <p className="text-[11px] text-slate-500">
                  Prospective participants answer these self-check questions before accessing your questionnaire link.
                </p>

                <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-2">
                  <input
                    type="text"
                    placeholder="Screening Question (e.g. Do you live on-campus?)..."
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-800 bg-white"
                  />
                  <div className="flex items-center gap-4">
                    <span className="text-slate-600">Expected Answer for Eligibility:</span>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        checked={newQuestionAnswer === 'yes'}
                        onChange={() => setNewQuestionAnswer('yes')}
                        className="text-[#0F9D8A]"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        checked={newQuestionAnswer === 'no'}
                        onChange={() => setNewQuestionAnswer('no')}
                        className="text-[#0F9D8A]"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Disqualifying notice if answer does not match..."
                    value={newQuestionNotice}
                    onChange={(e) => setNewQuestionNotice(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-800 bg-white"
                  />
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="px-3 py-1.5 bg-[#163B65] text-white rounded font-semibold text-xs cursor-pointer"
                  >
                    Add Screening Question
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  {eligibilityQuestions.map((q) => (
                    <div key={q.id} className="p-2.5 rounded bg-white border border-slate-200 flex items-start justify-between gap-2">
                      <div>
                        <strong className="text-slate-900 block">{q.question}</strong>
                        <span className="text-[11px] text-slate-500">
                          Expected: <strong className="uppercase text-[#0F9D8A]">{q.expectedAnswer}</strong> · Notice: {q.disqualifyingNotice}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeQuestion(q.id)}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: RECRUITMENT REQUIREMENTS */}
          {step === 3 && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-2">
                <h2 className="text-sm font-bold text-slate-900">Step 3: Survey Tool & Recruitment Quotas</h2>
                <p className="text-slate-500">Provide your existing survey link and quota parameters</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Sample Size (N) *</label>
                  <input
                    type="number"
                    min={10}
                    max={5000}
                    value={targetSampleSize}
                    onChange={(e) => setTargetSampleSize(parseInt(e.target.value) || 100)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 tabular-nums font-semibold"
                  />
                  <span className="text-[11px] text-slate-400 mt-0.5 block">Recommended for undergraduate thesis: 150–350</span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Recruitment Deadline *</label>
                  <input
                    type="date"
                    required
                    value={recruitmentDeadline}
                    onChange={(e) => setRecruitmentDeadline(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Survey Instrument Platform *</label>
                  <select
                    value={surveyTool}
                    onChange={(e: any) => setSurveyTool(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 bg-white"
                  >
                    <option value="Google Forms">Google Forms</option>
                    <option value="KoboToolbox">KoboToolbox</option>
                    <option value="Microsoft Forms">Microsoft Forms</option>
                    <option value="Qualtrics">Qualtrics</option>
                    <option value="Custom">Custom Academic Survey Engine</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Estimated Completion Duration (Minutes) *</label>
                  <input
                    type="number"
                    min={2}
                    max={60}
                    value={estimatedMinutes}
                    onChange={(e) => setEstimatedMinutes(parseInt(e.target.value) || 10)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Public Questionnaire URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://docs.google.com/forms/d/e/... or https://ee.kobotoolbox.org/x/..."
                  value={questionnaireUrl}
                  onChange={(e) => setQuestionnaireUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 font-mono text-[11px]"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Ensure the external form permissions are open so participants can access without permission errors.
                </span>
              </div>

              {/* Incentive Details */}
              <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-3">
                <label className="block font-semibold text-slate-800">Participant Token / Incentive (Optional)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1">Incentive Category:</label>
                    <select
                      value={incentiveType}
                      onChange={(e: any) => setIncentiveType(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-800 bg-white"
                    >
                      <option value="None">None (Purely Voluntary Participation)</option>
                      <option value="Mobile Airtime / Data Token">Mobile Airtime / Data Token (e.g. ₦500)</option>
                      <option value="Certificate of Participation">Certificate of Research Contribution</option>
                      <option value="Raffle Draw">Raffle Draw Token</option>
                      <option value="Direct Honorarium">Direct Honorarium</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Details & Conditions:</label>
                    <input
                      type="text"
                      placeholder="e.g. ₦500 MTN/Airtel/Glo token disbursed within 48h..."
                      value={incentiveDetails}
                      onChange={(e) => setIncentiveDetails(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-800 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONSENT, ETHICS & FINAL REVIEW */}
          {step === 4 && (
            <div className="space-y-5 text-xs">
              <div className="border-b border-slate-100 pb-2">
                <h2 className="text-sm font-bold text-slate-900">Step 4: Institutional Review & Ethical Declarations</h2>
                <p className="text-slate-500">Confirm supervisor sign-off and review submitted summary</p>
              </div>

              {/* Ethics details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Supervisor / Department Head Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Prof. A. K. Oyedepo"
                    value={supervisorName}
                    onChange={(e) => setSupervisorName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ethics Committee Approval Number (if applicable)</label>
                  <input
                    type="text"
                    placeholder="e.g. UNILAG/HREC/2026/089 or 'Exempt'"
                    value={ethicsApprovalNumber}
                    onChange={(e) => setEthicsApprovalNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                  />
                </div>
              </div>

              {/* Summary Review Card */}
              <div className="bg-[#F7F9FC] p-4 rounded border border-slate-200 space-y-2">
                <span className="font-bold text-[#163B65] text-xs uppercase tracking-wide block">
                  Submitted Study Summary
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                  <div><strong>Title:</strong> {title}</div>
                  <div><strong>Category:</strong> {category}</div>
                  <div><strong>Host Institution:</strong> {institution}</div>
                  <div><strong>Target Quota:</strong> {targetSampleSize} participants</div>
                  <div><strong>Tool & Duration:</strong> {surveyTool} (~{estimatedMinutes} mins)</div>
                  <div><strong>Deadline:</strong> {recruitmentDeadline}</div>
                </div>
              </div>

              {/* Mandatory Declarations */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedAcademicPolicy}
                    onChange={(e) => setAgreedAcademicPolicy(e.target.checked)}
                    className="rounded border-slate-300 text-[#163B65] focus:ring-[#163B65] mt-0.5"
                  />
                  <span className="text-slate-700">
                    I certify that this study is a genuine academic research project conducted in accordance with university ethical standards, and has been reviewed or endorsed by my project supervisor.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedDataPrivacy}
                    onChange={(e) => setAgreedDataPrivacy(e.target.checked)}
                    className="rounded border-slate-300 text-[#163B65] focus:ring-[#163B65] mt-0.5"
                  />
                  <span className="text-slate-700">
                    I acknowledge that participant data must remain strictly confidential and anonymized, and will never be used for commercial marketing or redistributed outside academic analysis.
                  </span>
                </label>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-900 text-xs">
                <strong>Administrative Review Workflow Notice:</strong> Upon submission, your study will enter <strong>Pending Review</strong> status. Our ethics moderators will verify your link and parameters before publication. Studies are not published automatically.
              </div>
            </div>
          )}

          {/* Wizard Action Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Step</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Local Draft</span>
              </button>
            )}

            <div className="flex items-center gap-3">
              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-[#163B65] hover:bg-[#112d4e] text-white text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Continue to Step {step + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="px-3.5 py-2 text-xs font-medium border border-slate-300 rounded text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitForReview}
                    className="px-5 py-2.5 bg-[#0F9D8A] hover:bg-[#0c8070] text-white text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Submit for Administrative Review</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};
