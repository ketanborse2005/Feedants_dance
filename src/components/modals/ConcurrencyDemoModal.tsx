import React, { useState } from 'react';
import { X, Zap, CheckCircle2, XCircle, ShieldAlert, RefreshCw } from 'lucide-react';
import { CompetitionData } from '../../types';

interface ConcurrencyDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  competition: CompetitionData;
  onStateUpdated: () => void;
}

export const ConcurrencyDemoModal: React.FC<ConcurrencyDemoModalProps> = ({
  isOpen,
  onClose,
  competition,
  onStateUpdated,
}) => {
  const [userCount, setUserCount] = useState<number>(10);
  const [isRunning, setIsRunning] = useState(false);
  const [simResults, setSimResults] = useState<any | null>(null);

  if (!isOpen) return null;

  const runSimulation = async () => {
    setIsRunning(true);
    setSimResults(null);

    try {
      const response = await fetch(
        `/api/competitions/${competition._id}/simulate-concurrency`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ count: userCount }),
        }
      );
      const data = await response.json();
      setSimResults(data.data);
      onStateUpdated();
    } catch (err) {
      console.error('Concurrency simulation failed:', err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-extrabold text-sm">
                High Concurrency Load Tester (Race-Condition Proof)
              </h3>
              <span className="text-[11px] text-slate-400">
                Simulates simultaneous registrations hitting Express + MongoDB Mutex
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 overflow-y-auto text-xs text-slate-700">
          <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-900 text-xs leading-relaxed">
            <span className="font-bold">Production Verification:</span> Demonstrates
            atomic spot reservation with mutex serialization and MongoDB{' '}
            <code className="bg-teal-100 px-1 py-0.5 rounded font-mono text-[11px]">
              $inc
            </code>{' '}
            behavior. When spots reach limit (20), subsequent concurrent requests are
            safely rejected without over-booking.
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="font-bold text-slate-900 block">
                Concurrent Users to Dispatch
              </span>
              <span className="text-[11px] text-slate-500">
                Current spots left: {Math.max(0, competition.totalSpots - competition.bookedSpots)} / {competition.totalSpots}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {[5, 10, 20].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setUserCount(num)}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition-colors ${
                    userCount === num
                      ? 'bg-[#005c53] text-white shadow-xs'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {num} Users
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={runSimulation}
            disabled={isRunning}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 active:scale-98 text-slate-950 font-extrabold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
            <span>
              {isRunning
                ? 'Firing Concurrent Requests...'
                : `Dispatch ${userCount} Simultaneous Registration Requests`}
            </span>
          </button>

          {/* Results Display */}
          {simResults && (
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 bg-slate-100 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-bold block">
                    Attempted
                  </span>
                  <span className="text-lg font-extrabold text-slate-800">
                    {simResults.totalAttempted}
                  </span>
                </div>
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="text-[10px] text-emerald-700 font-bold block">
                    Spots Booked
                  </span>
                  <span className="text-lg font-extrabold text-emerald-700">
                    {simResults.successCount}
                  </span>
                </div>
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl">
                  <span className="text-[10px] text-rose-700 font-bold block">
                    Rejected / Sold Out
                  </span>
                  <span className="text-lg font-extrabold text-rose-700">
                    {simResults.failedCount}
                  </span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl max-h-48 overflow-y-auto p-2 bg-slate-900 text-slate-200 font-mono text-[11px] space-y-1">
                {simResults.results.map((r: any, idx: number) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between py-0.5 border-b border-slate-800/60 ${
                      r.success ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    <span className="truncate max-w-[200px]">{r.userId}</span>
                    <span>{r.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
