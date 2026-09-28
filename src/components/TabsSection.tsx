import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Scale } from 'lucide-react';
import { CompetitionData, Language } from '../types';
import { translations } from '../translations';

interface TabsSectionProps {
  competition: CompetitionData;
  language: Language;
}

export const TabsSection: React.FC<TabsSectionProps> = ({ competition, language }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'judging' | 'rules'>('about');
  const [isExpanded, setIsExpanded] = useState(false);
  const t = translations[language];

  return (
    <div className="mx-4 mt-5 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
      {/* Tab Navigation Header */}
      <div className="flex items-center justify-between border-b border-slate-200 text-[13px] font-semibold">
        <button
          onClick={() => setActiveTab('about')}
          className={`pb-2.5 px-1 relative transition-colors cursor-pointer ${
            activeTab === 'about'
              ? 'text-[#005c53] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {t.aboutTab}
          {activeTab === 'about' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#005c53] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('judging')}
          className={`pb-2.5 px-1 relative transition-colors cursor-pointer ${
            activeTab === 'judging'
              ? 'text-[#005c53] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {t.judgingTab}
          {activeTab === 'judging' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#005c53] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('rules')}
          className={`pb-2.5 px-1 relative transition-colors cursor-pointer ${
            activeTab === 'rules'
              ? 'text-[#005c53] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {t.rulesTab}
          {activeTab === 'rules' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#005c53] rounded-full" />
          )}
        </button>
      </div>

      {/* Tab 1: About Competition */}
      {activeTab === 'about' && (
        <div className="mt-3.5 text-xs text-slate-600 leading-relaxed">
          <p className="font-normal text-slate-700">
            {language === 'hi'
              ? 'यह सभी आयु समूहों के लिए खुली एक ऑनलाइन शास्त्रीय नृत्य प्रतियोगिता है। कहीं से भी भाग लें और अपनी प्रतिभा का प्रदर्शन करें। पारंपरिक नृत्य के माध्यम से अपने जुनून को व्यक्त करें।'
              : competition.about.shortText}
          </p>

          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-slate-600 animate-fadeIn">
              {competition.about.fullText.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-2.5">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-[#006d63] hover:text-[#00544c] font-bold text-xs cursor-pointer py-1 transition-colors"
            >
              <span>{isExpanded ? t.viewLess : t.viewMore}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Judging Parameters */}
      {activeTab === 'judging' && (
        <div className="mt-3.5 space-y-2.5 text-xs animate-fadeIn">
          <div className="flex items-center gap-1.5 text-teal-800 font-semibold mb-1">
            <Scale className="w-4 h-4 text-teal-600" />
            <span>Official Scoring Matrix (Total: 100 Points)</span>
          </div>
          {competition.judgingParameters.map((param, idx) => (
            <div key={idx} className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>{param.title}</span>
                <span className="px-2 py-0.5 bg-teal-50 text-teal-800 rounded-md text-[11px] font-bold border border-teal-200">
                  {param.weightage}
                </span>
              </div>
              <p className="text-[11.5px] text-slate-500 mt-1 leading-normal">
                {param.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Rules & Eligibility */}
      {activeTab === 'rules' && (
        <div className="mt-3.5 space-y-3 text-xs animate-fadeIn">
          {competition.rulesAndEligibility.map((cat, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-slate-900 mb-1.5">{cat.title}</h4>
              <ul className="space-y-1.5">
                {cat.rules.map((rule, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2 text-slate-600 leading-normal">
                    <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
