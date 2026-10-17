import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const TermsOfServicePage: React.FC = () => {
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
        <h1 className="text-2xl sm:text-3xl font-bold text-[#163B65]">Terms of Academic Service</h1>
        <p className="text-slate-500">
          Last Revised: 2026 Academic Session · ResearchConnect Nigeria
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm space-y-6">
        
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">1. Acceptance of Terms</h2>
          <p>
            By accessing or using ResearchConnect Nigeria, researchers and participants agree to abide by these Terms of Service and adhere to standard Nigerian university academic integrity regulations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">2. Researcher Responsibilities & Prohibitions</h2>
          <ul className="list-disc list-inside space-y-1.5">
            <li><strong>Genuine Research Intent:</strong> Studies posted must be bona fide academic research projects (undergraduate final-year projects, postgraduate dissertations, or faculty research). Commercial sales funnels, political campaigning, or phishing disguised as surveys are strictly forbidden.</li>
            <li><strong>Accurate Disclosures:</strong> Researchers must accurately represent estimated completion times, institutional affiliations, and incentive terms.</li>
            <li><strong>Institutional Ethics:</strong> Where required by your department or university (e.g. medical, pharmacological, or sensitive human subject inquiries), researchers must possess appropriate ethics committee clearance or supervisor endorsement.</li>
            <li><strong>Participant Respect:</strong> Researchers may not harass, intimidate, or spam participants with unsolicited communications.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">3. Participant Conduct</h2>
          <ul className="list-disc list-inside space-y-1.5">
            <li>Participants agree to provide honest, thoughtful self-reported responses.</li>
            <li>Scripted bots, automated response macros, and multiple fraudulent submissions to claim incentives are prohibited and will result in exclusion.</li>
            <li>Participation is voluntary, and participants may decline or cease answering at any point.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">4. Platform Role & Limitation of Liability</h2>
          <p>
            ResearchConnect Nigeria acts as a matchmaking and recruitment coordination directory. We do not manufacture study findings, author survey questions, or validate final statistical hypotheses. The platform is provided "as is" to facilitate higher education research in Nigeria.
          </p>
        </section>

      </div>
    </div>
  );
};
