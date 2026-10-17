import React, { useState } from 'react';
import { Study } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, ExternalLink, CheckCircle2, AlertTriangle, ArrowRight, Check } from 'lucide-react';

interface Props {
  study: Study;
  onClose: () => void;
  onConsentRecorded: () => void;
}

export const InformedConsentModal: React.FC<Props> = ({ study, onClose, onConsentRecorded }) => {
  const { recordInformedConsent, completeParticipation, withdrawParticipation, navigateTo } = useApp();

  const [hasConsented, setHasConsented] = useState(false);
  const [agreedAge, setAgreedAge] = useState(false);
  const [agreedVoluntary, setAgreedVoluntary] = useState(false);
  const [agreedAnonymity, setAgreedAnonymity] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const [hasRedirected, setHasRedirected] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [completionCode, setCompletionCode] = useState<string | null>(null);

  const handleConsentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedAge || !agreedVoluntary || !agreedAnonymity) {
      setErrorNotice('You must acknowledge all three informed consent declarations to proceed.');
      return;
    }

    recordInformedConsent(study.id);
    setHasConsented(true);
    setErrorNotice(null);
  };

  const handleOpenQuestionnaire = () => {
    setHasRedirected(true);
    // Open in new tab safely
    window.open(study.questionnaireUrl, '_blank', 'noopener,noreferrer');
  };

  const handleFinishParticipation = () => {
    completeParticipation(study.id);
    setCompleted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0F9D8A]" />
            <div>
              <h3 className="text-base font-bold text-[#163B65]">Informed Consent Protocol</h3>
              <p className="text-[11px] text-slate-500">Step 2 of 2 · Academic Research Ethics Standard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!hasConsented ? (
          /* Consent Form */
          <form onSubmit={handleConsentSubmit} className="space-y-4 text-xs">
            
            {/* Information Sheet */}
            <div className="bg-slate-50 p-3.5 rounded border border-slate-200 space-y-2 text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900 block">Participant Information Statement</span>
              <p>
                <strong>Study:</strong> {study.title}
              </p>
              <p>
                <strong>Investigator:</strong> {study.researcherName} ({study.researcherInstitution})
              </p>
              <p>
                <strong>Purpose:</strong> {study.researchPurpose}
              </p>
              <p>
                <strong>Participation:</strong> Completing this questionnaire will take approximately <strong>{study.estimatedMinutes} minutes</strong>. Your responses are gathered for academic research analysis only.
              </p>
              <p className="text-slate-500 italic text-[11px] pt-1">
                Right to Withdraw: You are free to stop answering questions or close the questionnaire at any time without penalty or explanation.
              </p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2.5 pt-1">
              <span className="font-semibold text-slate-900 block">Consent Declarations:</span>

              <label className="flex items-start gap-2.5 text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreedAge}
                  onChange={(e) => setAgreedAge(e.target.checked)}
                  className="rounded border-slate-300 text-[#0F9D8A] focus:ring-[#0F9D8A] mt-0.5"
                />
                <span>I confirm that I am 18 years of age or older, and meet the specified inclusion criteria.</span>
              </label>

              <label className="flex items-start gap-2.5 text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreedVoluntary}
                  onChange={(e) => setAgreedVoluntary(e.target.checked)}
                  className="rounded border-slate-300 text-[#0F9D8A] focus:ring-[#0F9D8A] mt-0.5"
                />
                <span>I understand that participation is completely voluntary and that I may withdraw at any time.</span>
              </label>

              <label className="flex items-start gap-2.5 text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreedAnonymity}
                  onChange={(e) => setAgreedAnonymity(e.target.checked)}
                  className="rounded border-slate-300 text-[#0F9D8A] focus:ring-[#0F9D8A] mt-0.5"
                />
                <span>I consent to having my anonymized survey responses included in this research study.</span>
              </label>
            </div>

            {errorNotice && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorNotice}</span>
              </div>
            )}

            {/* Footer buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="text-slate-500 hover:text-slate-700 cursor-pointer"
              >
                Decline & Exit
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-[#163B65] hover:bg-[#112d4e] text-white font-semibold rounded flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>I Give Informed Consent</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
              </button>
            </div>

          </form>
        ) : !completed ? (
          /* Redirection and Completion Stage */
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-teal-50 border border-teal-200 rounded text-teal-900 flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#0F9D8A] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Consent Recorded Successfully</span>
                <p className="text-teal-700 mt-0.5">
                  Click the button below to open the researcher's official questionnaire on <strong>{study.surveyTool}</strong>.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-3">
              <span className="font-semibold text-slate-800 block">External Questionnaire Access:</span>
              <p className="text-slate-600">
                You will complete the survey in a new tab. When finished, return here to confirm completion and record your participant verification code.
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenQuestionnaire}
                  className="px-4 py-2.5 bg-[#0F9D8A] hover:bg-[#0c8070] text-white font-semibold rounded flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Open {study.surveyTool} Questionnaire</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <span className="text-slate-400">({study.estimatedMinutes} mins)</span>
              </div>
            </div>

            {hasRedirected && (
              <div className="bg-white p-4 rounded border border-slate-300 space-y-3 animate-in fade-in">
                <span className="font-semibold text-slate-900 block">Completed the questionnaire?</span>
                <p className="text-slate-600">
                  Click below to finalize your record. A participation verification code will be generated for your records.
                </p>
                <button
                  onClick={handleFinishParticipation}
                  className="px-4 py-2 bg-[#163B65] text-white font-semibold rounded hover:bg-[#112d4e] transition-colors cursor-pointer"
                >
                  I Have Completed the Survey
                </button>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-400">
              <button
                onClick={() => {
                  withdrawParticipation(study.id);
                  onClose();
                }}
                className="hover:text-red-600 transition-colors text-[11px] cursor-pointer"
              >
                Withdraw Participation
              </button>
              <button
                onClick={onClose}
                className="hover:text-slate-600 text-[11px] cursor-pointer"
              >
                Close & Return Later
              </button>
            </div>
          </div>
        ) : (
          /* Participation Confirmed Screen */
          <div className="space-y-4 text-xs text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            
            <h4 className="text-base font-bold text-slate-900">Participation Completed!</h4>
            <p className="text-slate-600 max-w-sm mx-auto">
              Thank you for contributing to Nigerian academic scholarship. Your response has been logged for quality review.
            </p>

            <div className="bg-slate-50 p-4 rounded border border-slate-200 max-w-xs mx-auto">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
                Your Verification Reference Code
              </span>
              <span className="font-mono text-sm font-bold text-[#163B65] tabular-nums">
                RCN-OAU-9421
              </span>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onConsentRecorded();
                  navigateTo('participant-applications');
                }}
                className="px-4 py-2 bg-[#163B65] text-white font-semibold rounded cursor-pointer"
              >
                View My Applications
              </button>
              <button
                onClick={() => {
                  onClose();
                  onConsentRecorded();
                }}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded hover:bg-slate-50 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
