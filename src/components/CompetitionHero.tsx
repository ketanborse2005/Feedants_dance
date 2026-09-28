import React from 'react';
import { Award, Users, CheckCircle2 } from 'lucide-react';
import { CompetitionData, Language, UserState } from '../types';
import { translations } from '../translations';

interface CompetitionHeroProps {
  competition: CompetitionData;
  userState: UserState;
  language: Language;
  onOpenRegisterModal?: () => void;
}

export const CompetitionHero: React.FC<CompetitionHeroProps> = ({
  competition,
  userState,
  language,
  onOpenRegisterModal,
}) => {
  const t = translations[language];

  const totalSpots = competition.totalSpots || 20;
  const bookedSpots = competition.bookedSpots || 1;
  const spotsLeft = Math.max(0, totalSpots - bookedSpots);
  const fillPercentage = Math.min(100, Math.round((bookedSpots / totalSpots) * 100));

  return (
    <div className="w-full px-4 pt-4 pb-2 bg-white">
      {/* Title & Registration Status Badge */}
      <div className="flex items-start justify-between gap-3">
        <h1 className="text-[21px] font-extrabold text-slate-900 leading-tight tracking-tight">
          {language === 'hi' ? 'फ़ीडैंट्स क्लासिकल डांस' : competition.title}
        </h1>

        {userState.isRegistered ? (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#E6F7F5] border border-[#a2e0d8] rounded-lg text-[#006d63] text-xs font-bold shrink-0 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.8] text-[#00897b]" />
            <span>{t.registered}</span>
          </div>
        ) : (
          <button
            onClick={onOpenRegisterModal}
            className="flex items-center gap-1.5 px-3 py-1 bg-teal-50 hover:bg-teal-100 border border-teal-300 rounded-lg text-teal-800 text-xs font-bold shrink-0 transition-colors cursor-pointer"
          >
            <span>{t.registerNow}</span>
          </button>
        )}
      </div>

      {/* Tags & Certificate Row */}
      <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
        <span className="px-2.5 py-0.5 bg-slate-100/90 text-slate-700 rounded-md border border-slate-200 text-[11px] font-medium">
          {t.dance}
        </span>
        <span className="px-2.5 py-0.5 bg-slate-100/90 text-slate-700 rounded-md border border-slate-200 text-[11px] font-medium">
          {t.multiWin}
        </span>
        <div className="flex items-center gap-1 text-[#007a6e] font-semibold text-[12px]">
          <Award className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>{t.certificateText}</span>
        </div>
      </div>

      {/* Prize Pool, Entry Fee & Spots Row */}
      <div className="grid grid-cols-12 items-end mt-4 pt-2">
        {/* Prize Pool */}
        <div className="col-span-4">
          <span className="text-[11px] font-medium text-slate-500 block">
            {t.prizePool}
          </span>
          <div className="text-[23px] font-extrabold text-[#005c53] tracking-tight leading-none mt-1">
            ₹ {competition.prizePool.toLocaleString()}
          </div>
        </div>

        {/* Entry Fee */}
        <div className="col-span-3">
          <span className="text-[11px] font-medium text-slate-500 block">
            {t.entryFee}
          </span>
          <div className="text-[21px] font-extrabold text-slate-900 tracking-tight leading-none mt-1">
            ₹ {competition.entryFee}
          </div>
        </div>

        {/* Spots Left & Progress Bar */}
        <div className="col-span-5 flex flex-col items-end">
          <div className="flex items-center gap-1 text-[#005c53] text-[12px] font-bold">
            <Users className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>{t.spotsLeft(spotsLeft)}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#e0f2f1] h-1.5 rounded-full overflow-hidden mt-1.5">
            <div
              className="bg-[#00897b] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(5, fillPercentage)}%` }}
            />
          </div>

          <span className="text-[10px] text-slate-500 font-medium mt-1">
            {t.spotsBooked(bookedSpots, totalSpots)}
          </span>
        </div>
      </div>
    </div>
  );
};
