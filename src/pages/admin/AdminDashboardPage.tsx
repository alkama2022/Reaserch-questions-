import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Study, AuditLogItem } from '../../types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Users, 
  ExternalLink, 
  PauseCircle, 
  PlayCircle,
  Database,
  History,
  Lock,
  Search
} from 'lucide-react';
import { StudyStatusBadge } from '../../components/ui/StatusBadge';

export const AdminDashboardPage: React.FC = () => {
  const { 
    currentUser, 
    studies, 
    auditLogs, 
    adminApproveStudy, 
    adminRejectStudy, 
    adminRequestChanges, 
    adminPauseStudy, 
    adminResumeStudy,
    showToast,
    navigateTo 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'pending' | 'all-studies' | 'users' | 'audit'>('pending');
  
  // Modal for review action
  const [reviewStudy, setReviewStudy] = useState<Study | null>(null);
  const [rejectReasonInput, setRejectReasonInput] = useState('');
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'changes' | null>(null);

  const pendingStudies = studies.filter(s => s.status === 'Pending Review');
  const activeStudies = studies.filter(s => s.status === 'Active');
  const totalStudiesCount = studies.length;

  const handleConfirmAction = () => {
    if (!reviewStudy) return;

    if (actionType === 'approve') {
      adminApproveStudy(reviewStudy.id, adminNotesInput);
    } else if (actionType === 'reject') {
      if (!rejectReasonInput.trim()) {
        showToast('Reason Required', 'You must provide a clear written reason for rejecting the study.', 'warning');
        return;
      }
      adminRejectStudy(reviewStudy.id, rejectReasonInput);
    } else if (actionType === 'changes') {
      if (!rejectReasonInput.trim()) {
        showToast('Feedback Required', 'Please specify what changes are needed before resubmission.', 'warning');
        return;
      }
      adminRequestChanges(reviewStudy.id, rejectReasonInput);
    }

    setReviewStudy(null);
    setActionType(null);
    setRejectReasonInput('');
    setAdminNotesInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Admin Protected Notice */}
      <div className="bg-[#163B65] text-white p-4 sm:p-5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-white/10 text-teal-300">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold">Institutional Ethics & Review Desk</h1>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-mono font-semibold">
                ADMIN ACCESS
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Logged in as: <strong>{currentUser?.fullName}</strong> ({currentUser?.institution})
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-300 bg-black/20 p-2.5 rounded border border-white/10 max-w-sm">
          <span className="font-semibold text-white block mb-0.5">Security Notice:</span>
          In production, review operations are enforced via Supabase PostgreSQL Row Level Security (RLS) policies.
        </div>
      </div>

      {/* Admin KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Pending Ethics Review</span>
          <div className="text-2xl font-bold text-amber-600 tabular-nums">{pendingStudies.length}</div>
          <span className="text-[11px] text-slate-400">Awaiting clearance decision</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Active Recruiting Studies</span>
          <div className="text-2xl font-bold text-emerald-700 tabular-nums">{activeStudies.length}</div>
          <span className="text-[11px] text-emerald-600">Discoverable on platform</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Total Registered Studies</span>
          <div className="text-2xl font-bold text-[#163B65] tabular-nums">{totalStudiesCount}</div>
          <span className="text-[11px] text-slate-400">All statuses across Nigeria</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Audit Trail Entries</span>
          <div className="text-2xl font-bold text-slate-800 tabular-nums">{auditLogs.length}</div>
          <span className="text-[11px] text-slate-400">Verifiable action logs</span>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs flex items-center gap-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveAdminTab('pending')}
          className={`px-3 py-1.5 rounded font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeAdminTab === 'pending'
              ? 'bg-[#163B65] text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Pending Review Queue ({pendingStudies.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('all-studies')}
          className={`px-3 py-1.5 rounded font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeAdminTab === 'all-studies'
              ? 'bg-[#163B65] text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>All Platform Studies ({studies.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('users')}
          className={`px-3 py-1.5 rounded font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeAdminTab === 'users'
              ? 'bg-[#163B65] text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>User Directory</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('audit')}
          className={`px-3 py-1.5 rounded font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeAdminTab === 'audit'
              ? 'bg-[#163B65] text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Ethics Audit Log</span>
        </button>
      </div>

      {/* TAB 1: PENDING REVIEW QUEUE */}
      {activeAdminTab === 'pending' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Studies Awaiting Clearance Decision</h2>
            <p className="text-xs text-slate-500">
              Review questionnaire link safety, stated research purpose, and demographic criteria before enabling public recruitment.
            </p>
          </div>

          {pendingStudies.length === 0 ? (
            <div className="text-center py-12 text-xs text-slate-400 space-y-1">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="font-semibold text-slate-700">Review Queue is Clear</p>
              <p>There are no study requests currently awaiting review.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingStudies.map((study) => (
                <div key={study.id} className="p-4 rounded border border-slate-200 bg-slate-50/50 space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-[#0F9D8A] uppercase tracking-wider block">
                        {study.category}
                      </span>
                      <h3 className="text-sm font-bold text-[#163B65] mt-0.5">{study.title}</h3>
                      <p className="text-slate-500 text-[11px]">
                        Submitted by: <strong>{study.researcherName}</strong> ({study.researcherInstitution})
                      </p>
                    </div>
                    <StudyStatusBadge status={study.status} />
                  </div>

                  <p className="text-slate-600 leading-relaxed bg-white p-3 rounded border border-slate-100">
                    {study.researchPurpose}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-500">
                    <div><strong>Target Sample:</strong> {study.targetSampleSize} participants</div>
                    <div><strong>Instrument:</strong> {study.surveyTool} (~{study.estimatedMinutes} mins)</div>
                    <div><strong>Supervisor:</strong> {study.supervisorName || 'Not specified'}</div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200">
                    <a
                      href={study.questionnaireUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0F9D8A] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Inspect Questionnaire URL</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setReviewStudy(study);
                          setActionType('changes');
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold cursor-pointer"
                      >
                        Request Changes
                      </button>
                      <button
                        onClick={() => {
                          setReviewStudy(study);
                          setActionType('reject');
                        }}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded font-semibold cursor-pointer"
                      >
                        Reject Study
                      </button>
                      <button
                        onClick={() => {
                          setReviewStudy(study);
                          setActionType('approve');
                        }}
                        className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-semibold cursor-pointer shadow-2xs"
                      >
                        Approve & Publish
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ALL PLATFORM STUDIES */}
      {activeAdminTab === 'all-studies' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">All Registered Research Studies</h2>
            <p className="text-xs text-slate-500">Monitor status, recruitment progress, or pause studies as needed</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="p-3">Title</th>
                  <th className="p-3">Investigator</th>
                  <th className="p-3">Institution</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Responses</th>
                  <th className="p-3 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {studies.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-semibold text-[#163B65] max-w-xs truncate">{s.title}</td>
                    <td className="p-3 text-slate-600">{s.researcherName}</td>
                    <td className="p-3 text-slate-500">{s.researcherInstitution}</td>
                    <td className="p-3">
                      <StudyStatusBadge status={s.status} />
                    </td>
                    <td className="p-3 text-right tabular-nums">
                      {s.completedCount} / {s.targetSampleSize}
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      {s.status === 'Active' && (
                        <button
                          onClick={() => adminPauseStudy(s.id)}
                          className="px-2.5 py-1 text-slate-600 hover:text-slate-900 border border-slate-200 rounded text-[11px] cursor-pointer"
                        >
                          Pause
                        </button>
                      )}
                      {s.status === 'Paused' && (
                        <button
                          onClick={() => adminResumeStudy(s.id)}
                          className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] cursor-pointer"
                        >
                          Resume
                        </button>
                      )}
                      <button
                        onClick={() => navigateTo('study-details', s.id)}
                        className="px-2.5 py-1 text-[#163B65] hover:underline font-semibold cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: USER DIRECTORY */}
      {activeAdminTab === 'users' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Registered Users & Institutional Accounts</h2>
            <p className="text-xs text-slate-500">Student researchers, participants, and ethics moderators</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="font-bold text-slate-900 block text-sm">Chiamaka Eze</span>
              <p className="text-slate-600">chiamaka.eze@unilag.edu.ng</p>
              <div className="text-[11px] text-slate-500 space-y-0.5">
                <div>Role: <strong>Researcher</strong></div>
                <div>Institution: University of Lagos (UNILAG)</div>
                <div>Status: <span className="text-emerald-700 font-semibold">Institutional Email Verified</span></div>
              </div>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="font-bold text-slate-900 block text-sm">Babatunde Adebayo</span>
              <p className="text-slate-600">tunde.adebayo@student.oauife.edu.ng</p>
              <div className="text-[11px] text-slate-500 space-y-0.5">
                <div>Role: <strong>Participant</strong></div>
                <div>Institution: Obafemi Awolowo University (OAU)</div>
                <div>Status: <span className="text-emerald-700 font-semibold">Active Participant</span></div>
              </div>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="font-bold text-slate-900 block text-sm">Dr. Ibrahim Bello</span>
              <p className="text-slate-600">compliance@researchconnect.ng</p>
              <div className="text-[11px] text-slate-500 space-y-0.5">
                <div>Role: <strong>Administrator</strong></div>
                <div>Institution: Ahmadu Bello University (ABU)</div>
                <div>Status: <span className="text-amber-700 font-semibold">Ethics Moderator</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOG */}
      {activeAdminTab === 'audit' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Immutable Administrative Audit Log</h2>
            <p className="text-xs text-slate-500">Every ethics approval, rejection, and study state transition is timestamped</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Actor</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 font-mono text-[11px]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 text-slate-500 tabular-nums">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="p-3 text-slate-700">{log.actorEmail}</td>
                    <td className="p-3 font-semibold text-[#163B65]">{log.action}</td>
                    <td className="p-3 text-slate-600">{log.targetType}</td>
                    <td className="p-3 text-slate-600 font-sans text-xs">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Consequential Actions */}
      {reviewStudy && actionType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4 text-xs">
            <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#163B65]">
                {actionType === 'approve' && 'Confirm Study Approval'}
                {actionType === 'reject' && 'Reject Research Study Request'}
                {actionType === 'changes' && 'Request Changes from Researcher'}
              </h3>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <strong className="text-slate-900 block">{reviewStudy.title}</strong>
              <span className="text-slate-500 block">Investigator: {reviewStudy.researcherName} ({reviewStudy.researcherInstitution})</span>
            </div>

            {actionType === 'approve' && (
              <div className="space-y-2">
                <p className="text-slate-600 leading-relaxed">
                  Approving this study will immediately set its status to <strong>Active</strong> and make it discoverable to eligible Nigerian students on the Browse Studies board.
                </p>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Internal Ethics / Moderator Notes (Optional):</label>
                  <input
                    type="text"
                    placeholder="e.g. Verified HREC ethics code; standard questionnaire format."
                    value={adminNotesInput}
                    onChange={(e) => setAdminNotesInput(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-800"
                  />
                </div>
              </div>
            )}

            {(actionType === 'reject' || actionType === 'changes') && (
              <div className="space-y-2">
                <label className="block font-semibold text-slate-700 mb-1">
                  Reason for {actionType === 'reject' ? 'Rejection' : 'Revision'} (Shared with Researcher) *:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide explicit academic guidance on what fails criteria or needs modification (e.g. Questionnaire URL is restricted to UNILAG domain only; estimated time of 2 mins is unrealistic for 80 questions)..."
                  value={rejectReasonInput}
                  onChange={(e) => setRejectReasonInput(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-800 resize-none outline-none focus:border-[#0F9D8A]"
                />
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setReviewStudy(null);
                  setActionType(null);
                }}
                className="px-3.5 py-2 text-slate-500 hover:text-slate-800 cursor-pointer font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className={`px-4 py-2 text-white font-semibold rounded cursor-pointer shadow-2xs ${
                  actionType === 'approve'
                    ? 'bg-emerald-700 hover:bg-emerald-800'
                    : actionType === 'reject'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-amber-600 hover:bg-amber-700'
                }`}
              >
                {actionType === 'approve' && 'Approve & Activate'}
                {actionType === 'reject' && 'Confirm Rejection'}
                {actionType === 'changes' && 'Send Revision Notice'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
