import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResearcherSidebar } from './ResearcherSidebar';
import { Download, FileSpreadsheet, FileText, CheckCircle2, PieChart, BarChart2, Shield } from 'lucide-react';

export const ResearcherReportsPage: React.FC = () => {
  const { studies, selectedStudyId, setSelectedStudyId, responses, showToast } = useApp();

  const study = studies.find(s => s.id === selectedStudyId) || studies[0];
  const studyResponses = responses.filter(r => r.studyId === study?.id);

  const [reportFormat, setReportFormat] = useState<'csv' | 'json'>('csv');

  const downloadReport = () => {
    if (reportFormat === 'csv') {
      const headers = ['Record_ID', 'Participant_ID', 'University', 'Duration_Seconds', 'Quality_Status', 'Review_Notes'];
      const rows = studyResponses.map(r => [
        r.id,
        r.anonymizedParticipantId,
        `"${r.participantUniversity}"`,
        r.durationSeconds,
        r.qualityStatus,
        `"${r.reviewNotes || ''}"`
      ]);
      const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      const link = document.createElement('a');
      link.href = encodeURI(csv);
      link.download = `Chapter3_Methodology_Report_${study.id}.csv`;
      link.click();
    } else {
      const jsonContent = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
        studyTitle: study.title,
        institution: study.researcherInstitution,
        targetSampleSize: study.targetSampleSize,
        enrolledCount: study.enrolledCount,
        completedCount: study.completedCount,
        acceptedCount: study.acceptedCount,
        excludedCount: study.excludedCount,
        responses: studyResponses
      }, null, 2));
      const link = document.createElement('a');
      link.href = jsonContent;
      link.download = `Methodology_Audit_${study.id}.json`;
      link.click();
    }

    showToast('Report Downloaded', `Generated academic methodology report for ${study.title.slice(0, 30)}...`, 'success');
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)]">
      <ResearcherSidebar activeTab="reports" />

      <main className="flex-1 bg-[#F7F9FC] p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-1">
              <span>Researcher Console</span>
              <span>/</span>
              <span className="text-slate-800 font-medium">Reports & Permitted Data Exports</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#163B65]">
              Dissertation Methodology Reports
            </h1>
            <p className="text-xs text-slate-500">
              Download formal recruitment metrics, sampling breakdowns, and consent audit logs for Chapter 3.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={study.id}
              onChange={(e) => setSelectedStudyId(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded bg-white text-slate-800 outline-none max-w-xs truncate"
            >
              {studies.map((s) => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Methodology Summary Box */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold text-[#0F9D8A] uppercase tracking-wider block">
                Academic Defense Documentation
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">{study.title}</h2>
            </div>
            
            <div className="flex items-center gap-2">
              <select
                value={reportFormat}
                onChange={(e: any) => setReportFormat(e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white"
              >
                <option value="csv">Format: CSV Table</option>
                <option value="json">Format: Structured JSON</option>
              </select>
              <button
                onClick={downloadReport}
                className="px-4 py-1.5 bg-[#163B65] hover:bg-[#112d4e] text-white text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-teal-300" />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* Attrition Funnel */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-800 block">
              1. Participant Recruitment Funnel & Yield
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Screened & Consented</span>
                <span className="text-lg font-bold text-slate-900 tabular-nums">{study.enrolledCount}</span>
                <span className="text-[10px] text-slate-400 block">100% of pipeline</span>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Completed Questionnaire</span>
                <span className="text-lg font-bold text-slate-900 tabular-nums">{study.completedCount}</span>
                <span className="text-[10px] text-teal-700 block tabular-nums">
                  {Math.round((study.completedCount / (study.enrolledCount || 1)) * 100)}% completion rate
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Accepted Valid Responses</span>
                <span className="text-lg font-bold text-emerald-700 tabular-nums">{study.acceptedCount}</span>
                <span className="text-[10px] text-emerald-600 block tabular-nums">
                  {Math.round((study.acceptedCount / (study.targetSampleSize || 1)) * 100)}% of target
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Excluded Anomalies</span>
                <span className="text-lg font-bold text-red-600 tabular-nums">{study.excludedCount}</span>
                <span className="text-[10px] text-red-500 block tabular-nums">Speed/duplicate flags</span>
              </div>
            </div>
          </div>

          {/* Institutional Demographics Breakdown */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <span className="font-semibold text-slate-800 block">
              2. Target Geographic & Institutional Distribution
            </span>
            <div className="bg-slate-50 p-3.5 rounded border border-slate-200 space-y-1 text-slate-600">
              <p><strong>Primary Host Institution:</strong> {study.researcherInstitution}</p>
              <p><strong>Approved Regional Scope:</strong> {study.targetUniversities.join(', ') || 'All Nigerian Universities'}</p>
              <p><strong>Target Age Band:</strong> {study.ageMin || 18} to {study.ageMax || 35} years old</p>
              <p><strong>Survey Tool Engine:</strong> {study.surveyTool}</p>
              <p><strong>Ethics Protocol Code:</strong> {study.ethicsApprovalNumber || 'Exempt / Faculty Board Clearance'}</p>
            </div>
          </div>

          {/* Defense Text Template Generator */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <span className="font-semibold text-slate-800 block">
              3. Suggested Chapter 3 (Methodology) Paragraph
            </span>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded font-serif text-slate-700 leading-relaxed text-[11px]">
              "Participant recruitment for this study was facilitated through the ResearchConnect Nigeria academic participant recruitment platform. A total of {study.enrolledCount} prospective student participants were screened against predefined inclusion criteria. Informed digital consent was obtained prior to questionnaire administration. Of the {study.completedCount} survey submissions received via {study.surveyTool}, {study.acceptedCount} responses met all completion duration audits and attention verification checks, yielding a final valid sample of N={study.acceptedCount} ({Math.round((study.acceptedCount / study.targetSampleSize) * 100)}% of the target sample size of {study.targetSampleSize})."
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};
