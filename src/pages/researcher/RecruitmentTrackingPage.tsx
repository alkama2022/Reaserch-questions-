import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResearcherSidebar } from './ResearcherSidebar';
import { ResponseRecord, ResponseQualityStatus } from '../../types';
import { 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Download, 
  Filter, 
  Search, 
  ShieldCheck, 
  FileSpreadsheet, 
  ChevronDown,
  Info
} from 'lucide-react';
import { QualityBadge, StudyStatusBadge } from '../../components/ui/StatusBadge';

export const RecruitmentTrackingPage: React.FC = () => {
  const { 
    studies, 
    selectedStudyId, 
    setSelectedStudyId, 
    responses, 
    updateResponseQuality, 
    showToast 
  } = useApp();

  const study = studies.find(s => s.id === selectedStudyId) || studies[0];
  const studyResponses = responses.filter(r => r.studyId === study?.id);

  const [filterQuality, setFilterQuality] = useState<'All' | ResponseQualityStatus>('All');
  const [selectedResponse, setSelectedResponse] = useState<ResponseRecord | null>(null);
  const [reviewNoteInput, setReviewNoteInput] = useState('');

  if (!study) {
    return (
      <div className="flex min-h-[calc(100vh-100px)]">
        <ResearcherSidebar activeTab="tracking" />
        <main className="flex-1 p-8 text-center text-xs text-slate-500">
          No study selected. Please select a study from your studies list.
        </main>
      </div>
    );
  }

  const remainingTarget = Math.max(0, study.targetSampleSize - study.acceptedCount);
  const progressPct = Math.min(100, Math.round((study.acceptedCount / study.targetSampleSize) * 100));

  const filteredResponses = studyResponses.filter(r => {
    if (filterQuality !== 'All' && r.qualityStatus !== filterQuality) return false;
    return true;
  });

  const handleExportCSV = () => {
    // Generate clean permitted CSV
    const headers = ['Record_ID', 'Anonymized_Participant_ID', 'University', 'Submission_Time', 'Duration_Sec', 'Quality_Status', 'Speed_Flag', 'Duplicate_IP_Flag', 'Review_Notes'];
    const rows = studyResponses.map(r => [
      r.id,
      r.anonymizedParticipantId,
      `"${r.participantUniversity}"`,
      r.submittedAt,
      r.durationSeconds,
      r.qualityStatus,
      r.flags.speedCheckFailed ? 'YES' : 'NO',
      r.flags.duplicateIpFlag ? 'YES' : 'NO',
      `"${r.reviewNotes || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Recruitment_Audit_${study.id}_Permitted.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Recruitment Data Exported', 'Clean anonymized CSV saved for dissertation records.', 'success');
  };

  const handleApplyQualityReview = (status: ResponseQualityStatus) => {
    if (!selectedResponse) return;
    updateResponseQuality(selectedResponse.id, status, reviewNoteInput);
    setSelectedResponse(null);
    setReviewNoteInput('');
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)]">
      <ResearcherSidebar activeTab="tracking" />

      <main className="flex-1 bg-[#F7F9FC] p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
        
        {/* Breadcrumb & Study Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-1">
              <span>Researcher Console</span>
              <span>/</span>
              <span className="text-slate-800 font-medium">Recruitment Tracking & Quality Audits</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#163B65]">
              Recruitment Progress & Response Screening
            </h1>
          </div>

          {/* Study Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Active Study:</span>
            <select
              value={study.id}
              onChange={(e) => setSelectedStudyId(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded bg-white text-slate-800 outline-none max-w-xs truncate"
            >
              {studies.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Study Banner Info */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0F9D8A] uppercase tracking-wider">{study.category}</span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">{study.surveyTool}</span>
              <span className="text-slate-300">·</span>
              <StudyStatusBadge status={study.status} />
            </div>
            <h2 className="text-base font-bold text-slate-900 leading-snug">{study.title}</h2>
            <p className="text-xs text-slate-500">
              Host: {study.researcherInstitution} · Deadline: <strong className="tabular-nums text-slate-700">{study.recruitmentDeadline}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Audit CSV</span>
            </button>
          </div>
        </div>

        {/* Essential 5 Metrics Strip (Strictly distinguishing recruited, completed, and accepted) */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] text-slate-500 font-medium">Target Sample (N)</span>
            <div className="text-2xl font-bold text-slate-900 tabular-nums">{study.targetSampleSize}</div>
            <span className="text-[11px] text-slate-400 block tabular-nums">Remaining: {remainingTarget}</span>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] text-slate-500 font-medium">Screened & Consented</span>
            <div className="text-2xl font-bold text-[#0F9D8A] tabular-nums">{study.enrolledCount}</div>
            <span className="text-[11px] text-teal-700 block">Met eligibility check</span>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] text-slate-500 font-medium">Survey Completions</span>
            <div className="text-2xl font-bold text-[#163B65] tabular-nums">{study.completedCount}</div>
            <span className="text-[11px] text-slate-400 block">External forms submitted</span>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] text-slate-500 font-medium">Accepted Quality Responses</span>
            <div className="text-2xl font-bold text-emerald-700 tabular-nums">{study.acceptedCount}</div>
            <span className="text-[11px] text-emerald-600 block tabular-nums">{progressPct}% of goal</span>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] text-slate-500 font-medium">Excluded / Flagged</span>
            <div className="text-2xl font-bold text-red-600 tabular-nums">{study.excludedCount}</div>
            <span className="text-[11px] text-amber-600 block tabular-nums">{study.pendingReviewCount} awaiting review</span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800">Recruitment Quota Progress</span>
            <span className="font-bold text-[#163B65] tabular-nums">{study.acceptedCount} of {study.targetSampleSize} Valid Responses ({progressPct}%)</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#0F9D8A] h-full rounded-full transition-all duration-500" 
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Response Quality Review Table */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Response-Quality Inspection Logs</span>
                <span className="text-slate-400 font-normal">({filteredResponses.length} records)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Inspect submission durations, flag anomalous speed completions, and confirm or exclude responses.
              </p>
            </div>

            {/* Quality Filter Buttons */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-medium mr-1">Status:</span>
              {(['All', 'Pending', 'Accepted', 'Needs Review', 'Excluded'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => setFilterQuality(q)}
                  className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                    filterQuality === q ? 'bg-[#163B65] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {filteredResponses.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-400">
              No response records match the selected quality filter.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <th className="p-3">Participant ID (Anonymized)</th>
                    <th className="p-3">University</th>
                    <th className="p-3">Submitted At</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Quality Flags</th>
                    <th className="p-3">Quality Status</th>
                    <th className="p-3 text-right">Review Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {filteredResponses.map((r) => {
                    const minutes = Math.floor(r.durationSeconds / 60);
                    const seconds = r.durationSeconds % 60;
                    return (
                      <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono font-semibold text-slate-700 tabular-nums">
                          {r.anonymizedParticipantId}
                        </td>
                        <td className="p-3 text-slate-600">{r.participantUniversity}</td>
                        <td className="p-3 text-slate-500 tabular-nums">
                          {new Date(r.submittedAt).toLocaleDateString()} {new Date(r.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="p-3 tabular-nums text-slate-700 font-medium">
                          {minutes}m {seconds}s
                        </td>
                        <td className="p-3">
                          {r.flags.speedCheckFailed || r.flags.duplicateIpFlag || r.flags.straightLiningFlag ? (
                            <div className="flex flex-wrap gap-1 text-[10px]">
                              {r.flags.speedCheckFailed && (
                                <span className="bg-red-50 text-red-700 border border-red-200 px-1.5 py-0.5 rounded font-medium">
                                  Speed Run (&lt; 2m)
                                </span>
                              )}
                              {r.flags.duplicateIpFlag && (
                                <span className="bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded font-medium">
                                  Repeated IP
                                </span>
                              )}
                              {r.flags.straightLiningFlag && (
                                <span className="bg-purple-50 text-purple-700 border border-purple-200 px-1.5 py-0.5 rounded font-medium">
                                  Straight-Lining
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Normal Checks Passed</span>
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          <QualityBadge status={r.qualityStatus} />
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedResponse(r);
                              setReviewNoteInput(r.reviewNotes || '');
                            }}
                            className="px-2.5 py-1 text-xs font-semibold text-[#163B65] hover:bg-slate-100 rounded border border-slate-300 transition-colors cursor-pointer"
                          >
                            Audit / Review
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal for Reviewing a Single Response */}
        {selectedResponse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm font-bold text-[#163B65]">Response Quality Audit</h3>
                <span className="font-mono text-xs text-slate-500 tabular-nums">
                  {selectedResponse.anonymizedParticipantId}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded border border-slate-200">
                <div><strong>University:</strong> {selectedResponse.participantUniversity}</div>
                <div><strong>Completion Time:</strong> {Math.floor(selectedResponse.durationSeconds / 60)}m {selectedResponse.durationSeconds % 60}s</div>
                <div><strong>Current Quality:</strong> {selectedResponse.qualityStatus}</div>
                {selectedResponse.reviewNotes && (
                  <div><strong>Notes:</strong> {selectedResponse.reviewNotes}</div>
                )}
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="block font-semibold text-slate-700">Audit Notes / Reason:</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Attention check questions verified, or excluded due to duration anomaly..."
                  value={reviewNoteInput}
                  onChange={(e) => setReviewNoteInput(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-800 resize-none outline-none focus:border-[#0F9D8A]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedResponse(null)}
                  className="text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleApplyQualityReview('Excluded')}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded font-semibold cursor-pointer"
                  >
                    Exclude
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyQualityReview('Needs Review')}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded font-semibold cursor-pointer"
                  >
                    Needs Review
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyQualityReview('Accepted')}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-semibold cursor-pointer"
                  >
                    Accept Response
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
