import React from 'react';
import { Info, Play, ShieldCheck } from 'lucide-react';
import { CompetitionData, Language } from '../types';
import { translations } from '../translations';

interface TrustAndPoliciesProps {
  competition: CompetitionData;
  language: Language;
  onOpenPrizeFaq: () => void;
  onOpenRefundPolicy: () => void;
}

export const TrustAndPolicies: React.FC<TrustAndPoliciesProps> = ({
  competition,
  language,
  onOpenPrizeFaq,
  onOpenRefundPolicy,
}) => {
  const t = translations[language];

  return (
    <div className="mx-4 mt-4 space-y-3">
      {/* Disclaimer Banner */}
      <div className="px-3.5 py-2.5 bg-[#EDF9F8] border border-[#BCECE6] rounded-xl flex items-start gap-2 text-slate-700 text-[11px] leading-snug shadow-2xs">
        <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <span>{t.disclaimer}</span>
      </div>

      {/* Trust & FAQ 2-Column Section */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Left: How will you receive prize money? */}
        <button
          onClick={onOpenPrizeFaq}
          className="p-3 bg-white border border-slate-200/80 rounded-2xl flex items-center gap-2.5 text-left hover:border-teal-300 transition-colors shadow-2xs cursor-pointer group active:scale-98"
        >
          <div className="w-9 h-9 rounded-xl bg-[#E0F4F2] text-[#00897b] flex items-center justify-center shrink-0 group-hover:bg-[#bcece7] transition-colors">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
          <div>
            <h4 className="text-[11.5px] font-bold text-slate-900 leading-snug">
              {t.prizeFaqQuestion}
            </h4>
            <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
              {t.watchVideo}
            </span>
          </div>
        </button>

        {/* Right: Refund policy & Razorpay */}
        <div className="p-3 bg-white border border-slate-200/80 rounded-2xl flex flex-col justify-center space-y-2 shadow-2xs">
          {/* Refund policy */}
          <button
            onClick={onOpenRefundPolicy}
            className="flex items-center gap-1.5 text-left text-slate-800 hover:text-teal-700 transition-colors cursor-pointer group"
          >
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
            <span className="text-[11px] font-bold text-slate-900 group-hover:underline">
              {t.refundPolicy}
            </span>
          </button>

          {/* Secure payments powered by Razorpay */}
          <div className="flex flex-col text-[10px] text-slate-500 pt-0.5 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span className="text-[10px] text-slate-600 font-medium">
                {t.securePayments}
              </span>
            </div>
            <div className="flex items-center gap-1 pl-5 mt-0.5">
              <span className="font-extrabold text-blue-900 tracking-wider text-[11px] italic">
                Razorpay
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
