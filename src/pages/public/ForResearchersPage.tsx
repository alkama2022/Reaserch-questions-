import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileSpreadsheet, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  Link2,
  Users2
} from 'lucide-react';

export const ForResearchersPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#0F9D8A] uppercase tracking-wider">
          Empowering Nigerian Academic Inquiry
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#163B65]">
          Built for Final-Year Students, Postgraduates & Faculty
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Recruiting suitable research participants in Nigerian universities has historically been slow, biased toward close peer circles, and difficult to verify. ResearchConnect Nigeria provides a structured, ethical participant recruitment pipeline.
        </p>
      </div>

      {/* Target Audience Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-[#163B65]">Final-Year Undergraduates (BSc/BA/BEng)</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Need 150–300 respondents to finish your project before the departmental submission deadline? Reach students across departments and campuses with verified inclusion criteria.
          </p>
          <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9D8A]" />
              <span>Cuts recruitment time from 6 weeks to 7 days</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9D8A]" />
              <span>Easy copy-paste of Google Forms links</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-[#163B65]">Postgraduate Researchers (MSc / MPhil / PhD)</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Conducting multi-campus comparative studies in health, economics, or engineering? Set granular demographic and multi-institutional geographic quotas.
          </p>
          <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9D8A]" />
              <span>Cross-regional sampling across Nigerian geopolitical zones</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9D8A]" />
              <span>Compatible with KoboToolbox & Qualtrics</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-[#163B65]">Lecturers & Academic Research Units</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Leading funded research grants or institutional climate surveys? Access audit trails, timestamped consent logs, and verifiable recruitment records.
          </p>
          <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9D8A]" />
              <span>Formal institutional ethics approval tracking</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9D8A]" />
              <span>Detailed CSV reports for methodological defense</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Pre-Recruitment Checklist */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Recommended Pre-Recruitment Checklist for Nigerian Researchers
        </h2>
        <p className="text-xs text-slate-600">
          To ensure your study passes administrative review smoothly, prepare the following items:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1.5">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0F9D8A]" />
              <span>Supervisor / Departmental Approval</span>
            </span>
            <p className="text-slate-600 text-[11px]">
              Confirm that your project supervisor or Head of Department (HOD) has reviewed and approved your research proposal and questionnaire instrument.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1.5">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Link2 className="w-4 h-4 text-[#0F9D8A]" />
              <span>Public Questionnaire Accessibility</span>
            </span>
            <p className="text-slate-600 text-[11px]">
              Test that your Google Form or KoboToolbox URL is set to "Anyone with the link can respond" (not restricted to your university domain only).
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1.5">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0F9D8A]" />
              <span>Realistic Completion Duration</span>
            </span>
            <p className="text-slate-600 text-[11px]">
              Time yourself and a peer taking the questionnaire. Do not state "3 minutes" if the questionnaire has 60 Likert items.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1.5">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0F9D8A]" />
              <span>Embedded Attention Checks</span>
            </span>
            <p className="text-slate-600 text-[11px]">
              Include at least 1–2 attention verification items inside your questions to assist in screening out careless straight-lining responses.
            </p>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-slate-100">
          <span className="text-xs text-slate-500">
            Have everything ready? Launch your study draft in under 5 minutes.
          </span>
          <button
            onClick={() => navigateTo('researcher-create')}
            className="px-5 py-2.5 bg-[#163B65] text-white text-xs font-semibold rounded hover:bg-[#112d4e] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Create Research Study</span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
