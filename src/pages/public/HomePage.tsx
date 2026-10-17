import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  FileSpreadsheet, 
  ShieldCheck, 
  HelpCircle, 
  Clock, 
  GraduationCap, 
  Sparkles,
  BarChart3,
  ExternalLink,
  Search
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, studies } = useApp();

  const activeStudies = studies.filter(s => s.status === 'Active');

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Copy: Concrete value proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#163B65] bg-slate-100 px-3 py-1 rounded">
                <GraduationCap className="w-4 h-4 text-[#0F9D8A]" />
                <span>Purpose-Built for Nigerian Higher Education & Research</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#163B65] leading-[1.15]" style={{ textWrap: 'balance' }}>
                Connecting Nigerian Academic Research with the Right Participants.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Tired of begging on WhatsApp groups for dissertation responses? ResearchConnect Nigeria helps final-year undergraduate students, postgraduate scholars, and faculty recruit targeted, screened participants across Nigerian universities with transparent recruitment tracking.
              </p>

              {/* Primary Call to Action Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => navigateTo('register')}
                  className="px-6 py-3.5 bg-[#163B65] hover:bg-[#112d4e] text-white font-semibold text-sm rounded shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Find Research Participants</span>
                  <ArrowRight className="w-4 h-4 text-teal-300" />
                </button>
                <button
                  onClick={() => navigateTo('browse-studies')}
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded border border-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-slate-400" />
                  <span>Explore Open Studies</span>
                </button>
              </div>

              {/* Trust Indicators: Adjacency to claim */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0F9D8A]" />
                  <span>Pre-screened inclusion criteria</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0F9D8A]" />
                  <span>Google Forms & KoboToolbox ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0F9D8A]" />
                  <span>Response quality audits</span>
                </div>
              </div>
            </div>

            {/* Right: Authentic Academic Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-lg overflow-hidden border border-slate-200 shadow-md bg-white">
                <img
                  src="/src/assets/images/hero_nigerian_research_1792198293896.jpg"
                  alt="Nigerian university students collaborating on academic research in a university library"
                  className="w-full h-72 sm:h-80 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 bg-white border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-medium text-slate-700">Active Campus Recruitment</span>
                    <span className="tabular-nums">UNILAG · OAU · UI · ABU</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    Dissertation students can specify faculty, department, level, and smartphone banking usage before participants access external questionnaire links.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Platform Live Preview Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-semibold text-[#0F9D8A] uppercase tracking-wider">
                Recruitment Dashboard Preview
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#163B65] mt-1">
                Real-Time Tracking for Your Questionnaire Fieldwork
              </h2>
            </div>
            <button
              onClick={() => navigateTo('researcher-overview')}
              className="px-4 py-2 text-xs font-semibold text-[#163B65] bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Test Interactive Researcher Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Metric Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
            <div className="p-4 rounded bg-[#F7F9FC] border border-slate-200/80">
              <span className="text-xs text-slate-500 block">Target Sample Size</span>
              <span className="text-2xl font-bold text-slate-900 tabular-nums">250</span>
              <span className="text-[11px] text-slate-400 block mt-1">Undergraduates in Lagos</span>
            </div>
            <div className="p-4 rounded bg-[#F7F9FC] border border-slate-200/80">
              <span className="text-xs text-slate-500 block">Screened & Consented</span>
              <span className="text-2xl font-bold text-[#0F9D8A] tabular-nums">198</span>
              <span className="text-[11px] text-teal-700 block mt-1">79.2% of target target</span>
            </div>
            <div className="p-4 rounded bg-[#F7F9FC] border border-slate-200/80">
              <span className="text-xs text-slate-500 block">Survey Completed</span>
              <span className="text-2xl font-bold text-[#163B65] tabular-nums">184</span>
              <span className="text-[11px] text-slate-500 block mt-1">Completed survey link</span>
            </div>
            <div className="p-4 rounded bg-[#F7F9FC] border border-slate-200/80">
              <span className="text-xs text-slate-500 block">Accepted Clean Responses</span>
              <span className="text-2xl font-bold text-emerald-700 tabular-nums">162</span>
              <span className="text-[11px] text-amber-700 block mt-1">12 excluded for speed/duplicates</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Explanation: Mechanism-to-Outcome */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#0F9D8A] uppercase tracking-wider">
            Clear, Transparent Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#163B65] mt-1">
            How ResearchConnect Nigeria Works
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            A structured three-step protocol that maintains academic integrity while cutting recruitment turnaround from weeks to days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#163B65] text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Define Criteria & Survey URL
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Post your study objectives, target population (universities, faculties, demographic parameters), and link your Google Forms or KoboToolbox questionnaire. Submit for quick ethical screening.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9D8A]" />
              <span>Institutional approval checklist</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#0F9D8A] text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Screening & Informed Consent
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Eligible Nigerian students discover your study, review the participant information sheet, verify eligibility conditions, and provide digital informed consent before being redirected.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9D8A]" />
              <span>Right to voluntary withdrawal</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-slate-800 text-white flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Track Quotas & Audit Quality
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track completion metrics against your required sample size. Review flagged anomalies (speed completions, repetitive sessions) and export clean CSV recruitment records for your methodology chapter.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9D8A]" />
              <span>Audit logs for defense presentations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Value Proposition: Researchers vs Participants */}
      <section className="bg-slate-50 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* For Researchers */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded bg-blue-50 text-[#163B65]">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#163B65]">For Nigerian Researchers & Students</h3>
                  <p className="text-xs text-slate-500">Undergraduate Projects · Dissertations · Faculty Studies</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600 pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F9D8A] shrink-0 mt-0.5" />
                  <span>Reach specific demographics beyond your immediate departmental friendship circle.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F9D8A] shrink-0 mt-0.5" />
                  <span>Filter respondents by university type (Federal, State, Private) and academic level.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F9D8A] shrink-0 mt-0.5" />
                  <span>Keep existing survey questionnaires intact on Google Forms or KoboToolbox.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F9D8A] shrink-0 mt-0.5" />
                  <span>Structured recruitment metrics to document in Chapter 3 (Methodology).</span>
                </li>
              </ul>
              <div className="pt-3">
                <button
                  onClick={() => navigateTo('for-researchers')}
                  className="text-xs font-semibold text-[#163B65] hover:text-[#0F9D8A] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Researcher Guidelines</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* For Participants */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded bg-teal-50 text-[#0F9D8A]">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#163B65]">For University Student Participants</h3>
                  <p className="text-xs text-slate-500">Support Academic Discovery · Informed & Voluntary</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600 pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F9D8A] shrink-0 mt-0.5" />
                  <span>Contribute directly to critical Nigerian research in health, technology, and economy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F9D8A] shrink-0 mt-0.5" />
                  <span>Read full information statements and time estimates before deciding to participate.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F9D8A] shrink-0 mt-0.5" />
                  <span>Transparent disclosure: No unverified or deceptive reward promises.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F9D8A] shrink-0 mt-0.5" />
                  <span>Complete privacy protection: Your contact details are never sold or publicized.</span>
                </li>
              </ul>
              <div className="pt-3">
                <button
                  onClick={() => navigateTo('for-participants')}
                  className="text-xs font-semibold text-[#163B65] hover:text-[#0F9D8A] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Participant Rights & Consent</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Rigorous Academic Disclosure: Response-Quality Checks & Limitations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-slate-300 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded bg-amber-50 text-amber-700 shrink-0 mt-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900">
                Understanding Response-Quality Checks & Their Methodological Limitations
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Academic rigor requires transparency. ResearchConnect Nigeria equips researchers with screening criteria and automated flags, but researchers must understand what automated recruitment tools can and cannot guarantee:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="bg-slate-50 p-3.5 rounded border border-slate-200">
                  <span className="font-semibold text-slate-800 block mb-1">
                    What the Platform Detects:
                  </span>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    <li>Duration anomalies (submitting 15-minute surveys in 90 seconds).</li>
                    <li>Repeated submissions from the identical browser session or IP network.</li>
                    <li>Straight-lining patterns on Likert matrices (where survey data is exposed).</li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-3.5 rounded border border-slate-200">
                  <span className="font-semibold text-slate-800 block mb-1">
                    Inherent Methodological Limitations:
                  </span>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    <li>Eligibility screening relies on participant self-disclosure.</li>
                    <li>Automated checks do NOT guarantee psychological truthfulness.</li>
                    <li>Researchers must include embedded attention checks in questionnaires.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Open Studies Snapshot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#163B65]">Currently Recruiting Studies</h2>
            <p className="text-xs text-slate-500 mt-0.5">Explore active research projects recruiting participants across Nigeria</p>
          </div>
          <button
            onClick={() => navigateTo('browse-studies')}
            className="text-xs font-semibold text-[#0F9D8A] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({activeStudies.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeStudies.slice(0, 3).map((study) => (
            <div 
              key={study.id} 
              className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-slate-700">{study.category}</span>
                  <span className="tabular-nums flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>~{study.estimatedMinutes} mins</span>
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                  {study.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {study.briefDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
                <div className="text-xs text-slate-500">
                  <span className="font-medium text-slate-700">{study.researcherInstitution}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-500 tabular-nums">
                    Target: <strong className="text-slate-800">{study.targetSampleSize}</strong>
                  </span>
                  <button
                    onClick={() => navigateTo('study-details', study.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-[#163B65] bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-[#163B65] text-white rounded-lg p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to Complete Your Dissertation Research on Schedule?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Stop losing precious weeks to sluggish WhatsApp broadcasts. Launch your research recruitment with defined eligibility parameters today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('register')}
              className="px-6 py-3 bg-[#0F9D8A] hover:bg-[#0c8070] text-white font-semibold text-xs rounded transition-colors cursor-pointer shadow"
            >
              Register as Researcher
            </button>
            <button
              onClick={() => navigateTo('browse-studies')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded transition-colors cursor-pointer border border-white/20"
            >
              Browse Open Studies as Participant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
