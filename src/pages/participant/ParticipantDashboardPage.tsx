import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Gift, 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  ExternalLink 
} from 'lucide-react';
import { StudyStatusBadge } from '../../components/ui/StatusBadge';

export const ParticipantDashboardPage: React.FC = () => {
  const { currentUser, studies, applications, navigateTo, setSelectedStudyId } = useApp();

  const myApplications = applications.filter(
    (app) => app.participantId === currentUser?.id || app.participantId === 'usr-part-002'
  );

  const completedCount = myApplications.filter(a => a.status === 'Completed').length;
  const inProgressCount = myApplications.filter(a => a.status !== 'Completed' && a.status !== 'Withdrawn').length;

  // Active studies matching student
  const activeStudies = studies.filter(s => s.status === 'Active');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F9D8A]">
            <Users className="w-4 h-4" />
            <span>Student Participant Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#163B65]">
            Hello, {currentUser?.fullName || 'Student Participant'}
          </h1>
          <p className="text-xs text-slate-500">
            {currentUser?.institution || 'Nigerian Higher Education'} · {currentUser?.department || 'Department of Computer Science'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigateTo('browse-studies')}
            className="px-5 py-2.5 bg-[#0F9D8A] hover:bg-[#0c8070] text-white text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Discover New Studies</span>
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Studies Completed</span>
          <div className="text-2xl font-bold text-emerald-700 tabular-nums">{completedCount}</div>
          <span className="text-[11px] text-slate-400">Verified academic contributions</span>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Screenings in Progress</span>
          <div className="text-2xl font-bold text-[#163B65] tabular-nums">{inProgressCount}</div>
          <span className="text-[11px] text-slate-400">Awaiting questionnaire response</span>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Currently Recruiting</span>
          <div className="text-2xl font-bold text-[#0F9D8A] tabular-nums">{activeStudies.length}</div>
          <span className="text-[11px] text-slate-400">Open across Nigerian universities</span>
        </div>
      </div>

      {/* Recent Applications Snapshot */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Your Study Applications & Completion Proofs</h2>
            <p className="text-xs text-slate-500">Track consent records and verify completion codes</p>
          </div>
          <button
            onClick={() => navigateTo('participant-applications')}
            className="text-xs font-semibold text-[#0F9D8A] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Records</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {myApplications.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400 space-y-2">
            <p>You have not applied to participate in any research studies yet.</p>
            <button
              onClick={() => navigateTo('browse-studies')}
              className="text-[#0F9D8A] font-semibold hover:underline cursor-pointer"
            >
              Browse studies open to your university
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {myApplications.map((app) => {
              const matchedStudy = studies.find(s => s.id === app.studyId);
              return (
                <div key={app.id} className="p-4 rounded border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="font-bold text-[#163B65] text-sm block">
                      {matchedStudy?.title || 'Academic Research Study'}
                    </span>
                    <div className="text-slate-500 flex items-center gap-3 text-[11px]">
                      <span>Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                      <span>·</span>
                      <span>{matchedStudy?.researcherInstitution || 'Nigerian Institution'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {app.completionCode ? (
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Verification Token</span>
                        <span className="font-mono font-bold text-emerald-800 text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {app.completionCode}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                        {app.status}
                      </span>
                    )}

                    <button
                      onClick={() => { setSelectedStudyId(app.studyId); navigateTo('study-details'); }}
                      className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded hover:bg-slate-50 font-medium cursor-pointer"
                    >
                      Study Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recommended Open Studies */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#163B65]">Recommended Studies for You</h2>
            <p className="text-xs text-slate-500">Academic questionnaires currently seeking student perspectives</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeStudies.slice(0, 4).map((study) => (
            <div key={study.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0F9D8A]">{study.category}</span>
                  <span className="text-slate-400 tabular-nums flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>~{study.estimatedMinutes} mins</span>
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                  {study.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {study.briefDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 truncate max-w-[180px]">
                  {study.researcherInstitution}
                </span>
                <button
                  onClick={() => navigateTo('study-details', study.id)}
                  className="px-3 py-1.5 bg-[#163B65] text-white font-semibold rounded hover:bg-[#112d4e] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Participate</span>
                  <ArrowRight className="w-3 h-3 text-teal-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
