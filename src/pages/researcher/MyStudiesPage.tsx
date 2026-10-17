import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ResearcherSidebar } from './ResearcherSidebar';
import { Study, StudyStatus } from '../../types';
import { 
  Search, 
  Filter, 
  PlusCircle, 
  BarChart3, 
  Eye, 
  PauseCircle, 
  PlayCircle, 
  Trash2, 
  Send, 
  FileText, 
  Clock, 
  CheckCircle2, 
  LayoutGrid, 
  List,
  BookOpen
} from 'lucide-react';
import { StudyStatusBadge } from '../../components/ui/StatusBadge';

const STATUS_TABS: ('All' | StudyStatus)[] = [
  'All',
  'Draft',
  'Pending Review',
  'Active',
  'Paused',
  'Completed',
  'Rejected'
];

export const MyStudiesPage: React.FC = () => {
  const { 
    studies, 
    currentUser, 
    navigateTo, 
    setSelectedStudyId, 
    submitStudyForReview, 
    adminPauseStudy, 
    adminResumeStudy, 
    deleteStudyDraft 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | StudyStatus>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'quota' | 'deadline'>('newest');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  // Filter studies belonging to this user
  const userStudies = useMemo(() => {
    return studies.filter((study) => {
      // Allow researcher or admin to view
      const isOwner = study.researcherId === currentUser?.id || currentUser?.role === 'admin' || study.researcherId === 'usr-res-001';
      if (!isOwner) return false;

      // Status tab
      if (activeTab !== 'All' && study.status !== activeTab) {
        return false;
      }

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!study.title.toLowerCase().includes(q) && !study.category.toLowerCase().includes(q)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'quota') return b.targetSampleSize - a.targetSampleSize;
      if (sortBy === 'deadline') return new Date(a.recruitmentDeadline).getTime() - new Date(b.recruitmentDeadline).getTime();
      return 0;
    });
  }, [studies, currentUser, activeTab, searchQuery, sortBy]);

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-100px)]">
      <ResearcherSidebar activeTab="studies" />

      <main className="flex-1 bg-[#F7F9FC] p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-1">
              <span>Researcher Console</span>
              <span>/</span>
              <span className="text-slate-800 font-medium">My Studies</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#163B65]">
              Manage Research Studies
            </h1>
            <p className="text-xs text-slate-500">
              Review submission states, recruitment quotas, and quality audit trails.
            </p>
          </div>

          <button
            onClick={() => navigateTo('researcher-create')}
            className="px-4 py-2 bg-[#163B65] hover:bg-[#112d4e] text-white text-xs font-semibold rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5 text-teal-300" />
            <span>Create New Study</span>
          </button>
        </div>

        {/* Search, Filter Tabs & Sort Toolbar */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search your studies by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
              />
            </div>

            {/* Sort & View Mode */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-2.5 py-1.5 border border-slate-300 rounded text-slate-700 bg-white"
              >
                <option value="newest">Recently Created</option>
                <option value="quota">Highest Sample Size</option>
                <option value="deadline">Upcoming Deadline</option>
              </select>

              <div className="flex items-center border border-slate-300 rounded overflow-hidden ml-2">
                <button
                  onClick={() => setViewMode('card')}
                  className={`p-1.5 cursor-pointer ${viewMode === 'card' ? 'bg-[#163B65] text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 cursor-pointer ${viewMode === 'table' ? 'bg-[#163B65] text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                  aria-label="Table view"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Status Tabs (Segmented Buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-100 text-xs">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#163B65] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Study List / Grid */}
        {userStudies.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-lg border border-slate-200 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No studies found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You do not have any studies matching the selected filter criteria.
            </p>
            <button
              onClick={() => { setActiveTab('All'); setSearchQuery(''); }}
              className="px-4 py-2 text-xs font-semibold bg-slate-100 text-slate-700 rounded hover:bg-slate-200 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'card' ? (
          /* Cards View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userStudies.map((study) => {
              const progressPct = Math.min(100, Math.round((study.completedCount / study.targetSampleSize) * 100));
              return (
                <div key={study.id} className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-[#0F9D8A] uppercase tracking-wider">
                        {study.category}
                      </span>
                      <StudyStatusBadge status={study.status} />
                    </div>

                    <h2 className="text-sm font-bold text-[#163B65] leading-snug">
                      {study.title}
                    </h2>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {study.briefDescription}
                    </p>

                    {/* Rejection / Modification Notice */}
                    {study.rejectionReason && (
                      <div className="p-2.5 bg-red-50 border border-red-200 rounded text-xs text-red-700 space-y-0.5">
                        <strong className="block font-semibold">Reviewer Revision Feedback:</strong>
                        <p>{study.rejectionReason}</p>
                      </div>
                    )}

                    {/* Progress Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Recruitment Progress</span>
                        <span className="tabular-nums font-semibold text-slate-700">
                          {study.completedCount} / {study.targetSampleSize} ({progressPct}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#0F9D8A] h-full rounded-full transition-all duration-300" 
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contextual Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <span className="text-[11px] text-slate-400 tabular-nums">
                      Deadline: {study.recruitmentDeadline}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {study.status === 'Draft' && (
                        <>
                          <button
                            onClick={() => deleteStudyDraft(study.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded cursor-pointer"
                            title="Delete Draft"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => submitStudyForReview(study.id)}
                            className="px-3 py-1.5 bg-[#0F9D8A] hover:bg-[#0c8070] text-white rounded font-medium cursor-pointer shadow-2xs flex items-center gap-1"
                          >
                            <Send className="w-3 h-3" />
                            <span>Submit for Review</span>
                          </button>
                        </>
                      )}

                      {study.status === 'Pending Review' && (
                        <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                          Queued for Ethics Clearance
                        </span>
                      )}

                      {study.status === 'Active' && (
                        <>
                          <button
                            onClick={() => adminPauseStudy(study.id)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium cursor-pointer"
                          >
                            Pause
                          </button>
                          <button
                            onClick={() => { setSelectedStudyId(study.id); navigateTo('researcher-tracking'); }}
                            className="px-3 py-1 bg-[#163B65] hover:bg-[#112d4e] text-white rounded font-medium cursor-pointer shadow-2xs flex items-center gap-1"
                          >
                            <BarChart3 className="w-3 h-3 text-teal-300" />
                            <span>Track & Audit</span>
                          </button>
                        </>
                      )}

                      {study.status === 'Paused' && (
                        <button
                          onClick={() => adminResumeStudy(study.id)}
                          className="px-3 py-1 bg-emerald-700 text-white rounded font-medium cursor-pointer flex items-center gap-1"
                        >
                          <PlayCircle className="w-3 h-3" />
                          <span>Resume</span>
                        </button>
                      )}

                      {study.status === 'Completed' && (
                        <button
                          onClick={() => { setSelectedStudyId(study.id); navigateTo('researcher-reports'); }}
                          className="px-3 py-1 bg-[#163B65] text-white rounded font-medium cursor-pointer flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3 text-teal-300" />
                          <span>View Report</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="p-3">Study Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Quota</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {userStudies.map((study) => (
                  <tr key={study.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-semibold text-[#163B65] max-w-xs truncate">
                      {study.title}
                    </td>
                    <td className="p-3 text-slate-500">{study.category}</td>
                    <td className="p-3">
                      <StudyStatusBadge status={study.status} />
                    </td>
                    <td className="p-3 text-right tabular-nums">
                      <strong>{study.completedCount}</strong> / {study.targetSampleSize}
                    </td>
                    <td className="p-3 text-slate-500 tabular-nums">{study.recruitmentDeadline}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => { setSelectedStudyId(study.id); navigateTo('researcher-tracking'); }}
                        className="text-[#0F9D8A] hover:underline font-semibold"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </main>
    </div>
  );
};
