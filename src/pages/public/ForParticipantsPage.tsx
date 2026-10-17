import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Gift, 
  HelpCircle, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export const ForParticipantsPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#0F9D8A] uppercase tracking-wider">
          Student Participation & Ethical Rights
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#163B65]">
          Your Voice Shapes Nigerian Research
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          As a Nigerian university student, your real-world experiences with banking, health systems, campus infrastructure, and technology provide irreplaceable data for national scholarship.
        </p>
      </div>

      {/* Participant Rights Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="w-9 h-9 rounded bg-teal-50 text-[#0F9D8A] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">100% Voluntary Participation</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            You are never obligated to answer any survey question that makes you uncomfortable. You have the right to withdraw at any time with zero consequences.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="w-9 h-9 rounded bg-blue-50 text-[#163B65] flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Privacy & Data Minimization</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            ResearchConnect Nigeria does not harvest or sell your contact information to advertisers. Survey questionnaires are hosted on recognized tools and analyzed in aggregate.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="w-9 h-9 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Gift className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Transparent Incentive Terms</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            We ban fake lottery scams or deceptive prize promises. If a study provides airtime, data tokens, or participation certificates, the exact terms and criteria are stated upfront.
          </p>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-bold text-slate-900">
          Frequently Asked Questions by Student Participants
        </h2>

        <div className="space-y-4 text-xs divide-y divide-slate-100">
          <div className="pt-3 space-y-1">
            <span className="font-semibold text-slate-800 text-sm block">
              Do I have to pay anything to participate?
            </span>
            <p className="text-slate-600 leading-relaxed">
              Never. ResearchConnect Nigeria is completely free for all research participants. Never pay any fee or deposit to participate in a study.
            </p>
          </div>

          <div className="pt-3 space-y-1">
            <span className="font-semibold text-slate-800 text-sm block">
              How do researchers get my survey answers?
            </span>
            <p className="text-slate-600 leading-relaxed">
              Once you pass the brief eligibility self-check and confirm informed consent, you are redirected to the researcher's survey questionnaire (e.g. Google Forms or KoboToolbox). Your responses go directly to their research repository.
            </p>
          </div>

          <div className="pt-3 space-y-1">
            <span className="font-semibold text-slate-800 text-sm block">
              What is the "Completion Verification Code"?
            </span>
            <p className="text-slate-600 leading-relaxed">
              When you finish a survey, ResearchConnect logs a timestamped completion code (e.g. <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">RCN-OAU-9421</code>). This code acts as proof of participation in case the study includes an airtime or certificate incentive.
            </p>
          </div>

          <div className="pt-3 space-y-1">
            <span className="font-semibold text-slate-800 text-sm block">
              Can I participate if I attend a private or state university?
            </span>
            <p className="text-slate-600 leading-relaxed">
              Yes. Studies list target universities specifically. Many studies are open to all accredited Nigerian tertiary institutions, including polytechnics and colleges of education.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Ready to explore questionnaires seeking your perspective?
          </span>
          <button
            onClick={() => navigateTo('browse-studies')}
            className="px-5 py-2.5 bg-[#0F9D8A] text-white text-xs font-semibold rounded hover:bg-[#0c8070] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Browse Active Studies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
