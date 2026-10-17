import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'General Inquiry' | 'Research Support' | 'Ethics & Integrity Concern' | 'Technical Issue'>('General Inquiry');
  const [university, setUniversity] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) {
      showToast('Incomplete Form', 'Please fill out all required fields.', 'warning');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast('Message Received', 'Your inquiry has been recorded in the platform desk.', 'success');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#163B65]">Contact & Research Support</h1>
        <p className="text-sm text-slate-600">
          Have an inquiry regarding a research study, ethical compliance, or platform functionality? Our academic support desk is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Support Information */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4 text-xs text-slate-600">
            <h2 className="text-sm font-bold text-slate-900">Support Desk</h2>
            <p className="leading-relaxed">
              We respond to student researchers and participants within 24 to 48 business hours during academic sessions.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#0F9D8A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">Email Inquiries:</strong>
                  <span className="text-slate-500">support@researchconnect.ng</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#0F9D8A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">Ethics & Research Review:</strong>
                  <span className="text-slate-500">compliance@researchconnect.ng</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded border border-slate-200 text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-700 block mb-1">Notice on Study Questions:</strong>
            If you have questions about specific questionnaire content, please note that survey methodologies are created by independent researchers. You may also consult your departmental supervisor.
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Inquiry Logged</h2>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your message regarding <em>{category}</em> has been recorded. Our academic team will respond to <strong>{email}</strong>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                  setFullName('');
                  setEmail('');
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#163B65] text-white rounded hover:bg-[#112d4e] transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amina Yusuf"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@university.edu.ng or personal email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Inquiry Category</label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 bg-white"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Research Support">Research / Study Setup Support</option>
                    <option value="Ethics & Integrity Concern">Ethics & Integrity Concern</option>
                    <option value="Technical Issue">Technical / Survey Tool Issue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">University (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. UNILAG, ABU, UI"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your inquiry or study question in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#0F9D8A] outline-none text-slate-800 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#163B65] hover:bg-[#112d4e] text-white font-semibold rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Send className="w-3.5 h-3.5 text-teal-300" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
