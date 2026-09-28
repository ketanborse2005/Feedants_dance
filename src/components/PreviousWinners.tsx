import React from 'react';
import { Play } from 'lucide-react';
import { PreviousWinner, Language } from '../types';
import { translations } from '../translations';

interface PreviousWinnersProps {
  winners: PreviousWinner[];
  language: Language;
  onPlayVideo: (videoUrl: string, title: string) => void;
}

export const PreviousWinners: React.FC<PreviousWinnersProps> = ({ winners, language, onPlayVideo }) => {
  const t = translations[language];

  return (
    <div className="mt-4">
      {/* Title */}
      <h2 className="text-[14px] font-extrabold text-slate-900 px-4 mb-2.5 tracking-tight">
        {t.previousWinners}
      </h2>

      {/* Horizontal Carousel */}
      <div className="flex items-center gap-3 overflow-x-auto px-4 no-scrollbar pb-1">
        {winners.map((winner) => (
          <div
            key={winner.id}
            onClick={() => onPlayVideo(winner.videoUrl, `${winner.name} - ${winner.rank} (${winner.danceStyle})`)}
            className="flex items-center gap-2.5 p-2 bg-white border border-slate-200/80 rounded-2xl shrink-0 cursor-pointer hover:border-teal-300 transition-all active:scale-98 shadow-2xs group"
          >
            {/* Thumbnail with circular play button */}
            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100">
              <img
                src={winner.imageUrl}
                alt={winner.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-white/90 text-teal-800 flex items-center justify-center shadow-xs">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="pr-2">
              <h3 className="text-[13px] font-bold text-slate-900 leading-tight">
                {winner.name}
              </h3>
              <span className="text-[11px] font-semibold text-[#00897b] block mt-0.5">
                {language === 'hi' ? `${winner.rankNumber}वां स्थान` : winner.rank}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
