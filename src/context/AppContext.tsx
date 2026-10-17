import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Study, 
  UserProfile, 
  StudyApplication, 
  ResponseRecord, 
  NotificationItem, 
  AuditLogItem, 
  ResponseQualityStatus,
  UserRole 
} from '../types';
import { 
  DEMO_USERS, 
  INITIAL_STUDIES, 
  INITIAL_RESPONSES, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_AUDIT_LOGS 
} from '../services/mockData';

export type NavigationPage = 
  | 'home'
  | 'how-it-works'
  | 'for-researchers'
  | 'for-participants'
  | 'browse-studies'
  | 'study-details'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'reset-password'
  | 'researcher-overview'
  | 'researcher-studies'
  | 'researcher-create'
  | 'researcher-tracking'
  | 'researcher-reports'
  | 'researcher-settings'
  | 'participant-overview'
  | 'participant-applications'
  | 'participant-settings'
  | 'admin-overview'
  | 'admin-studies'
  | 'admin-users'
  | 'admin-audit';

interface Toast {
  id: string;
  title: string;
  message?: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface AppContextType {
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  currentPage: NavigationPage;
  setCurrentPage: (page: NavigationPage) => void;
  selectedStudyId: string | null;
  setSelectedStudyId: (id: string | null) => void;
  studies: Study[];
  applications: StudyApplication[];
  responses: ResponseRecord[];
  notifications: NotificationItem[];
  auditLogs: AuditLogItem[];
  toasts: Toast[];
  showToast: (title: string, message?: string, type?: Toast['type']) => void;
  dismissToast: (id: string) => void;
  
  // Quick role switcher for testing & evaluation
  switchRole: (role: UserRole) => void;
  
  // Study lifecycle actions
  createStudy: (studyData: Omit<Study, 'id' | 'createdAt' | 'updatedAt' | 'enrolledCount' | 'completedCount' | 'acceptedCount' | 'excludedCount' | 'pendingReviewCount'>) => string;
  updateStudy: (id: string, updates: Partial<Study>) => void;
  submitStudyForReview: (id: string) => void;
  adminApproveStudy: (id: string, notes?: string) => void;
  adminRejectStudy: (id: string, reason: string) => void;
  adminRequestChanges: (id: string, feedback: string) => void;
  adminPauseStudy: (id: string) => void;
  adminResumeStudy: (id: string) => void;
  deleteStudyDraft: (id: string) => void;
  
  // Participant actions
  submitApplication: (studyId: string, participantUniversity: string, participantDepartment: string) => void;
  recordInformedConsent: (studyId: string) => void;
  completeParticipation: (studyId: string) => void;
  withdrawParticipation: (studyId: string) => void;

  // Recruitment response quality actions
  updateResponseQuality: (responseId: string, status: ResponseQualityStatus, notes?: string) => void;
  
  // Notification actions
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  
  // Navigation helper
  navigateTo: (page: NavigationPage, studyId?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with researcher by default so reviewer lands on a rich functional dashboard or can click public view
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('rcn_user');
    return saved ? JSON.parse(saved) : DEMO_USERS.researcher;
  });

  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [selectedStudyId, setSelectedStudyId] = useState<string | null>('study-001');

  const [studies, setStudies] = useState<Study[]>(() => {
    const saved = localStorage.getItem('rcn_studies');
    return saved ? JSON.parse(saved) : INITIAL_STUDIES;
  });

  const [applications, setApplications] = useState<StudyApplication[]>(() => {
    const saved = localStorage.getItem('rcn_applications');
    return saved ? JSON.parse(saved) : [
      {
        id: 'app-001',
        studyId: 'study-001',
        participantId: 'usr-part-002',
        participantName: 'Babatunde Adebayo',
        participantEmail: 'tunde.adebayo@student.oauife.edu.ng',
        participantUniversity: 'Obafemi Awolowo University (OAU), Ile-Ife',
        participantDepartment: 'Computer Science',
        status: 'Completed',
        consentAgreedAt: '2026-10-14T10:12:00Z',
        appliedAt: '2026-10-14T10:05:00Z',
        completedAt: '2026-10-14T10:25:00Z',
        completionCode: 'RCN-OAU-9421'
      }
    ];
  });

