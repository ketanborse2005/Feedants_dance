import React from 'react';
import { MessageSquareText, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface UserTestimonialsProps {
  language: Language;
  onOpenTestimonials: () => void;
}

export const UserTestimonials: React.FC<UserTestimonialsProps> = ({
  language,
  onOpenTestimonials,
}) => {
  const t = translations[language];

  return (
    <div className="mx-4 mt-3">
      <button
        onClick={onOpenTestimonials}
        className="w-full p-3.5 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-between text-left hover:border-teal-300 transition-colors shadow-2xs cursor-pointer active:scale-99 group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
            <MessageSquareText className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <h4 className="text-[13px] font-extrabold text-slate-900 leading-tight">
              {t.hearFromUsers}
            </h4>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
              {t.hearSubtext}
            </span>
          </div>
        </div>

        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all" />
      </button>
    </div>
  );
};
