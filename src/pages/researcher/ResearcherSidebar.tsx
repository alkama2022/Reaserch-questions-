import React, { useState } from 'react';
import { useApp, NavigationPage } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  PlusCircle, 
  BarChart3, 
  FileText, 
  Bell, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  LogOut,
  ExternalLink,
  User,
  Menu,
  X
} from 'lucide-react';

interface Props {
  activeTab: 'overview' | 'studies' | 'create' | 'tracking' | 'reports' | 'settings';
}

export const ResearcherSidebar: React.FC<Props> = ({ activeTab }) => {
  const { currentUser, navigateTo, notifications, switchRole } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, page: 'researcher-overview' as NavigationPage },
    { id: 'studies', label: 'My Studies', icon: BookOpen, page: 'researcher-studies' as NavigationPage },
    { id: 'create', label: 'Create Study', icon: PlusCircle, page: 'researcher-create' as NavigationPage },
    { id: 'tracking', label: 'Recruitment Tracking', icon: BarChart3, page: 'researcher-tracking' as NavigationPage },
    { id: 'reports', label: 'Reports & Exports', icon: FileText, page: 'researcher-reports' as NavigationPage },
    { id: 'settings', label: 'Profile & Settings', icon: User, page: 'researcher-settings' as NavigationPage },
  ];

  return (
    <>
      {/* MOBILE WORKSPACE TOP NAVIGATION BAR (< lg) */}
      <div className="lg:hidden w-full bg-white border-b border-slate-200 px-3 py-2.5 flex items-center justify-between sticky top-[65px] z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="min-h-[40px] min-w-[40px] p-2 rounded text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
            aria-label="Toggle workspace navigation"
          >
            {mobileDrawerOpen ? <X className="w-5 h-5 text-slate-800" /> : <Menu className="w-5 h-5 text-slate-800" />}
          </button>
          <div>
            <span className="text-[10px] font-bold text-[#0F9D8A] uppercase tracking-wider block leading-none">
              Researcher
            </span>
            <span className="text-xs font-bold text-[#163B65] capitalize">
              {navItems.find(i => i.id === activeTab)?.label || 'Console'}
            </span>
          </div>
        </div>

        {/* Quick action: Create Study */}
        <button
          onClick={() => navigateTo('researcher-create')}
          className="min-h-[36px] px-3 py-1.5 bg-[#163B65] text-white text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <PlusCircle className="w-3.5 h-3.5 text-teal-300" />
          <span>New Study</span>
        </button>
      </div>

      {/* MOBILE WORKSPACE DRAWER OVERLAY */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs flex">
          <div className="w-72 bg-white h-full shadow-2xl flex flex-col justify-between p-4 space-y-4 animate-in slide-in-from-left duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-[#163B65]">Researcher Workspace</span>
                  <span className="text-[11px] text-slate-500 block truncate max-w-[180px]">
                    {currentUser?.institution || 'Nigerian University'}
                  </span>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigateTo(item.page);
                        setMobileDrawerOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-medium min-h-[44px] cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-[#163B65] text-white font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-teal-300' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Bottom */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              {currentUser && (
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-900 block truncate">{currentUser.fullName}</span>
                  <span className="text-[11px] text-slate-500 block truncate">{currentUser.email}</span>
                </div>
              )}
              <button
                onClick={() => { navigateTo('browse-studies'); setMobileDrawerOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded min-h-[40px]"
              >
                <ExternalLink className="w-4 h-4 text-slate-400" />
                <span>View Public Studies</span>
              </button>
              <button
                onClick={() => { switchRole('guest'); setMobileDrawerOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded min-h-[40px]"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          <div className="flex-1" onClick={() => setMobileDrawerOpen(false)} />
        </div>
      )}

      {/* DESKTOP SIDEBAR (>= lg) */}
      <aside 
        className={`hidden lg:flex bg-white border-r border-slate-200 transition-all duration-200 flex-col justify-between shrink-0 ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        {/* Top Section */}
        <div className="p-3 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            {!collapsed && (
              <div className="px-1">
                <span className="text-[11px] font-semibold text-[#163B65] uppercase tracking-wider block">
                  Researcher Workspace
                </span>
                <span className="text-xs text-slate-500 truncate block max-w-[160px]">
                  {currentUser?.institution || 'Nigerian University'}
                </span>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer ml-auto"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.page)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#163B65] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  } ${collapsed ? 'justify-center px-0' : ''}`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-teal-300' : 'text-slate-400'}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Area */}
        <div className="p-3 border-t border-slate-100 space-y-2">
          {!collapsed && currentUser && (
            <div className="px-2 py-1.5 bg-slate-50 rounded border border-slate-200/80 text-xs">
              <span className="font-semibold text-slate-900 block truncate">{currentUser.fullName}</span>
              <span className="text-[11px] text-slate-500 block truncate">{currentUser.email}</span>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <button
              onClick={() => navigateTo('browse-studies')}
              title="Public Directory"
              className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded transition-colors cursor-pointer ${
                collapsed ? 'justify-center px-0' : ''
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              {!collapsed && <span>View Public Studies</span>}
            </button>
            <button
              onClick={() => switchRole('guest')}
              title="Sign Out"
              className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer ${
                collapsed ? 'justify-center px-0' : ''
              }`}
            >
              <LogOut className="w-3.5 h-3.5 shrink-0" />
              {!collapsed && <span>Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
