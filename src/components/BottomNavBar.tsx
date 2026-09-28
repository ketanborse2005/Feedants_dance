import React from 'react';
import { Home, Search, Plus, Trophy } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface BottomNavBarProps {
  language: Language;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  userAvatar?: string;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  language,
  activeTab = 'competitions',
  onTabChange,
  userAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
}) => {
  const t = translations[language];

  return (
    <div className="w-full bg-white border-t border-slate-100 px-3 py-2 flex items-center justify-between text-slate-400 select-none">
      {/* 1. Home */}
      <button
        onClick={() => onTabChange?.('home')}
        className={`flex-1 flex flex-col items-center gap-0.5 py-0.5 cursor-pointer transition-colors ${
          activeTab === 'home' ? 'text-[#005c53]' : 'hover:text-slate-600'
        }`}
      >
        <Home className="w-5 h-5 stroke-[2]" />
        <span className="text-[10px] font-medium leading-none">{t.home}</span>
      </button>

      {/* 2. Explore */}
      <button
        onClick={() => onTabChange?.('explore')}
        className={`flex-1 flex flex-col items-center gap-0.5 py-0.5 cursor-pointer transition-colors ${
          activeTab === 'explore' ? 'text-[#005c53]' : 'hover:text-slate-600'
        }`}
      >
        <Search className="w-5 h-5 stroke-[2]" />
        <span className="text-[10px] font-medium leading-none">{t.explore}</span>
      </button>

      {/* 3. Center Create Plus Button */}
      <div className="flex-1 flex justify-center items-center">
        <button
          onClick={() => onTabChange?.('create')}
          className="w-10 h-10 -mt-2 rounded-full bg-[#005c53] hover:bg-[#004740] active:scale-95 text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
          aria-label="Create submission"
        >
          <Plus className="w-6 h-6 stroke-[2.8]" />
        </button>
      </div>

      {/* 4. Competitions (Active) */}
      <button
        onClick={() => onTabChange?.('competitions')}
        className={`flex-1 flex flex-col items-center gap-0.5 py-0.5 cursor-pointer transition-colors ${
          activeTab === 'competitions' ? 'text-[#005c53] font-bold' : 'hover:text-slate-600'
        }`}
      >
        <Trophy className="w-5 h-5 stroke-[2.2]" />
        <span className="text-[10px] font-bold leading-none">{t.competitions}</span>
      </button>

      {/* 5. Profile */}
      <button
        onClick={() => onTabChange?.('profile')}
        className={`flex-1 flex flex-col items-center gap-0.5 py-0.5 cursor-pointer transition-colors ${
          activeTab === 'profile' ? 'text-[#005c53]' : 'hover:text-slate-600'
        }`}
      >
        <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-300">
          <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <span className="text-[10px] font-medium leading-none">{t.profile}</span>
      </button>
    </div>
  );
};
