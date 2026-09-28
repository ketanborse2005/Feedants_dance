import React from 'react';
import { X, Star, Quote, MessageSquareHeart } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonials: Testimonial[];
}

export const TestimonialsModal: React.FC<TestimonialsModalProps> = ({
  isOpen,
  onClose,
  testimonials,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-[#005c53] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquareHeart className="w-5 h-5 text-teal-200" />
            <div>
              <h3 className="font-extrabold text-sm">Hear From Our Users</h3>
              <span className="text-[11px] text-teal-100">Feedback & Experiences</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-teal-200 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Testimonials List */}
        <div className="p-4 space-y-3.5 overflow-y-auto">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-9 h-9 rounded-full object-cover border border-teal-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      {test.name}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-medium block">
                      {test.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-700 italic leading-relaxed">
                "{test.comment}"
              </p>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/60">
                <span>{test.competition}</span>
                <span>{test.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
