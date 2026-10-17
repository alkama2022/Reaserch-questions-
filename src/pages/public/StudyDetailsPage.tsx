import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Building2, 
  UserCheck, 
  Gift, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle,
  FileText,
  Share2,
  Check
} from 'lucide-react';
import { StudyStatusBadge } from '../../components/ui/StatusBadge';
import { EligibilityScreeningModal } from '../participant/EligibilityScreeningModal';
import { InformedConsentModal } from '../participant/InformedConsentModal';

export const StudyDetailsPage: React.FC = () => {
  const { selectedStudyId, studies, navigateTo, applications, currentUser } = useApp();
  const [screeningModalOpen, setScreeningModalOpen] = useState(false);
  const [consentModalOpen, setConsentModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const study = studies.find((s) => s.id === selectedStudyId) || studies[0];

  // Check if current user has already applied or participated
  const existingApplication = applications.find(
    (app) => app.studyId === study?.id && app.participantId === (currentUser?.id || 'usr-part-guest')
  );

  const copyStudyShareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (!study) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Study Not Found</h2>
        <p className="text-xs text-slate-500">The requested research study could not be located.</p>
        <button
          onClick={() => navigateTo('browse-studies')}
          className="px-4 py-2 text-xs font-semibold bg-[#163B65] text-white rounded cursor-pointer"
        >
          Return to Browse Studies
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Link & Meta Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('browse-studies')}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Studies</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={copyStudyShareLink}
            className="px-3 py-1.5 text-xs border border-slate-300 rounded text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copiedLink ? 'Link Copied' : 'Share Study'}</span>
          </button>
          <StudyStatusBadge status={study.status} />
        </div>
      </div>

      {/* Main Study Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Category & Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F9D8A]">
            <span>{study.category}</span>
            <span>·</span>
            <span>Academic Research Project</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#163B65] leading-tight" style={{ textWrap: 'balance' }}>
            {study.title}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed pt-1">
            {study.briefDescription}
          </p>
        </div>

        {/* Academic Affiliation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded bg-[#F7F9FC] border border-slate-200/80 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5 font-medium">Principal Investigator</span>
            <span className="font-semibold text-slate-800">{study.researcherName}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5 font-medium">Host Institution</span>
            <span className="font-semibold text-slate-800">{study.researcherInstitution}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5 font-medium">Faculty / Department</span>
            <span className="font-semibold text-slate-800">{study.facultyDepartment || 'University Department'}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5 font-medium">Estimated Time</span>
            <span className="font-semibold text-slate-800 tabular-nums">~{study.estimatedMinutes} Minutes</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5 font-medium">Ethics Clearance</span>
            <span className="font-semibold text-slate-800">{study.ethicsApprovalNumber || 'Approved by Faculty Ethics Committee'}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5 font-medium">Survey Instrument Tool</span>
            <span className="font-semibold text-slate-800">{study.surveyTool}</span>
          </div>
        </div>

        {/* Research Purpose */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            1. Research Purpose & Background
          </h2>
          <div className="text-xs text-slate-600 leading-relaxed space-y-2 bg-slate-50 p-4 rounded border border-slate-100">
            <p>{study.researchPurpose}</p>
            {study.supervisorName && (
              <p className="text-slate-500 italic">
                Academic Supervisor: <strong>{study.supervisorName}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Investigator Bio & Profile Snippet */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            2. Investigator Profile & Academic Background
          </h2>
          <div className="bg-[#F7F9FC] border border-slate-200 rounded p-4 text-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#163B65] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {study.researcherName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm block">
                  {study.researcherName}
                </span>
                <span className="text-slate-500 text-[11px]">
                  {study.researcherInstitution} · {study.facultyDepartment || 'Academic Department'}
                </span>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {currentUser?.id === study.researcherId && currentUser?.bio
                ? currentUser.bio
                : 'Final-year academic researcher conducting dissertation inquiry under faculty ethics board review.'}
            </p>

            {currentUser?.id === study.researcherId && currentUser?.researchInterests && currentUser.researchInterests.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-400">Research Focus:</span>
                {currentUser.researchInterests.map((interest) => (
                  <span key={interest} className="bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Eligibility Criteria: Inclusion and Exclusion */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            3. Participant Eligibility Criteria
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Inclusion Criteria */}
            <div className="border border-slate-200 rounded p-4 space-y-3 bg-white">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Inclusion Criteria (You Must Satisfy):</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {study.inclusionCriteria.map((crit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">•</span>
                    <span>{crit}</span>
                  </li>
                ))}
                {study.targetUniversities.length > 0 && (
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">•</span>
                    <span>Institutions: {study.targetUniversities.join(', ')}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Exclusion Criteria */}
            <div className="border border-slate-200 rounded p-4 space-y-3 bg-white">
              <div className="flex items-center gap-2 text-xs font-semibold text-red-800">
                <XCircle className="w-4 h-4 text-red-600" />
                <span>Exclusion Criteria (Do Not Participate If):</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {study.exclusionCriteria.length > 0 ? (
                  study.exclusionCriteria.map((crit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-500 font-bold shrink-0">•</span>
                      <span>{crit}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-500 italic">No specific exclusions beyond the general inclusion criteria.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Incentive Disclosure */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            4. Participant Incentive & Reimbursement Terms
          </h2>
          <div className="bg-slate-50 p-4 rounded border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800 flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#0F9D8A]" />
              <span>Incentive Category: {study.incentiveType}</span>
            </div>
            <p className="pt-1">
              {study.incentiveDetails || 'Participation is purely voluntary with no commercial financial incentive.'}
            </p>
            <p className="text-[11px] text-slate-400 italic pt-1">
              Note: Tokens or certificates are processed by researchers following verification that the participant met eligibility conditions and completed survey attention check questions.
            </p>
          </div>
        </div>

        {/* Participation Call To Action Box */}
        <div className="pt-6 border-t border-slate-200">
          {existingApplication ? (
            <div className="bg-teal-50 border border-teal-200 rounded p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-teal-900 block">
                  Application Status: {existingApplication.status}
                </span>
                <p className="text-xs text-teal-700 mt-0.5">
                  {existingApplication.completionCode 
                    ? `Your completion confirmation code is: ${existingApplication.completionCode}`
                    : 'You have begun the consent and screening process for this study.'}
                </p>
              </div>
              <button
                onClick={() => navigateTo('participant-applications')}
                className="px-4 py-2 bg-[#163B65] text-white text-xs font-semibold rounded hover:bg-[#112d4e] transition-colors cursor-pointer shrink-0"
              >
                View in My Applications
              </button>
            </div>
          ) : (
            <div className="bg-[#F7F9FC] border border-slate-200 rounded p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#163B65]">Ready to Participate?</h3>
                <p className="text-xs text-slate-600 max-w-xl">
                  First, take a brief 2-question eligibility self-check. Once verified, you will review the formal participant information sheet and provide digital informed consent.
                </p>
              </div>
              <button
                onClick={() => setScreeningModalOpen(true)}
                className="px-6 py-3 bg-[#0F9D8A] hover:bg-[#0c8070] text-white text-xs font-semibold rounded transition-colors shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
              >
                <span>Check Eligibility & Begin</span>
                <UserCheck className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Screening Modal */}
      {screeningModalOpen && (
        <EligibilityScreeningModal
          study={study}
          onClose={() => setScreeningModalOpen(false)}
          onPassed={() => {
            setScreeningModalOpen(false);
            setConsentModalOpen(true);
          }}
        />
      )}

      {/* Informed Consent Modal */}
      {consentModalOpen && (
        <InformedConsentModal
          study={study}
          onClose={() => setConsentModalOpen(false)}
          onConsentRecorded={() => {
            setConsentModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
