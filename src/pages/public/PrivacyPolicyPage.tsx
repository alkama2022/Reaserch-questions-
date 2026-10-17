import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Lock, EyeOff, FileText, ArrowLeft } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-xs text-slate-600 leading-relaxed">
      <button
        onClick={() => navigateTo('home')}
        className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1.5 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      <div className="space-y-2 border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#163B65]">Privacy Policy</h1>
        <p className="text-slate-500">
          Last Updated: Academic Session 2026 · ResearchConnect Nigeria
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm space-y-6">
        
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">1. Core Privacy Commitment</h2>
          <p>
            ResearchConnect Nigeria ("the Platform", "we") is built with data minimization as a foundational principle. Because academic research participants are students sharing personal perspectives, we strictly avoid collecting unnecessary personally identifiable information (PII).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">2. Information Collected</h2>
          <div className="space-y-2">
            <p><strong>For Researchers:</strong> Name, university email, academic institution, department, faculty, and research study details required to verify eligibility and coordinate recruitment.</p>
            <p><strong>For Participants:</strong> Self-declared university, department, level, and eligibility screening responses. We do not store financial records, banking credentials, or student matriculation passwords.</p>
            <p><strong>Session Auditing:</strong> Anonymized timestamps and hashed session identifiers to compute duration anomalies and prevent duplicate submission abuses.</p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">3. Questionnaire Responses & Third-Party Tools</h2>
          <p>
            Researchers on ResearchConnect Nigeria host survey questionnaires on established third-party services including Google Forms, KoboToolbox, Microsoft Forms, and Qualtrics. Substantive survey responses submitted within those external forms are subject to the respective provider's privacy protocols and the researcher's informed consent statement.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">4. Non-Disclosure & Third-Party Advertising</h2>
          <p>
            We do not sell, rent, or trade participant emails or personal information to third-party marketing companies, advertisers, or lead generators. Data is utilized exclusively for facilitating voluntary academic research recruitment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">5. Participant Rights & Withdrawal</h2>
          <p>
            Participants have the right to withdraw from any study at any point prior to questionnaire submission without negative consequences. To request deletion of local account records, contact <code className="text-slate-800 font-mono">compliance@researchconnect.ng</code>.
          </p>
        </section>

      </div>
    </div>
  );
};
