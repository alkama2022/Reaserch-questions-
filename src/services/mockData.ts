import { Study, UserProfile, ResponseRecord, AuditLogItem, NotificationItem } from '../types';

export const DEMO_USERS: Record<string, UserProfile> = {
  researcher: {
    id: 'usr-res-001',
    email: 'chiamaka.eze@unilag.edu.ng',
    fullName: 'Chiamaka Eze',
    role: 'researcher',
    titlePrefix: 'Ms.',
    bio: 'Final-year BSc Economics undergraduate student at the University of Lagos. Conducting empirical research on retail fintech adoption, mobile banking dispute resolutions, and financial inclusion dynamics in Southwestern Nigeria.',
    institution: 'University of Lagos (UNILAG)',
    faculty: 'Social Sciences',
    department: 'Economics',
    academicLevel: 'Undergraduate',
    matricOrStaffId: '2022/ECN/10892',
    orcidId: '0009-0004-8921-3401',
    scholarUrl: 'https://scholar.google.com/citations?user=sample-chiamaka-eze',
    researchInterests: ['Fintech Adoption', 'Financial Inclusion', 'Development Economics', 'Digital Banking'],
    supervisorName: 'Prof. A. K. Oyedepo',
    secondaryEmail: 'chiamaka.eze.research@gmail.com',
    avatarUrl: '/src/assets/images/avatar_nigerian_female_scholar_1792198295926.jpg',
    phoneNumber: '+234 803 456 7890',
    contactPreferences: {
      emailNotifications: true,
      whatsappAlerts: true,
      phoneCallsPermitted: false,
      weeklyRecruitmentDigest: true,
      urgentComplianceAlerts: true,
      allowParticipantClarityInquiries: true,
      preferredContactMethod: 'email'
    },
    createdAt: '2026-09-01T10:00:00Z',
  },
  participant: {
    id: 'usr-part-002',
    email: 'tunde.adebayo@student.oauife.edu.ng',
    fullName: 'Babatunde Adebayo',
    role: 'participant',
    institution: 'Obafemi Awolowo University (OAU), Ile-Ife',
    faculty: 'Technology',
    department: 'Computer Science & Engineering',
    academicLevel: 'Undergraduate',
    phoneNumber: '+234 812 987 6543',
    createdAt: '2026-09-12T14:30:00Z',
  },
  admin: {
    id: 'usr-adm-003',
    email: 'compliance@researchconnect.ng',
    fullName: 'Dr. Ibrahim Bello',
    role: 'admin',
    institution: 'Ahmadu Bello University (ABU), Zaria',
    faculty: 'Administration & Institutional Ethics',
    department: 'Academic Research Ethics Directorate',
    academicLevel: 'Lecturer / Academic Staff',
    avatarUrl: '/src/assets/images/avatar_nigerian_male_scholar_1792198295975.jpg',
    phoneNumber: '+234 802 334 5566',
    createdAt: '2026-08-15T08:00:00Z',
  }
};

