import React, { useState, useEffect } from 'react';
import {
  CompetitionData,
  UserState,
  Testimonial,
  Language,
  CompetitionStatus,
  SubmissionRecord,
} from './types';
import { StatusBar } from './components/StatusBar';
import { Header } from './components/Header';
import { CompetitionHero } from './components/CompetitionHero';
import { JudgeCard } from './components/JudgeCard';
import { CountdownTimer } from './components/CountdownTimer';
import { ImportantDatesGrid } from './components/ImportantDatesGrid';
import { PreviousWinners } from './components/PreviousWinners';
import { TabsSection } from './components/TabsSection';
import { RewardsCard } from './components/RewardsCard';
import { TrustAndPolicies } from './components/TrustAndPolicies';
import { ReferralBanner } from './components/ReferralBanner';
import { UserTestimonials } from './components/UserTestimonials';
import { AdBanner } from './components/AdBanner';
import { BottomActionBar } from './components/BottomActionBar';
import { BottomNavBar } from './components/BottomNavBar';
import { DevInspectorToolbar } from './components/DevInspectorToolbar';

// Modals
import { RazorpayCheckoutModal } from './components/modals/RazorpayCheckoutModal';
import { SubmissionModal } from './components/modals/SubmissionModal';
import { VideoPlayerModal } from './components/modals/VideoPlayerModal';
import { RefundPolicyModal } from './components/modals/RefundPolicyModal';
import { TestimonialsModal } from './components/modals/TestimonialsModal';
import { ConcurrencyDemoModal } from './components/modals/ConcurrencyDemoModal';

