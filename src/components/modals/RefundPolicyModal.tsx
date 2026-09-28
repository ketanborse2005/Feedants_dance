import React from 'react';
import { X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CompetitionData } from '../../types';

interface RefundPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  competition: CompetitionData;
}

export const RefundPolicyModal: React.FC<RefundPolicyModalProps> = ({
  isOpen,
  onClose,
  competition,
}) => {
  if (!isOpen) return null;

  const policy = competition.policies.refundPolicy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-[#005c53] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-200" />
            <h3 className="font-extrabold text-sm">{policy.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-teal-200 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto text-xs text-slate-600 leading-relaxed">
          <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-teal-900 font-semibold">
            {policy.summary}
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs">Standard Policy Details</h4>
            {policy.details.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00897b] shrink-0 mt-0.5" />
                <span>{detail}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Powered by Razorpay Verified Escrow</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#005c53] text-white font-bold rounded-xl cursor-pointer hover:bg-[#004740] transition-colors"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
