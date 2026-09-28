import React from 'react';
import { Calendar, Send, Upload, Trophy } from 'lucide-react';
import { ImportantDates, Language } from '../types';
import { translations } from '../translations';

interface ImportantDatesGridProps {
  dates: ImportantDates;
  language: Language;
}

export const ImportantDatesGrid: React.FC<ImportantDatesGridProps> = ({ dates, language }) => {
  const t = translations[language];

  return (
    <div className="mx-4 mt-4">
      {/* Title */}
      <h2 className="text-[14px] font-extrabold text-slate-900 mb-2 tracking-tight">
        {t.importantDates}
      </h2>

      {/* 2x2 Grid Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
        <div className="grid grid-cols-2 divide-x divide-slate-100">
          {/* 1. Register Before */}
          <div className="p-3.5 flex items-start gap-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#00897b] flex items-center justify-center shrink-0 border border-teal-100/80">
              <Calendar className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[10.5px] font-medium text-slate-500 block leading-tight">
                {t.registerBefore}
              </span>
              <span className="text-[13px] font-bold text-slate-900 block mt-0.5 leading-tight">
                {language === 'hi' ? '10 अग 26' : '10 Aug 26'}
              </span>
              <span className="text-[11px] font-medium text-slate-500 block leading-tight mt-0.5">
                11:50 PM
              </span>
            </div>
          </div>

          {/* 2. Submission Starts */}
          <div className="p-3.5 flex items-start gap-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#00897b] flex items-center justify-center shrink-0 border border-teal-100/80">
              <Send className="w-4 h-4 stroke-[2.2] -rotate-12 translate-x-0.5" />
            </div>
            <div>
              <span className="text-[10.5px] font-medium text-slate-500 block leading-tight">
                {t.submissionStarts}
              </span>
              <span className="text-[13px] font-bold text-slate-900 block mt-0.5 leading-tight">
                {language === 'hi' ? '6 अग 26' : '6 Aug 26'}
              </span>
              <span className="text-[11px] font-medium text-slate-500 block leading-tight mt-0.5">
                04:00 AM
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x divide-slate-100">
          {/* 3. Submission Ends */}
          <div className="p-3.5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#00897b] flex items-center justify-center shrink-0 border border-teal-100/80">
              <Upload className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[10.5px] font-medium text-slate-500 block leading-tight">
                {t.submissionEnds}
              </span>
              <span className="text-[13px] font-bold text-slate-900 block mt-0.5 leading-tight">
                {language === 'hi' ? '30 अग 26' : '30 Aug 26'}
              </span>
              <span className="text-[11px] font-medium text-slate-500 block leading-tight mt-0.5">
                11:55 PM
              </span>
            </div>
          </div>

          {/* 4. Result Date */}
          <div className="p-3.5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#00897b] flex items-center justify-center shrink-0 border border-teal-100/80">
              <Trophy className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[10.5px] font-medium text-slate-500 block leading-tight">
                {t.resultDate}
              </span>
              <span className="text-[13px] font-bold text-slate-900 block mt-0.5 leading-tight">
                {language === 'hi' ? '1 सित 26' : '1 Sept 26'}
              </span>
              <span className="text-[11px] font-medium text-slate-500 block leading-tight mt-0.5">
                11:50 PM
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
