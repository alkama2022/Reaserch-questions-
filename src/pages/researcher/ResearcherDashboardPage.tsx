import React from 'react';
import { useApp } from '../../context/AppContext';
import { ResearcherSidebar } from './ResearcherSidebar';
import { 
  PlusCircle, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  BarChart3, 
  Calendar,
  FileSpreadsheet
} from 'lucide-react';
import { StudyStatusBadge } from '../../components/ui/StatusBadge';

export const ResearcherDashboardPage: React.FC = () => {
  const { currentUser, studies, navigateTo, notifications, setSelectedStudyId } = useApp();

  // Filter studies belonging to this researcher (or demo studies)
  const myStudies = studies.filter(s => s.researcherId === currentUser?.id || currentUser?.role === 'admin' || s.researcherId === 'usr-res-001');

  const totalStudies = myStudies.length;
  const activeStudies = myStudies.filter(s => s.status === 'Active').length;
  const completedStudies = myStudies.filter(s => s.status === 'Completed').length;
  const pendingStudies = myStudies.filter(s => s.status === 'Pending Review').length;
  
  const totalCompletedResponses = myStudies.reduce((acc, curr) => acc + curr.completedCount, 0);
  const totalTargetSample = myStudies.reduce((acc, curr) => acc + curr.targetSampleSize, 0);

  return (
    <div className="flex min-h-[calc(100vh-100px)]">
      <ResearcherSidebar activeTab="overview" />

      {/* Main Workspace Content */}
      <main className="flex-1 bg-[#F7F9FC] p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
        
        {/* Breadcrumb Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-1">
              <span>Researcher Console</span>
              <span>/</span>
              <span className="text-slate-800 font-medium">Overview</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#163B65]">
              Welcome back, {currentUser?.fullName || 'Researcher'}
            </h1>
            <p className="text-xs text-slate-500">
              {currentUser?.institution || 'Nigerian Higher Education'} · {currentUser?.faculty || 'Department of Economics'}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigateTo('researcher-settings')}
              className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>Manage Profile & Bio</span>
            </button>
            <button
              onClick={() => navigateTo('researcher-create')}
              className="px-4 py-2 bg-[#163B65] hover:bg-[#112d4e] text-white text-xs font-semibold rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5 text-teal-300" />
              <span>Create New Study</span>
            </button>
          </div>
        </div>

        {/* Overview Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">Total Research Studies</span>
            <div className="text-2xl font-bold text-slate-900 tabular-nums">{totalStudies}</div>
            <span className="text-[11px] text-slate-400 block">{pendingStudies} awaiting ethics review</span>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">Active Recruits</span>
            <div className="text-2xl font-bold text-emerald-700 tabular-nums">{activeStudies}</div>
            <span className="text-[11px] text-emerald-600 block">Open for student responses</span>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">Responses Collected</span>
            <div className="text-2xl font-bold text-[#163B65] tabular-nums">{totalCompletedResponses}</div>
            <span className="text-[11px] text-slate-500 block tabular-nums">Of {totalTargetSample} total target quota</span>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">Completed Fieldwork</span>
            <div className="text-2xl font-bold text-blue-700 tabular-nums">{completedStudies}</div>
            <span className="text-[11px] text-blue-600 block">Ready for data analysis</span>
          </div>
        </div>

        {/* Studies Recruitment Progress Grid */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Your Studies & Recruitment Progress</h2>
              <p className="text-xs text-slate-500">Live participant counts and survey completion metrics</p>
            </div>
            <button
              onClick={() => navigateTo('researcher-studies')}
              className="text-xs font-semibold text-[#0F9D8A] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Manage Studies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {myStudies.map((study) => {
              const progressPct = Math.min(100, Math.round((study.completedCount / study.targetSampleSize) * 100));
              return (
                <div key={study.id} className="p-4 rounded border border-slate-200 hover:border-slate-300 transition-colors space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#0F9D8A]">{study.category}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-500">{study.surveyTool}</span>
                      </div>
                      <h3 className="text-sm font-bold text-[#163B65] hover:underline cursor-pointer" onClick={() => { setSelectedStudyId(study.id); navigateTo('researcher-tracking'); }}>
                        {study.title}
                      </h3>
                    </div>
                    <StudyStatusBadge status={study.status} />
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Recruitment Quota: <strong className="text-slate-800 tabular-nums">{study.completedCount} / {study.targetSampleSize}</strong> completed</span>
                      <span className="font-semibold text-slate-700 tabular-nums">{progressPct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          progressPct >= 100 ? 'bg-blue-600' : progressPct > 60 ? 'bg-[#0F9D8A]' : 'bg-[#163B65]'
                        }`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Sub-metrics & Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-4 text-slate-500">
                      <span className="tabular-nums">
                        Accepted: <strong className="text-emerald-700">{study.acceptedCount}</strong>
                      </span>
                      <span className="tabular-nums">
                        Excluded: <strong className="text-red-600">{study.excludedCount}</strong>
                      </span>
                      <span className="tabular-nums">
                        Pending Audit: <strong className="text-amber-600">{study.pendingReviewCount}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setSelectedStudyId(study.id); navigateTo('researcher-tracking'); }}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium transition-colors cursor-pointer"
                      >
                        Recruitment Audit
                      </button>
                      <button
                        onClick={() => { setSelectedStudyId(study.id); navigateTo('researcher-reports'); }}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium transition-colors cursor-pointer"
                      >
                        Export Report
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Split: Deadlines & System Notifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#163B65]" />
                <span>Fieldwork Deadlines</span>
              </span>
            </div>
            <div className="space-y-2 text-xs">
              {myStudies.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-100">
                  <div className="truncate max-w-[220px]">
                    <span className="font-medium text-slate-800 block truncate">{s.title}</span>
                    <span className="text-[11px] text-slate-400">Target: {s.targetSampleSize} respondents</span>
                  </div>
                  <span className="tabular-nums font-semibold text-slate-700 text-xs shrink-0">
                    {s.recruitmentDeadline}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Study Activity / Notifications */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Recent Recruitment Activity
              </span>
            </div>
            <div className="space-y-2 text-xs">
              {notifications.slice(0, 3).map((n) => (
                <div key={n.id} className="p-2.5 rounded bg-slate-50 border border-slate-100 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{n.title}</span>
                    <span className="text-[10px] text-slate-400 tabular-nums">Recent</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-snug">{n.message}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};
