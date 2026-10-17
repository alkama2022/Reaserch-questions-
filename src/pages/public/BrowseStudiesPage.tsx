import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Study, ResearchCategory } from '../../types';
import { Search, Filter, Clock, MapPin, Gift, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { StudyStatusBadge } from '../../components/ui/StatusBadge';
import { NIGERIAN_UNIVERSITIES } from '../../services/mockData';

const CATEGORIES: ('All' | ResearchCategory)[] = [
  'All',
  'Social Sciences',
  'Health & Medical Sciences',
  'Business & Management',
  'Engineering & Technology',
  'Education & Pedagogy',
  'Agricultural Sciences',
  'Humanities & Arts'
];

export const BrowseStudiesPage: React.FC = () => {
  const { studies, navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | ResearchCategory>('All');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('All');
  const [incentiveOnly, setIncentiveOnly] = useState(false);

  // Filter studies that are Active (or show all in demo if filter toggled)
  const filteredStudies = useMemo(() => {
    return studies.filter((study) => {
      // Must be Active for public participant browsing
      if (study.status !== 'Active' && study.status !== 'Completed') {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = study.title.toLowerCase().includes(query);
        const matchesDesc = study.briefDescription.toLowerCase().includes(query);
        const matchesInst = study.researcherInstitution.toLowerCase().includes(query);
        const matchesPop = study.targetPopulation.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesInst && !matchesPop) {
          return false;
        }
      }

      // Category match
      if (selectedCategory !== 'All' && study.category !== selectedCategory) {
        return false;
      }

      // University match
      if (selectedUniversity !== 'All') {
        const matchesTargetUni = study.targetUniversities.some(u => 
          u.toLowerCase().includes(selectedUniversity.toLowerCase()) || 
          selectedUniversity.toLowerCase().includes(u.toLowerCase())
        );
        const matchesHostUni = study.researcherInstitution.toLowerCase().includes(selectedUniversity.toLowerCase());
        if (!matchesTargetUni && !matchesHostUni) return false;
      }

      // Incentive match
      if (incentiveOnly && study.incentiveType === 'None') {
        return false;
      }

      return true;
    });
  }, [studies, searchQuery, selectedCategory, selectedUniversity, incentiveOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#163B65]">
          Browse Active Research Studies
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Discover research questionnaires conducted by university students, master's candidates, and lecturers across Nigeria. Verify eligibility, read informed consent, and participate voluntarily.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search studies by title, keywords, or university..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded focus:border-[#0F9D8A] focus:ring-1 focus:ring-[#0F9D8A] outline-none text-slate-800"
            />
          </div>

          {/* University Dropdown */}
          <div className="md:col-span-4">
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-700 bg-white"
            >
              <option value="All">All Universities in Nigeria</option>
              {NIGERIAN_UNIVERSITIES.map((uni) => (
                <option key={uni} value={uni}>{uni}</option>
              ))}
            </select>
          </div>

          {/* Incentive Checkbox */}
          <div className="md:col-span-2 flex items-center">
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={incentiveOnly}
                onChange={(e) => setIncentiveOnly(e.target.checked)}
                className="rounded border-slate-300 text-[#0F9D8A] focus:ring-[#0F9D8A] cursor-pointer"
              />
              <span>Incentive Included</span>
            </label>
          </div>
        </div>

        {/* Category Filter Buttons (Functional Segmented Controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium mr-1 shrink-0">Field:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#163B65] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Notice */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-800">{filteredStudies.length}</strong> research {filteredStudies.length === 1 ? 'study' : 'studies'}
        </span>
        <span className="hidden sm:inline">
          Institutional ethical approval verified prior to publication.
        </span>
      </div>

      {/* Studies Grid */}
      {filteredStudies.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-lg border border-slate-200 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h2 className="text-base font-bold text-slate-800">No studies match your current filters</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms, changing the university filter, or selecting "All" categories.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedUniversity('All'); setIncentiveOnly(false); }}
            className="px-4 py-2 text-xs font-semibold text-[#163B65] bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudies.map((study) => (
            <article 
              key={study.id}
              className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-[#0F9D8A] uppercase tracking-wider">
                    {study.category}
                  </span>
                  <StudyStatusBadge status={study.status} />
                </div>

                <h2 className="text-sm font-bold text-[#163B65] leading-snug line-clamp-2">
                  {study.title}
                </h2>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {study.briefDescription}
                </p>

                {/* Target Demographics Summary */}
                <div className="bg-slate-50 p-2.5 rounded border border-slate-100 text-xs space-y-1">
                  <div className="text-slate-500 flex items-start gap-1">
                    <strong className="text-slate-700 shrink-0">Population:</strong>
                    <span className="line-clamp-1">{study.targetPopulation}</span>
                  </div>
                  <div className="text-slate-500 flex items-center gap-1">
                    <strong className="text-slate-700 shrink-0">Host Institution:</strong>
                    <span className="truncate">{study.researcherInstitution}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Metadata and Action */}
              <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>~{study.estimatedMinutes} mins</span>
                  </span>
                  {study.incentiveType !== 'None' ? (
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <Gift className="w-3.5 h-3.5" />
                      <span>{study.incentiveType}</span>
                    </span>
                  ) : (
                    <span className="text-slate-400">Voluntary</span>
                  )}
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Recruitment Progress</span>
                    <span className="tabular-nums font-semibold text-slate-700">
                      {study.completedCount} / {study.targetSampleSize}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#0F9D8A] h-full rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min(100, Math.round((study.completedCount / study.targetSampleSize) * 100))}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('study-details', study.id)}
                  className="w-full py-2 bg-[#163B65] hover:bg-[#112d4e] text-white text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Review Requirements & Participate</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
