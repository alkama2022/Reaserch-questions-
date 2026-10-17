import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';
import { DemoBanner } from './components/ui/DemoBanner';
import { ToastContainer } from './components/ui/ToastContainer';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { ForResearchersPage } from './pages/public/ForResearchersPage';
import { ForParticipantsPage } from './pages/public/ForParticipantsPage';
import { BrowseStudiesPage } from './pages/public/BrowseStudiesPage';
import { StudyDetailsPage } from './pages/public/StudyDetailsPage';
import { AboutUsPage } from './pages/public/AboutUsPage';
import { ContactPage } from './pages/public/ContactPage';
import { PrivacyPolicyPage } from './pages/public/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/public/TermsOfServicePage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';

// Researcher Pages
import { ResearcherDashboardPage } from './pages/researcher/ResearcherDashboardPage';
import { MyStudiesPage } from './pages/researcher/MyStudiesPage';
import { CreateStudyPage } from './pages/researcher/CreateStudyPage';
import { RecruitmentTrackingPage } from './pages/researcher/RecruitmentTrackingPage';
import { ResearcherReportsPage } from './pages/researcher/ResearcherReportsPage';
import { ResearcherSettingsPage } from './pages/researcher/ResearcherSettingsPage';

// Participant Pages
import { ParticipantDashboardPage } from './pages/participant/ParticipantDashboardPage';
import { MyApplicationsPage } from './pages/participant/MyApplicationsPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const isResearcherArea = currentPage.startsWith('researcher-');
  const isAdminArea = currentPage.startsWith('admin-');

  const renderCurrentView = () => {
    switch (currentPage) {
      // Public Pages
      case 'home':
        return <HomePage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'for-researchers':
        return <ForResearchersPage />;
      case 'for-participants':
        return <ForParticipantsPage />;
      case 'browse-studies':
        return <BrowseStudiesPage />;
      case 'study-details':
        return <StudyDetailsPage />;
      case 'about':
        return <AboutUsPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsOfServicePage />;

      // Authentication Pages
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'forgot-password':
        return <ForgotPasswordPage />;
      case 'reset-password':
        return <ResetPasswordPage />;

      // Researcher Pages
      case 'researcher-overview':
        return <ResearcherDashboardPage />;
      case 'researcher-studies':
        return <MyStudiesPage />;
      case 'researcher-create':
        return <CreateStudyPage />;
      case 'researcher-tracking':
        return <RecruitmentTrackingPage />;
      case 'researcher-reports':
        return <ResearcherReportsPage />;
      case 'researcher-settings':
        return <ResearcherSettingsPage />;

      // Participant Pages
      case 'participant-overview':
        return <ParticipantDashboardPage />;
      case 'participant-applications':
        return <MyApplicationsPage />;

      // Admin Pages
      case 'admin-overview':
      case 'admin-studies':
      case 'admin-users':
      case 'admin-audit':
        return <AdminDashboardPage />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#172B4D]">
      {/* Top Demo Disclosure Banner & Role Switcher */}
      <DemoBanner />

      {/* Strict 3-Zone Top Bar Navigation */}
      <Navbar />

      {/* Main Dynamic Viewport */}
      <div className="flex-1">
        {renderCurrentView()}
      </div>

      {/* Footer on public, participant, and auth pages */}
      {!isResearcherArea && !isAdminArea && <Footer />}

      {/* Global Toast Feedback */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