export const INITIAL_STUDIES: Study[] = [
  {
    id: 'study-001',
    researcherId: 'usr-res-001',
    researcherName: 'Chiamaka Eze',
    researcherInstitution: 'University of Lagos (UNILAG)',
    title: 'Adoption and Trust Dynamics in Mobile Banking and Neobank Apps Among Southwestern Nigerian Undergraduates',
    researchPurpose: 'Final-year BSc Economics dissertation investigating the perceived ease-of-use, transaction reliability, and security concerns influencing digital banking adoption among university students in Lagos State.',
    briefDescription: 'A 12-minute academic questionnaire assessing daily use patterns of Nigerian banking apps (e.g. OPay, PalmPay, Kuda, GTWorld) and frequency of unresolved transaction disputes.',
    category: 'Business & Management',
    facultyDepartment: 'Faculty of Social Sciences / Dept of Economics',
    targetPopulation: 'Full-time undergraduate students currently matriculated in universities across Lagos State',
    ageMin: 18,
    ageMax: 30,
    targetUniversities: ['University of Lagos', 'Lagos State University', 'Pan-Atlantic University'],
    inclusionCriteria: [
      'Currently enrolled undergraduate student in a recognized Lagos tertiary institution',
      'Uses at least one Nigerian mobile banking or fintech application on a smartphone',
      'Has completed at least 3 mobile money transfers within the past 30 days'
    ],
    exclusionCriteria: [
      'Part-time or pre-degree diploma students',
      'Students outside Lagos State'
    ],
    eligibilityQuestions: [
      {
        id: 'q1',
        question: 'Are you currently an enrolled undergraduate student at a university located in Lagos State?',
        expectedAnswer: 'yes',
        disqualifyingNotice: 'This specific study focuses strictly on undergraduate students attending Lagos institutions.'
      },
      {
        id: 'q2',
        question: 'Do you routinely use a mobile banking app (e.g., OPay, Kuda, GTWorld, Access Bank) on your personal smartphone?',
        expectedAnswer: 'yes',
        disqualifyingNotice: 'Participants must have personal active experience with Nigerian mobile banking apps.'
      }
    ],
    targetSampleSize: 250,
    enrolledCount: 198,
    completedCount: 184,
    acceptedCount: 162,
    excludedCount: 12,
    pendingReviewCount: 10,
    recruitmentDeadline: '2026-11-15',
    estimatedMinutes: 12,
    questionnaireUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc-sample-banking-study/viewform',
    surveyTool: 'Google Forms',
    incentiveType: 'Mobile Airtime / Data Token',
    incentiveDetails: '₦500 mobile recharge token sent via SMS/WhatsApp to validated full survey completers (upon verification of attention checks).',
    status: 'Active',
    ethicsApprovalNumber: 'UNILAG/HREC/2026/089',
    supervisorName: 'Prof. A. K. Oyedepo',
    isEthicsApproved: true,
    createdAt: '2026-09-15T09:00:00Z',
    updatedAt: '2026-10-12T16:20:00Z',
    bannerImage: '/src/assets/images/academic_survey_fieldwork_1792198295704.jpg',
  },
  {
    id: 'study-002',
    researcherId: 'usr-res-004',
    researcherName: 'Oluwaseun Balogun',
    researcherInstitution: 'University of Ibadan (UI)',
    title: 'Sleep Hygiene, Academic Workload, and Psychological Resilience in Clinical Medical Students',
    researchPurpose: 'Master of Public Health (MPH) thesis analyzing the prevalence of daytime sleepiness and chronic exam stress during 400L and 500L clinical postings in Nigerian teaching hospitals.',
    briefDescription: 'Standardized questionnaire incorporating the Epworth Sleepiness Scale (ESS) and Brief Resilience Scale (BRS) adapted for Nigerian medical training.',
    category: 'Health & Medical Sciences',
    facultyDepartment: 'Faculty of Public Health / College of Medicine',
    targetPopulation: 'Clinical-year medical, dental, and nursing students currently attending accredited Nigerian teaching hospitals',
    ageMin: 20,
    ageMax: 35,
    targetUniversities: ['University of Ibadan (UCH)', 'Obafemi Awolowo University (OAUTHC)', 'University of Lagos (LUTH)'],
    inclusionCriteria: [
      'Enrolled in 400L, 500L, or 600L clinical rotation postings',
      'Actively taking call duties or hospital ward rounds'
    ],
    exclusionCriteria: [
      'Pre-clinical 100L–300L students',
      'Diagnosed chronic sleep apnoea prior to medical school admission'
    ],
    eligibilityQuestions: [
      {
        id: 'q1',
        question: 'Are you currently in your clinical rotation years (400L, 500L, or 600L) in a medical, dental, or nursing degree program?',
        expectedAnswer: 'yes',
        disqualifyingNotice: 'This research specifically examines the clinical clerkship phase of medical training.'
      }
    ],
    targetSampleSize: 180,
    enrolledCount: 142,
    completedCount: 130,
    acceptedCount: 120,
    excludedCount: 6,
    pendingReviewCount: 4,
    recruitmentDeadline: '2026-11-30',
    estimatedMinutes: 15,
    questionnaireUrl: 'https://ee.kobotoolbox.org/x/sleep-clinical-nigeria',
    surveyTool: 'KoboToolbox',
    incentiveType: 'Certificate of Participation',
    incentiveDetails: 'Official Digital Certificate of Research Contribution signed by the Principal Investigator for inclusion in academic portfolios.',
    status: 'Active',
    ethicsApprovalNumber: 'UI/EC/26/0412',
    supervisorName: 'Dr. (Mrs) F. N. Adeleke',
    isEthicsApproved: true,
    createdAt: '2026-09-20T11:30:00Z',
    updatedAt: '2026-10-14T10:15:00Z',
  },
  {
    id: 'study-003',
    researcherId: 'usr-res-005',
    researcherName: 'Hadiza Mohammed',
    researcherInstitution: 'Ahmadu Bello University (ABU), Zaria',
    title: 'Evaluating Student Perceptions of Renewable Off-Grid Solar Power in Northern Nigerian University Hostels',
    researchPurpose: 'Final-year Agricultural & Bio-Resources Engineering inquiry into student satisfaction and study interruption reduction following decentralized solar microgrid installations.',
    briefDescription: 'A brief 8-minute survey on nighttime study light reliability, inverter maintenance satisfaction, and power tariff willingness-to-pay.',
    category: 'Engineering & Technology',
    facultyDepartment: 'Faculty of Engineering / Dept of Agricultural Engineering',
    targetPopulation: 'On-campus resident students in Northern federal and state universities',
    ageMin: 17,
    ageMax: 29,
    targetUniversities: ['Ahmadu Bello University', 'Bayero University Kano', 'Federal University of Technology Minna'],
    inclusionCriteria: [
      'Resides in an official on-campus hall of residence',
      'Experienced solar microgrid power during the 2025/2026 academic session'
    ],
    exclusionCriteria: [
      'Off-campus day students'
    ],
    eligibilityQuestions: [
      {
        id: 'q1',
        question: 'Do you currently live inside an on-campus student dormitory/hall of residence at an accredited university?',
        expectedAnswer: 'yes',
        disqualifyingNotice: 'Survey examines on-campus institutional microgrids only.'
      }
    ],
    targetSampleSize: 200,
    enrolledCount: 45,
    completedCount: 38,
    acceptedCount: 32,
    excludedCount: 2,
    pendingReviewCount: 4,
    recruitmentDeadline: '2026-12-10',
    estimatedMinutes: 8,
    questionnaireUrl: 'https://forms.office.com/r/abu-solar-hostel',
    surveyTool: 'Microsoft Forms',
    incentiveType: 'Mobile Airtime / Data Token',
    incentiveDetails: '₦400 data token credited within 48 hours of response quality confirmation.',
    status: 'Active',
    ethicsApprovalNumber: 'ABU/ETH/ENG/26/102',
    supervisorName: 'Engr. Dr. M. S. Garba',
    isEthicsApproved: true,
    createdAt: '2026-10-01T08:45:00Z',
    updatedAt: '2026-10-10T09:00:00Z',
  },
  {
    id: 'study-004',
    researcherId: 'usr-res-001',
    researcherName: 'Chiamaka Eze',
    researcherInstitution: 'University of Lagos (UNILAG)',
    title: 'E-Commerce Delivery Reliability and Buyer Dispute Resolutions in Nigerian Online Retail',
    researchPurpose: 'Exploratory pilot investigation comparing third-party logistics fulfillment complaints across Jumia, Konga, and Instagram social commerce vendors in Yaba and Surulere.',
    briefDescription: 'Draft survey exploring last-mile delivery delays and buyer refund timelines.',
    category: 'Social Sciences',
    facultyDepartment: 'Faculty of Social Sciences',
    targetPopulation: 'Frequent online shoppers residing in Lagos mainland',
    ageMin: 18,
    targetUniversities: ['University of Lagos'],
    inclusionCriteria: ['Made at least 2 online merchandise orders within the last 3 months'],
    exclusionCriteria: [],
    eligibilityQuestions: [],
    targetSampleSize: 150,
    enrolledCount: 0,
    completedCount: 0,
    acceptedCount: 0,
    excludedCount: 0,
    pendingReviewCount: 0,
    recruitmentDeadline: '2026-12-20',
    estimatedMinutes: 10,
    questionnaireUrl: 'https://docs.google.com/forms/d/sample-logistics-study',
    surveyTool: 'Google Forms',
    incentiveType: 'None',
    status: 'Pending Review',
    ethicsApprovalNumber: 'Pending Faculty Board Review',
    isEthicsApproved: false,
    createdAt: '2026-10-15T14:20:00Z',
    updatedAt: '2026-10-15T14:20:00Z',
  },
  {
    id: 'study-005',
    researcherId: 'usr-res-006',
    researcherName: 'Kelechi Nwosu',
    researcherInstitution: 'University of Nigeria, Nsukka (UNN)',
    title: 'Assessment of Cassava Value Chain Financing and Post-Harvest Losses in Enugu State',
    researchPurpose: 'MSc Agricultural Economics thesis analyzing microcredit accessibility for rural tuber farming cooperatives.',
    briefDescription: 'Survey evaluating post-harvest processing efficiency and bank loan barriers.',
    category: 'Agricultural Sciences',
    facultyDepartment: 'Faculty of Agriculture',
    targetPopulation: 'Students from agricultural farming households or agricultural economics undergraduates',
    targetUniversities: ['University of Nigeria, Nsukka', 'Enugu State University of Science and Technology'],
    inclusionCriteria: ['Familiar with smallholder cassava cultivation or processing in Southeastern Nigeria'],
    exclusionCriteria: [],
    eligibilityQuestions: [],
    targetSampleSize: 100,
    enrolledCount: 100,
    completedCount: 102,
    acceptedCount: 96,
    excludedCount: 6,
    pendingReviewCount: 0,
    recruitmentDeadline: '2026-09-30',
    estimatedMinutes: 14,
    questionnaireUrl: 'https://kobotoolbox.org/sample-cassava-study',
    surveyTool: 'KoboToolbox',
    incentiveType: 'None',
    status: 'Completed',
    ethicsApprovalNumber: 'UNN/REC/AG/26/03',
    supervisorName: 'Prof. C. U. Okoye',
    isEthicsApproved: true,
    createdAt: '2026-08-10T10:00:00Z',
    updatedAt: '2026-10-01T12:00:00Z',
  }
];

