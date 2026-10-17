import React from 'react';
import { useApp } from '../../context/AppContext';
import { ResearcherSidebar } from './ResearcherSidebar';
import { UserProfileManagement } from '../../components/profile/UserProfileManagement';

export const ResearcherSettingsPage: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-100px)]">
      <ResearcherSidebar activeTab="settings" />

      <main className="flex-1 bg-[#F7F9FC] p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto max-w-4xl">
        
        {/* Header Breadcrumb */}
        <div className="border-b border-slate-200 pb-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-1">
            <span>Researcher Console</span>
            <span>/</span>
            <span className="text-slate-800 font-medium">User Profile & Institutional Affiliation</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#163B65]">
            Researcher Profile Management
          </h1>
          <p className="text-xs text-slate-500">
            Update your academic biography, university and departmental affiliation, and recruitment notification preferences.
          </p>
        </div>

        {/* User Profile Management Component */}
        <UserProfileManagement />

      </main>
    </div>
  );
};
