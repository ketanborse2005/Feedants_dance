import React from 'react';
import { Megaphone } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface AdBannerProps {
  language: Language;
}

export const AdBanner: React.FC<AdBannerProps> = ({ language }) => {
  const t = translations[language];

  return (
    <div className="mx-4 mt-3 mb-4">
      <div className="w-full py-2.5 px-4 bg-slate-50/80 border border-dashed border-slate-300 rounded-xl flex items-center justify-center gap-2 text-slate-400 text-xs font-medium">
        <Megaphone className="w-3.5 h-3.5" />
        <span>{t.adHere}</span>
      </div>
    </div>
  );
};
