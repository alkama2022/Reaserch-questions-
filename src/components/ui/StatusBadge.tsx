import React from 'react';
import { StudyStatus, ResponseQualityStatus } from '../../types';
import { CheckCircle2, Clock, PauseCircle, AlertTriangle, XCircle, FileEdit, Check } from 'lucide-react';

interface StudyStatusBadgeProps {
  status: StudyStatus;
}

export const StudyStatusBadge: React.FC<StudyStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'Active':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Active Recruitment</span>
        </span>
      );
    case 'Pending Review':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded">
          <Clock className="w-3.5 h-3.5" />
          <span>Pending Review</span>
        </span>
      );
    case 'Draft':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
          <FileEdit className="w-3.5 h-3.5" />
          <span>Draft</span>
        </span>
      );
    case 'Approved':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-700 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded">
          <Check className="w-3.5 h-3.5" />
          <span>Approved</span>
        </span>
      );
    case 'Paused':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
          <PauseCircle className="w-3.5 h-3.5" />
          <span>Paused</span>
        </span>
      );
    case 'Completed':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Recruitment Complete</span>
        </span>
      );
    case 'Rejected':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200/80 px-2 py-0.5 rounded">
          <XCircle className="w-3.5 h-3.5" />
          <span>Action Required / Rejected</span>
        </span>
      );
    default:
      return <span className="text-xs text-slate-500">{status}</span>;
  }
};

interface QualityBadgeProps {
  status: ResponseQualityStatus;
}

export const QualityBadge: React.FC<QualityBadgeProps> = ({ status }) => {
  switch (status) {
    case 'Accepted':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          <Check className="w-3 h-3" />
          <span>Accepted</span>
        </span>
      );
    case 'Pending':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
          <Clock className="w-3 h-3" />
          <span>Pending Audit</span>
        </span>
      );
    case 'Needs Review':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          <AlertTriangle className="w-3 h-3" />
          <span>Needs Review</span>
        </span>
      );
    case 'Excluded':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-red-800 bg-red-50 px-2 py-0.5 rounded border border-red-200">
          <XCircle className="w-3 h-3" />
          <span>Excluded</span>
        </span>
      );
    default:
      return <span className="text-xs text-slate-500">{status}</span>;
  }
};