export default function App() {
  const [competition, setCompetition] = useState<CompetitionData | null>(null);
  const [userState, setUserState] = useState<UserState | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [language, setLanguage] = useState<Language>('en');
  const [activeUserId, setActiveUserId] = useState<string>('user_ketan_101');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(false);
  const [isConcurrencyOpen, setIsConcurrencyOpen] = useState(false);
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    videoUrl: string;
    title: string;
  }>({
    isOpen: false,
    videoUrl: '',
    title: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Fetch initial data
  const fetchData = async () => {
    try {
      const [compRes, stateRes, testRes] = await Promise.all([
        fetch('/api/competitions/comp_classical_dance_2026'),
        fetch(`/api/competitions/comp_classical_dance_2026/user-state?userId=${activeUserId}`),
        fetch('/api/testimonials'),
      ]);

      const compData = await compRes.json();
      const stateData = await stateRes.json();
      const testData = await testRes.json();

      if (compData.success) setCompetition(compData.data);
      if (stateData.success) setUserState(stateData.data);
      if (testData.success) setTestimonials(testData.data);
    } catch (err) {
      console.error('Error fetching competition data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeUserId]);

  const handleRegistrationSuccess = (regData: any) => {
    fetchData();
    showToast('🎉 Registration confirmed! Your spot is secured.');
  };

  const handleSubmissionSuccess = (submission: SubmissionRecord) => {
    fetchData();
    showToast('✨ Dance submission uploaded successfully! Good luck.');
  };

  const handleSwitchUser = (userId: string) => {
    setActiveUserId(userId);
    showToast(`Switched active persona to ${userId === 'user_ketan_101' ? 'Ketan (Registered)' : 'Guest (Unregistered)'}`);
  };

  const handleChangeLifecycle = async (status: CompetitionStatus) => {
    try {
      const res = await fetch('/api/competitions/comp_classical_dance_2026/lifecycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lifecycleState: status,
          spotsOverride: status === 'SOLDOUT' ? 20 : undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCompetition(data.data);
        fetchData();
        showToast(`Lifecycle phase switched to ${status}`);
      }
    } catch (err) {
      console.error('Lifecycle change failed:', err);
    }
  };

  const handleResetData = async () => {
    try {
      const res = await fetch('/api/competitions/comp_classical_dance_2026/reset', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        setCompetition(data.data.competition);
        setUserState(data.data.userState);
        showToast('🔄 Competition reset to original reference screenshot state');
      }
    } catch (err) {
      console.error('Reset failed:', err);
    }
  };

  const handlePlayVideo = (videoUrl: string, title: string) => {
    setVideoModal({
      isOpen: true,
      videoUrl,
      title,
    });
  };

  if (isLoading || !competition || !userState) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-teal-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-700">
            Loading Feedants Competition Engine...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200/90 text-slate-900 flex flex-col font-sans">
      {/* Evaluator & Dev Inspector Toolbar on Top */}
      <DevInspectorToolbar
        isMobileFrame={isMobileFrame}
        onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
        activeUserId={activeUserId}
        onSwitchUser={handleSwitchUser}
        currentLifecycle={competition.status}
        onChangeLifecycle={handleChangeLifecycle}
        onOpenConcurrencyTester={() => setIsConcurrencyOpen(true)}
        onResetData={handleResetData}
        isRegistered={userState.isRegistered}
      />

      {/* Main Viewport Container */}
      <div className="flex-1 flex items-center justify-center py-0 sm:py-6 px-0 sm:px-4">
        <div
          className={`w-full transition-all duration-300 ${
            isMobileFrame
              ? 'max-w-[420px] bg-white rounded-none sm:rounded-[36px] shadow-2xl overflow-hidden border-0 sm:border-[8px] sm:border-slate-800 flex flex-col min-h-screen sm:min-h-[880px] max-h-none sm:max-h-[92vh]'
              : 'max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-screen'
          }`}
        >
          {/* Mobile Screen Shell Content */}
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar relative bg-[#fafafa]">
            {/* 1. Status Bar */}
            <StatusBar />

            {/* 2. Navigation Header with ENG/हिंदी switcher */}
            <Header
              language={language}
              onLanguageChange={setLanguage}
              onGoBack={() => showToast('Navigating back to Feedants Explore')}
            />

            {/* 3. Hero Section (Title, Badges, Prize Pool, Spots) */}
            <CompetitionHero
              competition={competition}
              userState={userState}
              language={language}
              onOpenRegisterModal={() => setIsRegisterOpen(true)}
            />

            {/* 4. Judge Profile Card */}
            <JudgeCard
              judge={competition.judge}
              language={language}
              onPlayVideo={handlePlayVideo}
            />

            {/* 5. Live Countdown Timer */}
            <CountdownTimer
              targetIsoDate={competition.dates.registerBeforeIso}
              language={language}
            />

            {/* 6. Important Dates 2x2 Grid */}
            <ImportantDatesGrid
              dates={competition.dates}
              language={language}
            />

            {/* 7. Previous Winners Carousel */}
            <PreviousWinners
              winners={competition.previousWinners}
              language={language}
              onPlayVideo={handlePlayVideo}
            />

            {/* 8. Tabs (About, Judging Parameters, Rules & Eligibility) */}
            <TabsSection
              competition={competition}
              language={language}
            />

            {/* 9. Rewards (All Positions) */}
            <RewardsCard
              rewards={competition.rewards}
              language={language}
            />

            {/* 10. Trust, Disclaimer & Policy Row */}
            <TrustAndPolicies
              competition={competition}
              language={language}
              onOpenPrizeFaq={() =>
                handlePlayVideo(
                  competition.policies.prizeMoneyFaq.videoUrl,
                  'How will you receive prize money?'
                )
              }
              onOpenRefundPolicy={() => setIsRefundOpen(true)}
            />

            {/* 11. Referral & Earn Discount Banner */}
            <ReferralBanner language={language} />

            {/* 12. Hear From Our Users (Testimonials trigger) */}
            <UserTestimonials
              language={language}
              onOpenTestimonials={() => setIsTestimonialsOpen(true)}
            />

            {/* 13. Ad Placeholder */}
            <AdBanner language={language} />

            {/* Bottom Spacing */}
            <div className="h-4" />
          </div>

          {/* Sticky Bottom Primary Action */}
          <div className="sticky bottom-0 z-30 bg-white">
            <BottomActionBar
              competition={competition}
              userState={userState}
              language={language}
              onUploadSubmission={() => setIsSubmissionOpen(true)}
              onRegisterNow={() => setIsRegisterOpen(true)}
            />

            {/* Native 5-Tab Bottom App Navigation Bar */}
            <BottomNavBar
              language={language}
              activeTab="competitions"
              onTabChange={(tab) => {
                if (tab === 'create') setIsSubmissionOpen(true);
                else showToast(`Switched tab to ${tab}`);
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900/95 text-white text-xs font-semibold rounded-full shadow-lg border border-slate-700 animate-fadeIn flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <RazorpayCheckoutModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        competition={competition}
        onSuccess={handleRegistrationSuccess}
      />

      <SubmissionModal
        isOpen={isSubmissionOpen}
        onClose={() => setIsSubmissionOpen(false)}
        competition={competition}
        existingSubmission={userState.submission}
        onSuccess={handleSubmissionSuccess}
      />

      <VideoPlayerModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ ...videoModal, isOpen: false })}
        videoUrl={videoModal.videoUrl}
        title={videoModal.title}
      />

      <RefundPolicyModal
        isOpen={isRefundOpen}
        onClose={() => setIsRefundOpen(false)}
        competition={competition}
      />

      <TestimonialsModal
        isOpen={isTestimonialsOpen}
        onClose={() => setIsTestimonialsOpen(false)}
        testimonials={testimonials}
      />

      <ConcurrencyDemoModal
        isOpen={isConcurrencyOpen}
        onClose={() => setIsConcurrencyOpen(false)}
        competition={competition}
        onStateUpdated={fetchData}
      />
    </div>
  );
}
