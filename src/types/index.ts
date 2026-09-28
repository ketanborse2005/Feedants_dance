export type Language = 'en' | 'hi';

export interface Judge {
  name: string;
  role: string;
  title: string;
  experience: string;
  avatar: string;
  introVideoUrl: string;
  bio: string;
}

export interface ImportantDates {
  registerBefore: string;
  registerBeforeIso: string;
  submissionStarts: string;
  submissionStartsIso: string;
  submissionEnds: string;
  submissionEndsIso: string;
  resultDate: string;
  resultDateIso: string;
}

export interface PreviousWinner {
  id: string;
  name: string;
  rank: string;
  rankNumber: number;
  danceStyle: string;
  imageUrl: string;
  videoUrl: string;
  quote: string;
}

export interface RewardItem {
  position: number;
  label: string;
  amount: number;
  iconType: 'trophy' | 'silver' | 'bronze' | 'star';
}

export interface JudgingParameter {
  title: string;
  weightage: string;
  description: string;
}

export interface RuleCategory {
  title: string;
  rules: string[];
}

export type CompetitionStatus = 'REGISTRATION_OPEN' | 'SUBMISSION_OPEN' | 'JUDGING' | 'COMPLETED' | 'SOLDOUT';

export interface CompetitionData {
  _id: string;
  title: string;
  category: string;
  subCategory: string;
  certificateOffered: boolean;
  certificateText: string;
  prizePool: number;
  entryFee: number;
  currency: string;
  totalSpots: number;
  bookedSpots: number;
  status: CompetitionStatus;
  judge: Judge;
  dates: ImportantDates;
  previousWinners: PreviousWinner[];
  about: {
    shortText: string;
    fullText: string[];
  };
  judgingParameters: JudgingParameter[];
  rulesAndEligibility: RuleCategory[];
  rewards: RewardItem[];
  disclaimer: string;
  referral: {
    url: string;
    rewardText: string;
    discountText: string;
  };
  policies: {
    prizeMoneyFaq: {
      question: string;
      answer: string;
      videoUrl: string;
    };
    refundPolicy: {
      title: string;
      summary: string;
      details: string[];
    };
    paymentGateway: string;
  };
}

export interface ParticipantRecord {
  _id: string;
  competitionId: string;
  userId: string;
  userName: string;
  userEmail: string;
  phone: string;
  registeredAt: string;
  paymentId: string;
  amountPaid: number;
  status: 'CONFIRMED' | 'REFUNDED';
}

export interface SubmissionRecord {
  _id: string;
  competitionId: string;
  userId: string;
  title: string;
  danceForm: string;
  videoUrl: string;
  description: string;
  durationSec: number;
  submittedAt: string;
  status: 'PENDING_REVIEW' | 'REVIEWED';
  score?: number;
  judgeNotes?: string;
}

export interface UserState {
  userId: string;
  competitionId: string;
  isRegistered: boolean;
  participant: ParticipantRecord | null;
  isSubmitted: boolean;
  submission: SubmissionRecord | null;
  spotsLeft: number;
  isSoldOut: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  competition: string;
  date: string;
}
