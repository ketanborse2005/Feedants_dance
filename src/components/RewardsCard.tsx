import React from 'react';
import { Trophy, Medal, Star } from 'lucide-react';
import { RewardItem, Language } from '../types';
import { translations } from '../translations';

interface RewardsCardProps {
  rewards: RewardItem[];
  language: Language;
}

export const RewardsCard: React.FC<RewardsCardProps> = ({ rewards, language }) => {
  const t = translations[language];

  const renderIcon = (type: RewardItem['iconType'], position: number) => {
    switch (type) {
      case 'trophy':
        return (
          <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Trophy className="w-4 h-4 stroke-[2.2]" />
          </div>
        );
      case 'silver':
        return (
          <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <Medal className="w-4 h-4 stroke-[2.2]" />
          </div>
        );
      case 'bronze':
        return (
          <div className="w-6 h-6 rounded-md bg-amber-100/70 text-amber-700 flex items-center justify-center shrink-0">
            <Medal className="w-4 h-4 stroke-[2.2]" />
          </div>
        );
      case 'star':
      default:
        return (
          <div className="w-6 h-6 rounded-md bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <Star className="w-4 h-4 stroke-[2]" />
          </div>
        );
    }
  };

  const formatWinnerLabel = (position: number, fallback: string) => {
    if (language === 'hi') {
      return `${position}वां स्थान विजेता`;
    }
    return fallback;
  };

  return (
    <div className="mx-4 mt-4 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
      {/* Title */}
      <div className="flex items-center gap-1.5 mb-3">
        <h3 className="text-[14px] font-extrabold text-slate-900 tracking-tight">
          {t.rewardsTitle}
        </h3>
        <span className="text-[12px] font-medium text-slate-500">
          {t.allPositions}
        </span>
      </div>

      {/* Rewards List */}
      <div className="space-y-2.5">
        {rewards.map((reward) => (
          <div
            key={reward.position}
            className="flex items-center justify-between py-1 text-xs"
          >
            <div className="flex items-center gap-2.5">
              {renderIcon(reward.iconType, reward.position)}
              <span className="font-bold text-slate-800 text-[12.5px]">
                {formatWinnerLabel(reward.position, reward.label)}
              </span>
            </div>

            <div className="font-extrabold text-[#005c53] text-[13px] tracking-tight">
              ₹ {reward.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
