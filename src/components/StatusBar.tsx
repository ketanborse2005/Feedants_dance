import React from 'react';
import { Wifi, Battery } from 'lucide-react';

export const StatusBar: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-between px-6 pt-3 pb-2 text-slate-900 select-none bg-white text-xs font-semibold tracking-tight">
      <div className="font-semibold text-sm">9:41</div>
      <div className="flex items-center gap-1.5">
        {/* Signal Bars */}
        <div className="flex items-end gap-0.5 h-3">
          <div className="w-0.5 h-1.5 bg-slate-900 rounded-sm"></div>
          <div className="w-0.5 h-2 bg-slate-900 rounded-sm"></div>
          <div className="w-0.5 h-2.5 bg-slate-900 rounded-sm"></div>
          <div className="w-0.5 h-3 bg-slate-900 rounded-sm"></div>
        </div>
        <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
        <div className="flex items-center">
          <Battery className="w-5 h-3.5 stroke-[2.2] fill-slate-900" />
        </div>
      </div>
    </div>
  );
};
