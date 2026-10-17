# ResearchConnect Nigeria — Version 1.0

> **"Connecting Research with the Right People."**

ResearchConnect Nigeria is an academic participant recruitment and research workflow platform specifically tailored for Nigerian university students, postgraduate researchers, lecturers, and academic departments.

---

## 1. Project Overview

In Nigerian higher education, final-year undergraduate students (BSc/BA/BEng) and postgraduate scholars (MSc/PhD) face immense friction recruiting verified respondents for their questionnaire-based research projects. Conventional methods—such as posting survey links into peer WhatsApp groups—produce biased convenience samples and risk rejection by faculty supervisors during dissertation defenses.

ResearchConnect Nigeria provides a structured, ethical participant recruitment pipeline where researchers can:
- Define demographic and inclusion/exclusion criteria across Nigerian universities.
- Connect existing questionnaire links (Google Forms, KoboToolbox, Microsoft Forms, Qualtrics).
- Track recruitment progress against quota targets in real time.
- Conduct response-quality audits (completion duration anomalies, duplicate session clusters).
- Export permitted, anonymized recruitment logs for Chapter 3 (Methodology) dissertation defense.

Student participants can:
- Discover relevant academic studies conducted by Nigerian scholars.
- Complete 2-step eligibility screening checks.
- Review informed consent information sheets and exercise voluntary participation rights.
- Access questionnaires and receive verifiable participation reference codes.

Administrators & Ethics Reviewers can:
- Review submitted study requests before publication.
- Approve, request revisions, or reject studies with clear written feedback.
- Monitor platform recruitment metrics and immutable audit trails.

---

## 2. Technology Stack

- **Framework**: React 19 + TypeScript (Strict Type Checking)
- **Styling**: Tailwind CSS with custom academic palette and typography
- **Design Constitution**: Compliant with AI Studio Frontend Design Constitution (anti-AI slop, zero-pill metadata discipline, strict Top Bar Contract, 1440px desktop baseline, responsive mobile drawers)
- **Icons**: Lucide React
- **Forms & Validation**: Form validation with Zod / state validation
- **Backend Architecture**: Prepared Supabase service layer (`@supabase/supabase-js`) with interactive client-side local state fallback engine

---

## 3. Brand Identity & Design System

- **Primary**: Deep Navy Blue (`#163B65`)
- **Secondary**: Teal (`#0F9D8A`)
- **Canvas / Background**: Light Slate (`#F7F9FC`)
- **Surface**: Pure White (`#FFFFFF`)
- **Primary Text**: Dark Charcoal (`#172B4D`)
- **Muted Text**: Cool Slate (`#64748B`)
- **Success / Warning / Error**: Green (`#15803D`) / Amber (`#D97706`) / Red (`#DC2626`)
- **Typography**: Plus Jakarta Sans paired with tabular numerals (`tabular-nums`)

---

## 4. Application Architecture & Implemented Routes

### A. Public Website
- **Home Page** (`/`): Hero with authentic Nigerian university research photography, platform preview, 3-step workflow, researcher/participant benefits, response quality disclosures, active studies snapshot, footer.
- **Browse Studies** (`/browse-studies`): Live search, field category filters, Nigerian university selectors, incentive filter, study cards.
- **Study Details & Participation Flow** (`/study-details`): Full methodology, inclusion/exclusion checklist, supervisor details, with integrated Eligibility Screening Modal and Informed Consent Modal.
- **How It Works** (`/how-it-works`): Detailed dual-stream process maps for researchers and participants, quality audit explanation.
- **For Researchers** (`/for-researchers`): Guide for BSc, MSc/PhD candidates, pre-recruitment checklist.
- **For Participants** (`/for-participants`): Participant ethical rights, voluntary withdrawal, privacy notices, FAQs.
- **About Us** (`/about`): Nigerian university context and platform origins.
- **Contact** (`/contact`): Inquiry form with validation and submission confirmation.
- **Privacy Policy** (`/privacy`): Data minimization, no PII harvesting, anonymized response logs.
- **Terms of Service** (`/terms`): Academic integrity, survey distribution ethics, researcher responsibilities.

### B. Authentication System
- **Login** (`/login`): Password visibility toggle, credentials validation, and 1-click Demo Role quick-sign-in shortcuts (Researcher, Participant, Admin).
- **Registration** (`/register`): Role selection (Researcher vs Participant; admin privileges cannot be self-assigned), university affiliation selector, email verification simulation.
- **Forgot Password & Reset** (`/forgot-password`, `/reset-password`): Password recovery flows.

### C. Researcher Workspace
- **Overview Dashboard** (`/researcher-overview`): Collapsible sidebar, recruitment quota KPIs, active studies progress bars, upcoming fieldwork deadlines, recent notifications.
- **My Studies** (`/researcher-studies`): Search, status filter tabs (Draft, Pending Review, Active, Paused, Completed, Rejected), sort by quota/deadline, card and table views, contextual actions.
- **Create Study Wizard** (`/researcher-create`): 4-step wizard with step-by-step validation:
  1. Study Info (Title, category, institution, purpose, description)
  2. Eligibility (Target population, age range, inclusion/exclusion lists, screening questions with expected answers)
  3. Recruitment (Target sample size, deadline, survey tool, questionnaire URL, incentive details)
  4. Consent & Review (Supervisor sign-off, ethics protocol code, summary review, save draft or submit for admin review)
- **Recruitment Tracking** (`/researcher-tracking`): Distinguishes recruited vs completed vs accepted responses; inspects duration flags and duplicate IPs; allows manual Accept/Exclude/Review actions; exports permitted CSV.
- **Methodology Reports** (`/researcher-reports`): Attrition funnel, institutional breakdown, auto-generated Chapter 3 methodology text snippet, downloadable CSV/JSON.
- **Researcher Settings** (`/researcher-settings`): Investigator profile, institution, notification alerts.

### D. Participant Portal
- **Dashboard** (`/participant-overview`): Personal contributions counter, in-progress screenings, recommended studies.
- **My Applications** (`/participant-applications`): Participation records with verifiable completion reference codes (`RCN-OAU-9421`), survey launch links, withdrawal controls.

### E. Administrator Desk
- **Admin Review Console** (`/admin-overview`): Pending review queue, study approval/rejection with written feedback, change requests, pause/resume controls, user directory, and immutable audit logs.

---

## 5. Development & Build Setup

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd researchconnect-nigeria

# Install dependencies
npm install

# Start development server on port 3000
npm run dev
```

### Build & Verification
```bash
# Compile TypeScript and build production bundle
npm run build

# Run TypeScript linter
npm run lint
```

---

## 6. Documented Unimplemented Backend Functions

As required by Section 11 (item 17), the following functions are intentionally decoupled in the V1.0 frontend and prepared for future backend / third-party integration:

1. **Automated Transactional Email Delivery**:
   - Verification links and password reset tokens currently simulate in-UI state.
   - Production requires SendGrid, Postmark, or Supabase SMTP integration.

2. **Automated Mobile Airtime / Data Token Disbursement**:
   - Token incentives are recorded with verifiable completion codes for manual or batch researcher disbursement.
   - Production integration requires Paystack / Flutterwave Transfers API.

3. **Live University Student Matriculation API Verification**:
   - Student university affiliation is currently self-reported.
   - Real-time student verification requires individual Nigerian university portal APIs (JAMB / NUC student directory).

4. **Automated Reverse IP Geolocation & Network Clustering**:
   - Quality inspection detects browser fingerprint and session frequency anomalies in local state.
   - Production requires MaxMind GeoIP / Cloudflare edge worker verification.
