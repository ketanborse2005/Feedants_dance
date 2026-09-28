import React, { useState } from 'react';
import { Megaphone, Copy, Check, Share2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface ReferralBannerProps {
  language: Language;
}

export const ReferralBanner: React.FC<ReferralBannerProps> = ({ language }) => {
  const [copied, setCopied] = useState(false);
  const t = translations[language];
  const referralLink = 'https://feedants.com/r/referral123';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Feedants Classical Dance Competition',
        text: 'Join me on Feedants Classical Dance Competition! Get ₹10 discount.',
        url: referralLink,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="mx-4 mt-4 p-3.5 bg-[#EDF9F2] border border-[#BDEBD0] rounded-2xl shadow-2xs">
      <div className="flex items-start justify-between gap-2">
        {/* Left Icon & Heading */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#D4F4DF] text-emerald-800 flex items-center justify-center shrink-0">
            <Megaphone className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h4 className="text-[12.5px] font-extrabold text-slate-900 leading-tight">
              {t.referTitle}
            </h4>
          </div>
        </div>

        {/* Right Refer Now Button */}
        <div className="flex flex-col items-end">
          <button
            onClick={handleShare}
            className="px-3.5 py-1.5 bg-[#005c53] hover:bg-[#004740] active:scale-95 text-white font-bold text-xs rounded-lg transition-all shadow-2xs cursor-pointer flex items-center gap-1"
          >
            <span>{t.referNow}</span>
          </button>
          <span className="text-[9.5px] text-[#006d63] font-semibold mt-1 text-right">
            {t.referSubtext}
          </span>
        </div>
      </div>

      {/* Copy Link Input Bar */}
      <div className="mt-2.5 flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden p-1 shadow-2xs">
        <input
          type="text"
          readOnly
          value={referralLink}
          className="w-full px-2 text-[11px] text-slate-600 bg-transparent outline-none font-mono"
        />
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold rounded-lg transition-colors cursor-pointer shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
              <span className="text-emerald-700">{t.copied}</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>{t.copyLink}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
