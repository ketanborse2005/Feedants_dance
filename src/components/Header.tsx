import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onGoBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, onGoBack }) => {
  const t = translations[language];

  return (
    <div className="w-full flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-100/60 sticky top-0 z-30">
      {/* Left: Go back */}
      <button
        onClick={onGoBack}
        className="flex items-center gap-2 text-slate-900 hover:text-teal-800 transition-colors font-bold text-[15px] active:scale-95 cursor-pointer"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        <span>{t.goBack}</span>
      </button>

      {/* Right: Language switch pill */}
      <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80">
        <button
          onClick={() => onLanguageChange('en')}
          className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
            language === 'en'
              ? 'bg-[#005c53] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          ENG
        </button>
        <button
          onClick={() => onLanguageChange('hi')}
          className={`px-3 py-1 rounded-md text-xs font-semibold font-hindi transition-all cursor-pointer ${
            language === 'hi'
              ? 'bg-[#005c53] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          हिंदी
        </button>
      </div>
    </div>
  );
};