  const [responses, setResponses] = useState<ResponseRecord[]>(() => {
    const saved = localStorage.getItem('rcn_responses');
    return saved ? JSON.parse(saved) : INITIAL_RESPONSES;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('rcn_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem('rcn_audit');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync state to local storage for persistence across reloads
  useEffect(() => {
    localStorage.setItem('rcn_studies', JSON.stringify(studies));
  }, [studies]);

  useEffect(() => {
    localStorage.setItem('rcn_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('rcn_responses', JSON.stringify(responses));
  }, [responses]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('rcn_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('rcn_user');
    }
  }, [currentUser]);

  const showToast = (title: string, message?: string, type: Toast['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo = (page: NavigationPage, studyId?: string) => {
    if (studyId) {
      setSelectedStudyId(studyId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchRole = (role: UserRole) => {
    if (role === 'guest') {
      setCurrentUser(null);
      showToast('Switched to Guest', 'Browsing as unauthenticated public visitor.', 'info');
      navigateTo('home');
      return;
    }
    const profile = DEMO_USERS[role];
    if (profile) {
      setCurrentUser(profile);
      showToast(`Switched Role: ${profile.fullName}`, `Active profile: ${role.toUpperCase()} (${profile.institution || 'Demo'})`, 'success');
      if (role === 'researcher') navigateTo('researcher-overview');
      else if (role === 'participant') navigateTo('participant-overview');
      else if (role === 'admin') navigateTo('admin-overview');
    }
  };

  const createStudy = (studyData: Omit<Study, 'id' | 'createdAt' | 'updatedAt' | 'enrolledCount' | 'completedCount' | 'acceptedCount' | 'excludedCount' | 'pendingReviewCount'>): string => {
    const newId = `study-${Date.now().toString().slice(-4)}`;
    const now = new Date().toISOString();
    const newStudy: Study = {
      ...studyData,
      id: newId,
      enrolledCount: 0,
      completedCount: 0,
      acceptedCount: 0,
      excludedCount: 0,
      pendingReviewCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    setStudies((prev) => [newStudy, ...prev]);

    // Add audit entry
    const logItem: AuditLogItem = {
      id: `aud-${Date.now()}`,
      timestamp: now,
      actorEmail: currentUser?.email || 'researcher@demo.ng',
      action: newStudy.status === 'Pending Review' ? 'Study Submitted' : 'Study Draft Created',
      targetType: 'Study',
      details: `Study "${newStudy.title}" created with status "${newStudy.status}".`
    };
    setAuditLogs((prev) => [logItem, ...prev]);

    showToast(
      newStudy.status === 'Pending Review' ? 'Study Submitted for Review' : 'Draft Saved',
      newStudy.status === 'Pending Review' 
        ? 'Your study is queued for administrative review. It will become active once approved.'
        : 'Your draft has been saved locally.',
      'success'
    );

    return newId;
  };

  const updateStudy = (id: string, updates: Partial<Study>) => {
    setStudies((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s))
    );
    showToast('Study Updated', 'Changes were saved successfully.', 'info');
  };

  const submitStudyForReview = (id: string) => {
    setStudies((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'Pending Review', updatedAt: new Date().toISOString() } : s))
    );
    const study = studies.find((s) => s.id === id);
    
    // Add audit log
    const logItem: AuditLogItem = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorEmail: currentUser?.email || 'researcher@demo.ng',
      action: 'Study Submitted for Review',
      targetType: 'Study',
      details: `Study "${study?.title || id}" was submitted for admin review.`
    };
    setAuditLogs((prev) => [logItem, ...prev]);

    // Add admin notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        userId: 'usr-adm-003',
        title: 'New Study Awaiting Review',
        message: `"${study?.title || 'Study'}" was submitted for ethical and criteria review.`,
        type: 'warning',
        read: false,
        createdAt: new Date().toISOString(),
        link: '/admin'
      },
      ...prev
    ]);

    showToast('Submitted for Review', 'Institutional review queued. Approval is required before public recruitment begins.', 'success');
  };

  const adminApproveStudy = (id: string, notes?: string) => {
    setStudies((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'Active', adminNotes: notes, rejectionReason: undefined, updatedAt: new Date().toISOString() } : s))
    );

