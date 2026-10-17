import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  BarChart3, 
  ExternalLink, 
  ArrowRight,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#0F9D8A] uppercase tracking-wider">
          Platform Architecture & Operations
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#163B65]">
          How ResearchConnect Nigeria Works
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Designed specifically to bridge the gap between academic researchers and prospective student participants across Nigerian federal, state, and private universities.
        </p>
      </div>

      {/* Two Streams: Researcher Journey vs Participant Journey */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Stream 1: The Researcher's Path */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-semibold text-[#163B65] uppercase tracking-wider block">
              Workflow Stream 01
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">The Researcher Journey</h2>
            <p className="text-xs text-slate-500 mt-1">
              For undergraduate final-year students, MSc/PhD candidates, and lecturers.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-[#163B65] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </div>
              <div>
                <strong className="text-slate-800 text-sm block">Draft Study & Define Criteria</strong>
                <p className="text-slate-600 mt-0.5">
                  State your dissertation topic, research purpose, and demographic boundaries (e.g. target age, university location, faculties). Add inclusion and exclusion screening questions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-[#163B65] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </div>
              <div>
                <strong className="text-slate-800 text-sm block">Submit Survey Tool URL</strong>
                <p className="text-slate-600 mt-0.5">
                  Paste the public link to your Google Form, KoboToolbox, Microsoft Form, or Qualtrics questionnaire. Add ethics approval code and supervisor details.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-[#163B65] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                3
              </div>
              <div>
                <strong className="text-slate-800 text-sm block">Administrative Review</strong>
                <p className="text-slate-600 mt-0.5">
                  Platform moderators review the study to ensure no malicious links, commercial marketing disguised as research, or predatory surveys are published.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-[#163B65] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                4
              </div>
              <div>
                <strong className="text-slate-800 text-sm block">Monitor Recruitment & Flags</strong>
                <p className="text-slate-600 mt-0.5">
                  Review response completion counts in real time. Inspect flagged records (e.g., speed completions, repeated IPs) and accept or exclude responses.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-[#163B65] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                5
              </div>
              <div>
                <strong className="text-slate-800 text-sm block">Export Permitted Data</strong>
                <p className="text-slate-600 mt-0.5">
                  Download timestamped recruitment summaries and screening records for your Chapter 3 dissertation methodology defense.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigateTo('for-researchers')}
              className="w-full py-2 bg-[#163B65] text-white text-xs font-semibold rounded hover:bg-[#112d4e] transition-colors cursor-pointer"
            >
              Explore Researcher Features
            </button>
          </div>
        </div>

        {/* Stream 2: The Participant's Path */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-semibold text-[#0F9D8A] uppercase tracking-wider block">
              Workflow Stream 02
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">The Participant Journey</h2>
            <p className="text-xs text-slate-500 mt-1">
              For undergraduate and postgraduate university students volunteering responses.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-[#0F9D8A] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </div>
              <div>
                <strong className="text-slate-800 text-sm block">Browse Matching Studies</strong>
                <p className="text-slate-600 mt-0.5">
                  Filter studies by academic discipline, your university, estimated completion time, or token incentive.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-[#0F9D8A] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </div>
              <div>
                <strong className="text-slate-800 text-sm block">Eligibility Self-Check</strong>
                <p className="text-slate-600 mt-0.5">
                  Answer 1–2 simple screening questions to ensure you match the exact demographic needed by the researcher.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-[#0F9D8A] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                3
              </div>
              <div>
                <strong className="text-slate-800 text-sm block">Informed Consent Disclosure</strong>
                <p className="text-slate-600 mt-0.5">
                  Read the research purpose, confirm voluntary participation, and learn how responses will be used before any answers are recorded.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-[#0F9D8A] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                4
              </div>
              <div>
                <strong className="text-slate-800 text-sm block">Complete External Questionnaire</strong>
                <p className="text-slate-600 mt-0.5">
                  Answer the researcher's questionnaire on Google Forms or KoboToolbox. No unnecessary personal app installation required.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-[#0F9D8A] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                5
              </div>
              <div>
                <strong className="text-slate-800 text-sm block">Receive Verification Code</strong>
                <p className="text-slate-600 mt-0.5">
                  Log your completion code to maintain a personal participation history and facilitate token disbursement where applicable.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigateTo('for-participants')}
              className="w-full py-2 bg-[#0F9D8A] text-white text-xs font-semibold rounded hover:bg-[#0c8070] transition-colors cursor-pointer"
            >
              Explore Participant Rights
            </button>
          </div>
        </div>

      </div>

      {/* Deep-Dive: Quality Checks & Limitations */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#163B65]" />
          <h2 className="text-lg font-bold text-slate-900">
            How ResearchConnect Handles Response Quality & Audits
          </h2>
        </div>
        
        <p className="text-xs text-slate-600 leading-relaxed">
          In undergraduate research across Nigeria, one of the primary concerns supervisors raise during defense presentations is questionnaire data validity: "How do you know these responses aren't fabricated by your course mates?"
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-800 block">Completion Duration Audits</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Surveys that take 12 minutes to read properly will automatically flag submissions completed in under 2 minutes as potential "speed-runs".
            </p>
          </div>

          <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-800 block">Repeated Session Clustering</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Detects identical browser fingerprints submitting multiple times within rapid succession, aiding in identifying duplicate participant entries.
            </p>
          </div>

          <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-800 block">Manual Quality Acceptance</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Researchers can inspect flagged submissions and categorize them as Accepted, Excluded, or Needs Review with internal rationale notes.
            </p>
          </div>
        </div>

        <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 flex items-start gap-2 mt-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Note on Methodological Limitations:</strong> Automated screening relies on self-reported inputs. We strongly advise student researchers to embed reverse-coded attention check questions (e.g., "For this question, select Strongly Disagree") directly inside your survey forms.
          </p>
        </div>
      </div>

    </div>
  );
};
