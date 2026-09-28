import React from 'react';
import { Smartphone, Monitor, UserCheck, UserX, Zap, RotateCcw, Clock, Sparkles } from 'lucide-react';
import { CompetitionStatus } from '../types';

interface DevInspectorToolbarProps {
  isMobileFrame: boolean;
  onToggleFrame: () => void;
  activeUserId: string;
  onSwitchUser: (userId: string) => void;
  currentLifecycle: CompetitionStatus;
  onChangeLifecycle: (status: CompetitionStatus) => void;
  onOpenConcurrencyTester: () => void;
  onResetData: () => void;
  isRegistered: boolean;
}

export const DevInspectorToolbar: React.FC<DevInspectorToolbarProps> = ({
  isMobileFrame,
  onToggleFrame,
  activeUserId,
  onSwitchUser,
  currentLifecycle,
  onChangeLifecycle,
  onOpenConcurrencyTester,
  onResetData,
  isRegistered,
}) => {
  return (
    <div className="w-full bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-3 flex flex-wrap items-center justify-between gap-3 shadow-md z-40 select-none">
      {/* Left: Branding & Status */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-teal-900/60 text-teal-300 rounded-md border border-teal-700/60 font-bold text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>Feedants Evaluator Panel</span>
        </div>

        {/* View Frame Mode */}
        <button
          onClick={onToggleFrame}
          className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-md font-medium text-slate-300 transition-colors cursor-pointer border border-slate-700 text-[11px]"
          title="Toggle Mobile Simulator vs Responsive View"
        >
          {isMobileFrame ? (
            <>
              <Monitor className="w-3.5 h-3.5 text-blue-400" />
              <span>Full View</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-teal-400" />
              <span>Mobile Frame</span>
            </>
          )}
        </button>
      </div>

      {/* Middle: User Persona & Lifecycle */}
      <div className="flex flex-wrap items-center gap-2">
        {/* User Persona Switcher */}
        <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
          <button
            onClick={() => onSwitchUser('user_ketan_101')}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
              activeUserId === 'user_ketan_101'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3 h-3 text-teal-300" />
            <span>Ketan (Registered)</span>
          </button>
          <button
            onClick={() => onSwitchUser('user_guest_202')}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
              activeUserId === 'user_guest_202'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserX className="w-3 h-3 text-slate-400" />
            <span>Guest (Unregistered)</span>
          </button>
        </div>

        {/* Lifecycle Selector */}
        <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
          <Clock className="w-3 h-3 text-amber-400" />
          <span className="text-[10px] text-slate-400 font-bold">Phase:</span>
          <select
            value={currentLifecycle}
            onChange={(e) => onChangeLifecycle(e.target.value as CompetitionStatus)}
            className="bg-transparent text-[11px] font-bold text-amber-300 outline-none cursor-pointer"
          >
            <option value="REGISTRATION_OPEN" className="bg-slate-900 text-slate-200">
              1. Registration Open
            </option>
            <option value="SUBMISSION_OPEN" className="bg-slate-900 text-slate-200">
              2. Submission Open
            </option>
            <option value="JUDGING" className="bg-slate-900 text-slate-200">
              3. Judging Phase
            </option>
            <option value="COMPLETED" className="bg-slate-900 text-slate-200">
              4. Results Declared
            </option>
            <option value="SOLDOUT" className="bg-slate-900 text-slate-200">
              5. Sold Out (20/20)
            </option>
          </select>
        </div>
      </div>

      {/* Right: Concurrency Tester & Reset */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenConcurrencyTester}
          className="flex items-center gap-1 px-2.5 py-1 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 rounded-md font-extrabold text-[11px] transition-all cursor-pointer shadow-xs"
          title="Test race conditions & atomic spot locking"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Load Test Concurrency</span>
        </button>

        <button
          onClick={onResetData}
          className="flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white rounded-md font-medium text-[11px] transition-colors cursor-pointer border border-slate-700"
          title="Reset database to initial screenshot state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};
