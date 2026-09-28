import React from 'react';
import { Play } from 'lucide-react';
import { Judge, Language } from '../types';
import { translations } from '../translations';

interface JudgeCardProps {
  judge: Judge;
  language: Language;
  onPlayVideo: (videoUrl: string, title: string) => void;
}

export const JudgeCard: React.FC<JudgeCardProps> = ({ judge, language, onPlayVideo }) => {
  const t = translations[language];

  return (
    <div className="mx-4 mt-3 p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex items-center justify-between gap-3">
      {/* Avatar & Info */}
      <div className="flex items-center gap-3">
        <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-teal-100 shadow-2xs">
          <img
            src={judge.avatar}
            alt={judge.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image fails to load
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80';
            }}
          />
        </div>

        <div className="flex flex-col">
          <span className="text-[11px] text-slate-400 font-medium leading-none">
            {t.judge}
          </span>
          <span className="text-[15px] font-extrabold text-slate-900 mt-1 leading-tight">
            {judge.name}
          </span>
          <span className="text-[11.5px] font-medium text-slate-600 mt-0.5">
            {language === 'hi' ? 'पेशेवर कथक नृत्यांगना' : judge.title}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            {language === 'hi' ? '12+ वर्षों का अनुभव' : judge.experience}
          </span>
        </div>
      </div>

      {/* Intro Video Trigger */}
      <button
        onClick={() => onPlayVideo(judge.introVideoUrl, `${judge.name} - Intro Video`)}
        className="flex flex-col items-center justify-center gap-1 group cursor-pointer hover:opacity-90 active:scale-95 transition-all p-1"
        aria-label="Play intro video"
      >
        <div className="w-10 h-10 rounded-full bg-[#E0F4F2] text-[#00897b] flex items-center justify-center group-hover:bg-[#bcece7] transition-colors shadow-2xs">
          <Play className="w-4 h-4 fill-current ml-0.5" />
        </div>
        <span className="text-[10.5px] font-medium text-slate-600 tracking-tight">
          {t.introVideo}
        </span>
      </button>
    </div>
  );
};
