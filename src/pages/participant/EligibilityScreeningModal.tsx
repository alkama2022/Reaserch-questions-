import React, { useState } from 'react';
import { Study } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, AlertCircle, ArrowRight, Building2 } from 'lucide-react';
import { NIGERIAN_UNIVERSITIES } from '../../services/mockData';

interface Props {
  study: Study;
  onClose: () => void;
  onPassed: () => void;
}

export const EligibilityScreeningModal: React.FC<Props> = ({ study, onClose, onPassed }) => {
  const { currentUser, submitApplication } = useApp();
  
  const [answers, setAnswers] = useState<Record<string, 'yes' | 'no'>>({});
  const [university, setUniversity] = useState(currentUser?.institution || NIGERIAN_UNIVERSITIES[0]);
  const [department, setDepartment] = useState(currentUser?.department || '');
  const [disqualifiedReason, setDisqualifiedReason] = useState<string | null>(null);

  const handleAnswerChange = (questionId: string, val: 'yes' | 'no') => {
    setAnswers(prev => ({ ...prev, [questionId]: val }));
    setDisqualifiedReason(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!department.trim()) {
      setDisqualifiedReason('Please provide your university academic department or course of study.');
      return;
    }

    // Verify each question
    for (const q of study.eligibilityQuestions) {
      const ans = answers[q.id];
      if (!ans) {
        setDisqualifiedReason('Please answer all screening questions before continuing.');
        return;
      }
      if (ans !== q.expectedAnswer) {
        setDisqualifiedReason(q.disqualifyingNotice || 'You do not meet the criteria specified by the researcher for this study.');
        return;
      }
    }

    // Passed screening!
    submitApplication(study.id, university, department);
    onPassed();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-[#163B65]">Eligibility Self-Check</h3>
            <p className="text-xs text-slate-500">Step 1 of 2 · Screening for "{study.title.slice(0, 40)}..."</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Institutional Demographics */}
          <div className="space-y-3 bg-slate-50 p-3.5 rounded border border-slate-200 text-xs">
            <span className="font-semibold text-slate-800 block">Your Academic Affiliation</span>
            <div>
              <label className="block text-slate-600 mb-1">University / Tertiary Institution:</label>
              <select
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-800 bg-white"
              >
                {NIGERIAN_UNIVERSITIES.map((uni) => (
                  <option key={uni} value={uni}>{uni}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-600 mb-1">Department / Degree Course:</label>
              <input
                type="text"
                placeholder="e.g. Economics, Computer Engineering, Biochemistry"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-800 bg-white"
              />
            </div>
          </div>

          {/* Screening Questions */}
          <div className="space-y-4">
            <span className="text-xs font-semibold text-slate-800 block">
              Inclusion Criteria Questionnaire:
            </span>

            {study.eligibilityQuestions.length > 0 ? (
              study.eligibilityQuestions.map((q, idx) => (
                <div key={q.id} className="p-3 border border-slate-200 rounded text-xs space-y-2">
                  <p className="font-medium text-slate-800 leading-snug">
                    {idx + 1}. {q.question}
                  </p>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={answers[q.id] === 'yes'}
                        onChange={() => handleAnswerChange(q.id, 'yes')}
                        className="text-[#0F9D8A] focus:ring-[#0F9D8A]"
                      />
                      <span className="text-slate-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={answers[q.id] === 'no'}
                        onChange={() => handleAnswerChange(q.id, 'no')}
                        className="text-[#0F9D8A] focus:ring-[#0F9D8A]"
                      />
                      <span className="text-slate-700">No</span>
                    </label>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600">
                This study is open to all university students enrolled in {study.targetUniversities.join(', ') || 'Nigeria'}.
              </div>
            )}
          </div>

          {/* Disqualification / Error Alert */}
          {disqualifiedReason && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{disqualifiedReason}</span>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0F9D8A] hover:bg-[#0c8070] text-white text-xs font-semibold rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Confirm Eligibility & Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