export const INITIAL_RESPONSES: ResponseRecord[] = [
  {
    id: 'resp-001',
    studyId: 'study-001',
    anonymizedParticipantId: 'PART-NIG-7841',
    participantUniversity: 'University of Lagos',
    submittedAt: '2026-10-15T14:32:10Z',
    durationSeconds: 742,
    qualityStatus: 'Accepted',
    flags: {},
    reviewNotes: 'Standard completion time, all attention check questions answered accurately.',
    reviewedBy: 'Chiamaka Eze'
  },
  {
    id: 'resp-002',
    studyId: 'study-001',
    anonymizedParticipantId: 'PART-NIG-7842',
    participantUniversity: 'University of Lagos',
    submittedAt: '2026-10-15T15:10:45Z',
    durationSeconds: 110,
    qualityStatus: 'Excluded',
    flags: {
      speedCheckFailed: true,
      straightLiningFlag: true
    },
    reviewNotes: 'Flagged for extreme speed (< 2 minutes for 12-minute survey) and straight-lining on Likert scales.',
    reviewedBy: 'Chiamaka Eze'
  },
  {
    id: 'resp-003',
    studyId: 'study-001',
    anonymizedParticipantId: 'PART-NIG-7843',
    participantUniversity: 'Lagos State University',
    submittedAt: '2026-10-15T16:05:00Z',
    durationSeconds: 615,
    qualityStatus: 'Accepted',
    flags: {},
    reviewedBy: 'Chiamaka Eze'
  },
  {
    id: 'resp-004',
    studyId: 'study-001',
    anonymizedParticipantId: 'PART-NIG-7844',
    participantUniversity: 'University of Lagos',
    submittedAt: '2026-10-16T09:12:30Z',
    durationSeconds: 430,
    qualityStatus: 'Needs Review',
    flags: {
      duplicateIpFlag: true
    },
    reviewNotes: 'Shared IP address detected within 4 minutes of another submission from Faculty of Social Sciences computer laboratory.',
  },
  {
    id: 'resp-005',
    studyId: 'study-001',
    anonymizedParticipantId: 'PART-NIG-7845',
    participantUniversity: 'Pan-Atlantic University',
    submittedAt: '2026-10-16T11:45:00Z',
    durationSeconds: 820,
    qualityStatus: 'Pending',
    flags: {}
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'usr-res-001',
    title: 'Recruitment Milestone',
    message: 'Your study on Mobile Banking has reached 75% of its target sample size (162 accepted responses).',
    type: 'success',
    read: false,
    createdAt: '2026-10-15T18:00:00Z',
    link: '/dashboard/tracking'
  },
  {
    id: 'notif-2',
    userId: 'usr-res-001',
    title: 'Study Submitted for Admin Review',
    message: 'Your new study request "E-Commerce Delivery Reliability" has been queued for institutional review.',
    type: 'review',
    read: true,
    createdAt: '2026-10-15T14:20:00Z',
    link: '/dashboard/studies'
  },
  {
    id: 'notif-3',
    userId: 'usr-adm-003',
    title: 'New Study Request Awaiting Review',
    message: 'Chiamaka Eze submitted "E-Commerce Delivery Reliability and Buyer Dispute Resolutions" for review.',
    type: 'warning',
    read: false,
    createdAt: '2026-10-15T14:20:00Z',
    link: '/admin'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'aud-001',
    timestamp: '2026-10-15T14:20:00Z',
    actorEmail: 'chiamaka.eze@unilag.edu.ng',
    action: 'Study Submission',
    targetType: 'Study',
    details: 'Submitted study "E-Commerce Delivery Reliability" (target size 150) for review.'
  },
  {
    id: 'aud-002',
    timestamp: '2026-10-14T11:00:00Z',
    actorEmail: 'compliance@researchconnect.ng',
    action: 'Study Approved',
    targetType: 'Study',
    details: 'Approved study "Sleep Hygiene in Clinical Medical Students" following ethics document verification.'
  },
  {
    id: 'aud-003',
    timestamp: '2026-10-12T09:30:00Z',
    actorEmail: 'chiamaka.eze@unilag.edu.ng',
    action: 'Quality Flag Reviewed',
    targetType: 'Review',
    details: 'Excluded response PART-NIG-7842 due to severe speed check failure.'
  }
];

export const NIGERIAN_UNIVERSITIES = [
  'University of Lagos (UNILAG)',
  'University of Ibadan (UI)',
  'Obafemi Awolowo University (OAU), Ile-Ife',
  'Ahmadu Bello University (ABU), Zaria',
  'University of Nigeria, Nsukka (UNN)',
  'University of Ilorin (UNILORIN)',
  'University of Benin (UNIBEN)',
  'Federal University of Technology, Akure (FUTA)',
  'Federal University of Technology, Minna (FUTMinna)',
  'Bayero University Kano (BUK)',
  'Covenant University, Ota',
  'Lagos State University (LASU)',
  'Pan-Atlantic University, Lagos',
  'Rivers State University (RSU)',
  'Abubakar Tafawa Balewa University (ATBU)',
  'Nnamdi Azikiwe University (UNIZIK)',
  'Babcock University, Ilishan-Remo',
  'Afe Babalola University (ABUAD)',
  'Other Accredited Nigerian Tertiary Institution'
];
