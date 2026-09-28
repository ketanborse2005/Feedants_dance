import React, { useState } from 'react';
import { X, Upload, Video, CheckCircle, AlertCircle, FileVideo, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CompetitionData, SubmissionRecord } from '../../types';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  competition: CompetitionData;
  existingSubmission: SubmissionRecord | null;
  onSuccess: (data: SubmissionRecord) => void;
}

export const SubmissionModal: React.FC<SubmissionModalProps> = ({
  isOpen,
  onClose,
  competition,
  existingSubmission,
  onSuccess,
}) => {
  const [title, setTitle] = useState(
    existingSubmission?.title || 'Kathak Tarana in Teental - Drut Laya'
  );
  const [danceForm, setDanceForm] = useState(existingSubmission?.danceForm || 'Kathak');
  const [videoUrl, setVideoUrl] = useState(
    existingSubmission?.videoUrl ||
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  );
  const [description, setDescription] = useState(
    existingSubmission?.description ||
      'Traditional Lucknow Gharana presentation exploring crisp tatkar and chakradars.'
  );
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError('Please certify that your performance complies with the rules.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/competitions/${competition._id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'user_ketan_101',
          title,
          danceForm,
          videoUrl,
          description,
          durationSec: 195,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error || 'Submission failed.');
        setIsSubmitting(false);
        return;
      }

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });

      onSuccess(result.data);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSampleVideo = (url: string, name: string) => {
    setVideoUrl(url);
    setTitle(name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#005c53] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-teal-200" />
            <div>
              <h3 className="font-extrabold text-sm">
                {existingSubmission ? 'Edit Your Dance Submission' : 'Upload Dance Submission'}
              </h3>
              <span className="text-[11px] text-teal-100">
                {competition.title}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-teal-100 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
          {error && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
              {error}
            </div>
          )}

          {/* Performance Title */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Performance Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Kathak Tarana in Teental"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-teal-600 focus:outline-none"
            />
          </div>

          {/* Dance Form Selector */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Classical Dance Style
            </label>
            <select
              value={danceForm}
              onChange={(e) => setDanceForm(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-teal-600 focus:outline-none bg-white"
            >
              <option value="Kathak">Kathak (Jaipur / Lucknow / Banaras)</option>
              <option value="Bharatanatyam">Bharatanatyam (Kalakshetra / Pandanallur)</option>
              <option value="Odissi">Odissi</option>
              <option value="Kuchipudi">Kuchipudi</option>
              <option value="Kathakali">Kathakali</option>
              <option value="Mohiniyattam">Mohiniyattam</option>
              <option value="Manipuri">Manipuri</option>
              <option value="Sattriya">Sattriya</option>
            </select>
          </div>

          {/* Video Preview & Link */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Performance Video Link / Cloud Storage URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="url"
                required
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-teal-600 focus:outline-none font-mono text-[11px]"
              />
            </div>
            
            {/* Quick Demo Previews */}
            <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-slate-500">
              <Sparkles className="w-3 h-3 text-teal-600" />
              <span>Select sample preview:</span>
              <button
                type="button"
                onClick={() => handleSampleVideo('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'Kathak Teental Tarana')}
                className="text-teal-700 underline hover:text-teal-900 cursor-pointer font-medium"
              >
                Kathak Clip
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleSampleVideo('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 'Bharatanatyam Varnam')}
                className="text-teal-700 underline hover:text-teal-900 cursor-pointer font-medium"
              >
                Bharatanatyam
              </button>
            </div>
          </div>

          {/* Live Video Preview Box */}
          {videoUrl && (
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-black aspect-video max-h-44">
              <video
                src={videoUrl}
                controls
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Choreography Notes / Gharana / Composer (Optional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide context regarding tala, laya, or guru parampara..."
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-teal-600 focus:outline-none"
            />
          </div>

          {/* Verification Checkbox */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-600 leading-snug">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
              />
              <span>
                I confirm this entry is recorded in a single continuous unedited take with live/original audio, adhering to Feedants rules.
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-2 py-2.5 bg-[#005c53] hover:bg-[#004740] active:scale-98 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isSubmitting ? 'Uploading...' : 'Submit Entry'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
