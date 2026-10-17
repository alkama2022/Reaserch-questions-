import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Target, Shield, HeartHandshake, ArrowRight } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-semibold text-[#0F9D8A] uppercase tracking-wider">
          Our Academic Mission
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#163B65]">
          About ResearchConnect Nigeria
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          "Connecting Research with the Right People."
        </p>
      </div>

      {/* Origin & Problem Solved */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm text-xs leading-relaxed text-slate-600">
        <h2 className="text-lg font-bold text-slate-900">
          The Challenge in Nigerian University Fieldwork
        </h2>
        <p>
          Every academic session, tens of thousands of Nigerian university students enter their final undergraduate or postgraduate year with a mandatory requirement: conduct original empirical research, collect questionnaire data, analyze findings, and defend their thesis.
        </p>
        <p>
          In practice, this process faces immense friction. Students paste Google Forms links repeatedly into unrelated WhatsApp groups, plead with classmates, or resort to convenience samples that fail basic demographic sampling criteria. Supervisors routinely question the provenance and validity of responses during final defense presentations.
        </p>
        <p>
          <strong>ResearchConnect Nigeria</strong> was conceived as a focused, lightweight academic bridge: a structured platform where researchers clearly specify eligibility criteria, submit survey instruments for basic screening, and connect with genuinely eligible student participants across Nigerian campuses.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-2.5">
          <Target className="w-6 h-6 text-[#163B65]" />
          <h3 className="text-sm font-bold text-slate-900">Demographic Precision</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Replace scattershot WhatsApp broadcasts with targeted recruitment parameters: university, department, level, and specific behavioral traits.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-2.5">
          <Shield className="w-6 h-6 text-[#0F9D8A]" />
          <h3 className="text-sm font-bold text-slate-900">Informed Consent First</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every participant reads an institutional information sheet and signs digital informed consent before accessing questionnaires.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-2.5">
          <BookOpen className="w-6 h-6 text-slate-800" />
          <h3 className="text-sm font-bold text-slate-900">Transparent Quality Checks</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Automated duration checks and session audits provide researchers with auditable logs to defend their sampling methodology.
          </p>
        </div>
      </div>

      {/* Founder / Stage Notice */}
      <div className="bg-[#F7F9FC] border border-slate-200 rounded-lg p-6 space-y-2 text-xs text-slate-600">
        <h3 className="text-sm font-bold text-[#163B65]">Early-Stage Academic Platform (V1.0)</h3>
        <p>
          ResearchConnect Nigeria is an independent academic technology initiative built for the Nigerian higher education ecosystem. We do not claim official endorsement or partnership with individual universities unless formally designated.
        </p>
        <p className="text-slate-500">
          Our priority for V1.0 is delivering a dependable, transparent minimum viable product that solves the immediate questionnaire recruitment pain point for Nigerian students and faculty.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center pt-2">
        <button
          onClick={() => navigateTo('browse-studies')}
          className="px-6 py-3 bg-[#163B65] text-white text-xs font-semibold rounded hover:bg-[#112d4e] transition-colors cursor-pointer shadow-xs inline-flex items-center gap-2"
        >
          <span>Explore Platform Studies</span>
          <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
        </button>
      </div>
    </div>
  );
};
