import React from 'react';
import { useApp } from '../../context/AppContext';
import { StudyApplication } from '../../types';
import { 
  Users, 
  CheckCircle2, 
  ExternalLink, 
  ArrowLeft, 
  Clock, 
  XCircle, 
  ShieldCheck, 
  Copy, 
  Check, 
  Trash2 
} from 'lucide-react';

export const MyApplicationsPage: React.FC = () => {
  const { applications, currentUser, studies, navigateTo, setSelectedStudyId, withdrawParticipation, showToast } = useApp();

  const myApplications = applications.filter(
    (app) => app.participantId === currentUser?.id || app.participantId === 'usr-part-002'
  );

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast('Code Copied', `Token ${code} copied to clipboard.`, 'info');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <button
            onClick={() => navigateTo('participant-overview')}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Participant Portal</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-[#163B65]">
            My Research Applications & Participation History
          </h1>
          <p className="text-xs text-slate-500">
            Records of studies you have screened for, consented to, and completed.
          </p>
        </div>

        <button
          onClick={() => navigateTo('browse-studies')}
          className="px-4 py-2 bg-[#0F9D8A] hover:bg-[#0c8070] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
        >
          Browse Open Studies
        </button>
      </div>

      {myApplications.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-lg border border-slate-200 space-y-3">
          <Users className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No participation records found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You have not applied for or participated in any studies yet.
          </p>
          <button
            onClick={() => navigateTo('browse-studies')}
            className="px-4 py-2 bg-[#163B65] text-white text-xs font-semibold rounded cursor-pointer"
          >
            Explore Studies
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {myApplications.map((app) => {
            const study = studies.find(s => s.id === app.studyId);
            return (
              <div 
                key={app.id} 
                className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-[#0F9D8A] uppercase tracking-wider block">
                      {study?.category || 'Academic Study'}
                    </span>
                    <h2 className="text-sm font-bold text-[#163B65] mt-0.5">
                      {study?.title || 'Research Study'}
                    </h2>
                    <span className="text-xs text-slate-500">
                      Investigator: {study?.researcherName || 'Faculty Researcher'} · {study?.researcherInstitution || 'Nigerian University'}
                    </span>
                  </div>

                  <div className="shrink-0">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold border ${
                      app.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : app.status === 'Withdrawn'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-blue-50 text-blue-800 border-blue-200'
                    }`}>
                      {app.status === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Clock className="w-3.5 h-3.5" />}
                      <span>{app.status}</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded border border-slate-100 text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Screening Date</span>
                    <span className="tabular-nums font-medium text-slate-800">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Informed Consent</span>
                    <span className="tabular-nums font-medium text-slate-800">
                      {app.consentAgreedAt ? `Recorded (${new Date(app.consentAgreedAt).toLocaleDateString()})` : 'Pending'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Completion Code</span>
                    {app.completionCode ? (
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {app.completionCode}
                        </span>
                        <button
                          onClick={() => copyCode(app.completionCode!)}
                          className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                          title="Copy Code"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">None generated</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { setSelectedStudyId(app.studyId); navigateTo('study-details'); }}
                      className="text-[#163B65] font-semibold hover:underline cursor-pointer"
                    >
                      View Full Study Brief
                    </button>
                    {study && app.status !== 'Completed' && app.status !== 'Withdrawn' && (
                      <a
                        href={study.questionnaireUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0F9D8A] font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>Open {study.surveyTool} Questionnaire</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {app.status !== 'Completed' && app.status !== 'Withdrawn' && (
                    <button
                      onClick={() => withdrawParticipation(app.studyId)}
                      className="text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Withdraw Participation</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