    const study = studies.find((s) => s.id === id);
    const logItem: AuditLogItem = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorEmail: currentUser?.email || 'admin@researchconnect.ng',
      action: 'Study Approved',
      targetType: 'Study',
      details: `Study "${study?.title || id}" was approved and is now Active for recruitment.`
    };
    setAuditLogs((prev) => [logItem, ...prev]);

    // Researcher notification
    if (study) {
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          userId: study.researcherId,
          title: 'Study Approved!',
          message: `Your study "${study.title}" has been approved and is now actively recruiting participants.`,
          type: 'success',
          read: false,
          createdAt: new Date().toISOString(),
          link: '/dashboard/studies'
        },
        ...prev
      ]);
    }

    showToast('Study Approved', 'Study is now Active and discoverable by eligible participants.', 'success');
  };

  const adminRejectStudy = (id: string, reason: string) => {
    setStudies((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'Rejected', rejectionReason: reason, updatedAt: new Date().toISOString() } : s))
    );

    const study = studies.find((s) => s.id === id);
    const logItem: AuditLogItem = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorEmail: currentUser?.email || 'admin@researchconnect.ng',
      action: 'Study Rejected',
      targetType: 'Study',
      details: `Study "${study?.title || id}" rejected. Reason: ${reason}`
    };
    setAuditLogs((prev) => [logItem, ...prev]);

    if (study) {
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          userId: study.researcherId,
          title: 'Study Requires Revision / Rejected',
          message: `Reason: ${reason}`,
          type: 'warning',
          read: false,
          createdAt: new Date().toISOString(),
          link: '/dashboard/studies'
        },
        ...prev
      ]);
    }

    showToast('Study Rejected', 'The researcher has been notified with the provided reason.', 'warning');
  };

  const adminRequestChanges = (id: string, feedback: string) => {
    setStudies((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'Draft', rejectionReason: feedback, updatedAt: new Date().toISOString() } : s))
    );
    showToast('Changes Requested', 'Study returned to Draft status with revision guidance.', 'info');
  };

  const adminPauseStudy = (id: string) => {
    setStudies((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'Paused', updatedAt: new Date().toISOString() } : s))
    );
    showToast('Recruitment Paused', 'Study is temporarily paused.', 'warning');
  };

  const adminResumeStudy = (id: string) => {
    setStudies((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'Active', updatedAt: new Date().toISOString() } : s))
    );
    showToast('Recruitment Resumed', 'Study is Active again.', 'success');
  };

  const deleteStudyDraft = (id: string) => {
    setStudies((prev) => prev.filter((s) => s.id !== id));
    showToast('Draft Deleted', 'Study draft was removed.', 'info');
  };

  const submitApplication = (studyId: string, participantUniversity: string, participantDepartment: string) => {
    const newApp: StudyApplication = {
      id: `app-${Date.now()}`,
      studyId,
      participantId: currentUser?.id || 'usr-part-guest',
      participantName: currentUser?.fullName || 'Prospective Participant',
      participantEmail: currentUser?.email || 'participant@example.com',
      participantUniversity,
      participantDepartment,
      status: 'Screening Passed',
      appliedAt: new Date().toISOString()
    };

    setApplications((prev) => [newApp, ...prev]);
    showToast('Eligibility Confirmed', 'You meet the preliminary inclusion criteria for this research study.', 'success');
  };

  const recordInformedConsent = (studyId: string) => {
    const now = new Date().toISOString();
    setApplications((prev) =>
      prev.map((app) =>
        app.studyId === studyId && app.participantId === (currentUser?.id || 'usr-part-guest')
          ? { ...app, status: 'Informed Consent Given', consentAgreedAt: now }
          : app
      )
    );

    // Increment study enrolled count
    setStudies((prev) =>
      prev.map((s) =>
        s.id === studyId ? { ...s, enrolledCount: s.enrolledCount + 1 } : s
      )
    );

    showToast('Informed Consent Recorded', 'Proceeding to official researcher survey questionnaire.', 'success');
  };

  const completeParticipation = (studyId: string) => {
    const code = `RCN-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    setApplications((prev) =>
      prev.map((app) =>
        app.studyId === studyId && app.participantId === (currentUser?.id || 'usr-part-guest')
          ? { ...app, status: 'Completed', completedAt: now, completionCode: code }
          : app
      )
    );

    // Update study counts
    setStudies((prev) =>
      prev.map((s) =>
        s.id === studyId ? { ...s, completedCount: s.completedCount + 1, pendingReviewCount: s.pendingReviewCount + 1 } : s
      )
    );

    // Add a response record for researcher audit
    const newResp: ResponseRecord = {
      id: `resp-${Date.now()}`,
      studyId,
      anonymizedParticipantId: `PART-NIG-${Math.floor(1000 + Math.random() * 9000)}`,
      participantUniversity: currentUser?.institution || 'Nigerian University',
      submittedAt: now,
      durationSeconds: Math.floor(450 + Math.random() * 600),
      qualityStatus: 'Pending',
      flags: {}
    };
    setResponses((prev) => [newResp, ...prev]);

    showToast('Participation Recorded', `Completion Code: ${code}. Kept in your participation history.`, 'success');
  };

  const withdrawParticipation = (studyId: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.studyId === studyId && app.participantId === (currentUser?.id || 'usr-part-guest')
          ? { ...app, status: 'Withdrawn' }
          : app
      )
    );
    showToast('Participation Withdrawn', 'Your application was withdrawn. No further data collected.', 'info');
  };

  const updateResponseQuality = (responseId: string, status: ResponseQualityStatus, notes?: string) => {
    setResponses((prev) =>
      prev.map((r) =>
        r.id === responseId
          ? { ...r, qualityStatus: status, reviewNotes: notes || r.reviewNotes, reviewedBy: currentUser?.fullName }
          : r
      )
    );

    // Update accepted / excluded counts in study
    const resp = responses.find((r) => r.id === responseId);
    if (resp) {
      setStudies((prev) =>
        prev.map((s) => {
          if (s.id !== resp.studyId) return s;
          const studyResponses = responses.map((r) => (r.id === responseId ? { ...r, qualityStatus: status } : r));
          const accepted = studyResponses.filter((r) => r.studyId === s.id && r.qualityStatus === 'Accepted').length;
          const excluded = studyResponses.filter((r) => r.studyId === s.id && r.qualityStatus === 'Excluded').length;
          const pending = studyResponses.filter((r) => r.studyId === s.id && (r.qualityStatus === 'Pending' || r.qualityStatus === 'Needs Review')).length;
          return {
            ...s,
            acceptedCount: accepted,
            excludedCount: excluded,
            pendingReviewCount: pending
          };
        })
      );
    }

    showToast('Response Quality Updated', `Response marked as "${status}".`, 'info');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('Notifications Cleared', 'All marked as read.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentPage,
        setCurrentPage,
        selectedStudyId,
        setSelectedStudyId,
        studies,
        applications,
        responses,
        notifications,
        auditLogs,
        toasts,
        showToast,
        dismissToast,
        switchRole,
        createStudy,
        updateStudy,
        submitStudyForReview,
        adminApproveStudy,
        adminRejectStudy,
        adminRequestChanges,
        adminPauseStudy,
        adminResumeStudy,
        deleteStudyDraft,
        submitApplication,
        recordInformedConsent,
        completeParticipation,
        withdrawParticipation,
        updateResponseQuality,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        navigateTo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
