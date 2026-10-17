export type UserRole = 'researcher' | 'participant' | 'admin' | 'guest';

export interface ContactPreferences {
  emailNotifications: boolean;
  whatsappAlerts: boolean;
  phoneCallsPermitted: boolean;
  weeklyRecruitmentDigest: boolean;
  urgentComplianceAlerts: boolean;
  allowParticipantClarityInquiries: boolean;
  preferredContactMethod: 'email' | 'whatsapp' | 'in_app';
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  titlePrefix?: string; // Mr., Mrs., Ms., Dr., Prof., Engr., Pharm.
  bio?: string;
  institution?: string;
  faculty?: string;
  department?: string;
  academicLevel?: 'Undergraduate' | 'Postgraduate (Masters)' | 'Postgraduate (PhD)' | 'Lecturer / Academic Staff' | 'Independent Researcher';
  matricOrStaffId?: string;
  orcidId?: string;
  scholarUrl?: string;
  researchInterests?: string[];
  supervisorName?: string;
  secondaryEmail?: string;
  avatarUrl?: string;
  phoneNumber?: string;
  contactPreferences?: ContactPreferences;
  createdAt: string;
}

export type StudyStatus = 
  | 'Draft'
  | 'Pending Review'
  | 'Approved'
  | 'Active'
  | 'Paused'
  | 'Completed'
  | 'Rejected';

export type ResponseQualityStatus = 
  | 'Pending'
  | 'Accepted'
  | 'Needs Review'
  | 'Excluded';

export type ResearchCategory = 
  | 'Social Sciences'
  | 'Health & Medical Sciences'
  | 'Business & Management'
  | 'Engineering & Technology'
  | 'Education & Pedagogy'
  | 'Agricultural Sciences'
  | 'Humanities & Arts'
  | 'Environmental Sciences';

export interface EligibilityQuestion {
  id: string;
  question: string;
  expectedAnswer: 'yes' | 'no';
  disqualifyingNotice: string;
}

export interface Study {
  id: string;
  researcherId: string;
  researcherName: string;
  researcherInstitution: string;
  title: string;
  researchPurpose: string;
  briefDescription: string;
  category: ResearchCategory;
  facultyDepartment?: string;
  targetPopulation: string;
  ageMin?: number;
  ageMax?: number;
  targetUniversities: string[]; // e.g. ["University of Lagos", "All Federal Universities"]
  inclusionCriteria: string[];
  exclusionCriteria: string[];
  eligibilityQuestions: EligibilityQuestion[];
  targetSampleSize: number;
  enrolledCount: number;
  completedCount: number;
  acceptedCount: number;
  excludedCount: number;
  pendingReviewCount: number;
  recruitmentDeadline: string;
  estimatedMinutes: number;
  questionnaireUrl: string; // Google Form, KoboToolbox, Qualtrics, etc.
  surveyTool: 'Google Forms' | 'KoboToolbox' | 'Microsoft Forms' | 'Qualtrics' | 'Custom';
  incentiveType: 'None' | 'Mobile Airtime / Data Token' | 'Certificate of Participation' | 'Raffle Draw' | 'Direct Honorarium';
  incentiveDetails?: string;
  status: StudyStatus;
  rejectionReason?: string;
  adminNotes?: string;
  ethicsApprovalNumber?: string;
  supervisorName?: string;
  isEthicsApproved: boolean;
  createdAt: string;
  updatedAt: string;
  bannerImage?: string;
}

export interface StudyApplication {
  id: string;
  studyId: string;
  participantId: string;
  participantName: string;
  participantEmail: string;
  participantUniversity: string;
  participantDepartment: string;
  status: 'Screening Passed' | 'Informed Consent Given' | 'Questionnaire Redirected' | 'Completed' | 'Withdrawn' | 'Ineligible';
  consentAgreedAt?: string;
  appliedAt: string;
  completedAt?: string;
  completionCode?: string;
}

export interface ResponseRecord {
  id: string;
  studyId: string;
  anonymizedParticipantId: string;
  participantUniversity: string;
  submittedAt: string;
  durationSeconds: number;
  qualityStatus: ResponseQualityStatus;
  flags: {
    speedCheckFailed?: boolean;
    duplicateIpFlag?: boolean;
    incompleteSubmissionsFlag?: boolean;
    straightLiningFlag?: boolean;
  };
  reviewNotes?: string;
  reviewedBy?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'review';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actorEmail: string;
  action: string;
  targetType: 'Study' | 'User' | 'Policy' | 'Review';
  details: string;
}
