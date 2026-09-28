import React from 'react';
import { Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { CompetitionData, Language, UserState } from '../types';
import { translations } from '../translations';

interface BottomActionBarProps {
  competition: CompetitionData;
  userState: UserState;
  language: Language;
  onUploadSubmission: () => void;
  onRegisterNow: () => void;
}

export const BottomActionBar: React.FC<BottomActionBarProps> = ({
  competition,
  userState,
  language,
  onUploadSubmission,
  onRegisterNow,
}) => {
  const t = translations[language];
  const spotsLeft = Math.max(0, competition.totalSpots - competition.bookedSpots);
  const isSoldOut = spotsLeft === 0;

  if (userState.isRegistered) {
    if (userState.isSubmitted) {
      return (
        <div className="w-full px-4 pt-2 pb-1 bg-white/95 backdrop-blur-xs border-t border-slate-100">
          <button
            onClick={onUploadSubmission}
            className="w-full py-2.5 px-4 bg-[#005c53] hover:bg-[#004740] active:scale-98 text-white rounded-xl shadow-md transition-all cursor-pointer flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-1.5 font-extrabold text-[14px]">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>{language === 'hi' ? 'प्रस्तुति अपडेट करें' : 'View / Edit Submission'}</span>
            </div>
            <span className="text-[10px] text-teal-200 font-medium">
              {language === 'hi' ? 'सफलतापूर्वक जमा किया गया' : 'Submission Under Review'}
            </span>
          </button>
        </div>
      );
    }

    return (
      <div className="w-full px-4 pt-2 pb-1 bg-white/95 backdrop-blur-xs border-t border-slate-100">
        <button
          onClick={onUploadSubmission}
          className="w-full py-2.5 px-4 bg-[#005c53] hover:bg-[#004740] active:scale-98 text-white rounded-xl shadow-md transition-all cursor-pointer flex flex-col items-center justify-center"
        >
          <span className="font-extrabold text-[14px] tracking-tight">
            {t.uploadSubmission}
          </span>
          <span className="text-[10.5px] text-teal-200 font-medium tracking-wide">
            {t.registeredSuccess}
          </span>
        </button>
      </div>
    );
  }

  // Not Registered State
  return (
    <div className="w-full px-4 pt-2 pb-1 bg-white/95 backdrop-blur-xs border-t border-slate-100">
      <button
        disabled={isSoldOut}
        onClick={onRegisterNow}
        className={`w-full py-2.5 px-4 rounded-xl shadow-md transition-all flex flex-col items-center justify-center cursor-pointer active:scale-98 ${
          isSoldOut
            ? 'bg-slate-400 text-white cursor-not-allowed'
            : 'bg-[#005c53] hover:bg-[#004740] text-white'
        }`}
      >
        <span className="font-extrabold text-[14px] tracking-tight">
          {isSoldOut ? t.soldOut : `${t.registerNow} - ₹${competition.entryFee}`}
        </span>
        <span className="text-[10.5px] text-teal-200 font-medium">
          {isSoldOut ? 'No spots remaining' : t.spotsLeft(spotsLeft)}
        </span>
      </button>
    </div>
  );
};
