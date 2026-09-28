import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Smartphone, CheckCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CompetitionData } from '../../types';

interface RazorpayCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  competition: CompetitionData;
  onSuccess: (data: any) => void;
}

export const RazorpayCheckoutModal: React.FC<RazorpayCheckoutModalProps> = ({
  isOpen,
  onClose,
  competition,
  onSuccess,
}) => {
  const [userName, setUserName] = useState('Ketan Borse');
  const [userEmail, setUserEmail] = useState('ketanborse101@gmail.com');
  const [phone, setPhone] = useState('+91 9876543210');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [upiId, setUpiId] = useState('ketan@oksbi');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/competitions/${competition._id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'user_ketan_101',
          userName,
          userEmail,
          phone,
          paymentMethod: paymentMethod === 'upi' ? `UPI_${upiId}` : 'CARD',
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error || 'Payment or registration failed.');
        setIsLoading(false);
        return;
      }

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      onSuccess(result.data);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        {/* Header with Razorpay Branding */}
        <div className="bg-[#0c2340] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-black italic">
              R
            </div>
            <div>
              <span className="text-[11px] text-blue-200 uppercase font-semibold tracking-wider block">
                Razorpay Checkout
              </span>
              <h3 className="text-sm font-bold leading-tight">
                {competition.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Banner */}
        <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Total Payable</span>
            <div className="text-2xl font-extrabold text-[#005c53]">₹ {competition.entryFee}</div>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Refundable</span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePay} className="p-5 space-y-4">
          {error && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          <div className="space-y-2.5">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-teal-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-teal-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-teal-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
              Select Payment Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'border-teal-600 bg-teal-50/70 text-[#005c53]'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>UPI / QR</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-teal-600 bg-teal-50/70 text-[#005c53]'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Card / NetBanking</span>
              </button>
            </div>
          </div>

          {paymentMethod === 'upi' && (
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Virtual Payment Address (UPI ID)
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="username@okhdfcbank"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-teal-600 focus:outline-none"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#005c53] hover:bg-[#004740] active:scale-98 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Pay ₹{competition.entryFee} & Confirm Spot</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 text-center">
            <ShieldCheck className="w-3 h-3 text-slate-400" />
            <span>256-Bit SSL Encrypted • Razorpay Certified Gateway</span>
          </div>
        </form>
      </div>
    </div>
  );
};
