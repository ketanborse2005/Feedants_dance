// MongoDB-Compatible Data Layer & Business Logic for Feedants Competition Platform

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

export interface CompetitionDocument {
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

// Initial Seed Data aligned exactly with the reference design
const INITIAL_COMPETITION: CompetitionDocument = {
  _id: 'comp_classical_dance_2026',
  title: 'Feedants Classical Dance',
  category: 'Dance',
  subCategory: 'Multi-Win',
  certificateOffered: true,
  certificateText: 'Winners get certificate',
  prizePool: 1500,
  entryFee: 99,
  currency: '₹',
  totalSpots: 20,
  bookedSpots: 1, // "1 / 20 Booked" & "Only 19 spots left"
  status: 'REGISTRATION_OPEN',
  judge: {
    name: 'Manju Dubey',
    role: 'Judge',
    title: 'Professional Kathak Dancer',
    experience: '12+ Years of Experience',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    introVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    bio: 'Sangeet Natak Akademi Awardee, recognized globally for blending Jaipur and Lucknow Gharana techniques. Trained over 1,200 disciples and performed across 24 countries.'
  },
  dates: {
    registerBefore: '10 Aug 26\n11:50 PM',
    registerBeforeIso: new Date(Date.now() + 1 * 86400000 + 6 * 3600000 + 28 * 60000 + 32 * 1000).toISOString(),
    submissionStarts: '6 Aug 26\n04:00 AM',
    submissionStartsIso: new Date(Date.now() - 2 * 86400000).toISOString(),
    submissionEnds: '30 Aug 26\n11:55 PM',
    submissionEndsIso: new Date(Date.now() + 20 * 86400000).toISOString(),
    resultDate: '1 Sept 26\n11:50 PM',
    resultDateIso: new Date(Date.now() + 22 * 86400000).toISOString(),
  },
  previousWinners: [
    {
      id: 'w1',
      name: 'Riya Shah',
      rank: '1st Winner',
      rankNumber: 1,
      danceStyle: 'Kathak Tarana',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      quote: 'Participating in Feedants opened doors to my first national festival invitation!'
    },
    {
      id: 'w2',
      name: 'Aarav Mehta',
      rank: '1st Winner',
      rankNumber: 1,
      danceStyle: 'Bharatanatyam Varnam',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      quote: 'The constructive feedback from professional judges is priceless for classical practitioners.'
    },
    {
      id: 'w3',
      name: 'Neha Verma',
      rank: '2nd Winner',
      rankNumber: 2,
      danceStyle: 'Odissi Mangalacharan',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      quote: 'Fast prize distribution directly to UPI within 24 hours of results!'
    },
    {
      id: 'w4',
      name: 'Ishita Chouhan',
      rank: '3rd Winner',
      rankNumber: 3,
      danceStyle: 'Kathak Thumri',
      imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      quote: 'Feedants provides a fair, unbiased, transparent stage for artists worldwide.'
    }
  ],
  about: {
    shortText: 'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.',
    fullText: [
      'Feedants Classical Dance is dedicated to celebrating the rich tapestry of Indian Classical Arts. Whether you are learning Kathak, Bharatanatyam, Odissi, Kuchipudi, Kathakali, Mohiniyattam, Manipuri, or Sattriya, this platform connects your passion with esteemed gurus and thousands of enthusiasts.',
      'Our panel evaluates entries with deep cultural fidelity, focusing on rhythm (laya), authentic expressions (bhava), mudras, footwork precision, and aesthetic presentation.',
      'Every eligible participant receives a verifiable Certificate of Participation, and top winners earn cash rewards credited directly to their bank accounts/UPI.'
    ]
  },
  judgingParameters: [
    {
      title: 'Rhythm & Timing (Taal & Laya)',
      weightage: '25%',
      description: 'Control of tempo, precision of footwork synchronization, and cadence stability.'
    },
    {
      title: 'Facial Expressions & Emotion (Bhava & Abhinaya)',
      weightage: '25%',
      description: 'Clarity of storytelling, eye movements, and depth of classical emotive expression.'
    },
    {
      title: 'Body Posture & Hand Gestures (Angashuddhi & Mudras)',
      weightage: '20%',
      description: 'Clean geometry of lines, crisp execution of classical hastas and body poses.'
    },
    {
      title: 'Footwork Execution (Tatkar / Adavus)',
      weightage: '15%',
      description: 'Articulacy of ghungroo strikes, bell clarity, and stance balance.'
    },
    {
      title: 'Costume, Aharya & Presentation',
      weightage: '15%',
      description: 'Traditional authenticity of attire, neatness, camera framing, and respectful decorum.'
    }
  ],
  rulesAndEligibility: [
    {
      title: 'Eligibility & Entry',
      rules: [
        'Open to all age categories globally: Sub-Junior (below 12), Junior (12–18), and Senior (18+).',
        'Solo entries only. Only one submission is permitted per registered account.'
      ]
    },
    {
      title: 'Video Specifications',
      rules: [
        'Video length must be between 2 minutes minimum and 5 minutes maximum.',
        'Continuous single-take recording. Cuts, special visual transitions, lip-syncing, or post-production effects are strictly prohibited.',
        'Ensure proper lighting with full body visible throughout the performance, including footwork.'
      ]
    },
    {
      title: 'Permitted Dance Genres',
      rules: [
        'Kathak, Bharatanatyam, Odissi, Kuchipudi, Kathakali, Mohiniyattam, Manipuri, and Sattriya.'
      ]
    },
    {
      title: 'Music & Track',
      rules: [
        'Pre-recorded instrumental classical music, live lehra/padhant, or vocal accompaniment is welcome.'
      ]
    }
  ],
  rewards: [
    { position: 1, label: '1st Winner', amount: 550, iconType: 'trophy' },
    { position: 2, label: '2nd Winner', amount: 300, iconType: 'silver' },
    { position: 3, label: '3rd Winner', amount: 240, iconType: 'bronze' },
    { position: 4, label: '4th Winner', amount: 200, iconType: 'star' },
    { position: 5, label: '5th Winner', amount: 130, iconType: 'star' },
    { position: 6, label: '6th Winner', amount: 80, iconType: 'star' },
  ],
  disclaimer: 'Disclaimer: Only contributions from paid participants will be considered for judging.',
  referral: {
    url: 'https://feedants.com/r/referral123',
    rewardText: 'You earn ₹10 for every signup',
    discountText: 'Refer & Earn more discount'
  },
  policies: {
    prizeMoneyFaq: {
      question: 'How will you receive prize money?',
      answer: 'Winners will receive their cash rewards directly via instant UPI transfer or NEFT/IMPS to their verified bank accounts within 24 hours of the official result declaration. Our team contacts each winner on WhatsApp and email.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    refundPolicy: {
      title: 'Feedants 100% Refund Guarantee',
      summary: 'Full refund is processed immediately if a competition is cancelled or rescheduled by organizers.',
      details: [
        'If an event is cancelled by Feedants, 100% of your ₹99 entry fee is credited back to your original payment method in 2-3 business days.',
        'No refund requests are accepted once video submission has been uploaded.',
        'Cancellations requested at least 24 hours before registration closes are subject to a standard instant wallet refund.'
      ]
    },
    paymentGateway: 'Razorpay'
  }
};

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ananya Deshpande',
    role: 'Kathak Student, Pune',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Feedants gave me the confidence to perform on a national scale. The judges remarks helped me refine my chakkars!',
    competition: 'Feedants Classical Dance - Season 3',
    date: 'July 2026'
  },
  {
    id: 't2',
    name: 'Vikram Sridhar',
    role: 'Bharatanatyam Practitioner, Chennai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Extremely smooth registration, transparent judging criteria, and prompt reward settlement right via UPI.',
    competition: 'Southern Rhythms Solo Showcase',
    date: 'June 2026'
  },
  {
    id: 't3',
    name: 'Pooja Bhattacharya',
    role: 'Odissi Enthusiast, Kolkata',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Loved the certificate of participation and the video critique by Guru Manju Dubey. Can not wait for the next season!',
    competition: 'Feedants Classical Dance - Season 2',
    date: 'May 2026'
  }
];

class CompetitionDataStore {
  private competition: CompetitionDocument;
  private participants: Map<string, ParticipantRecord> = new Map();
  private submissions: Map<string, SubmissionRecord> = new Map();
  private testimonials: Testimonial[] = [...INITIAL_TESTIMONIALS];
  
  // Mutex lock for atomic spot allocation under high concurrency
  private lock: Promise<void> = Promise.resolve();

  constructor() {
    this.competition = JSON.parse(JSON.stringify(INITIAL_COMPETITION));
    
    // Seed one default participant matching the screenshot ("1 / 20 Booked", "Registered" badge shown in screenshot)
    const initialUser: ParticipantRecord = {
      _id: 'reg_demo_ketan',
      competitionId: this.competition._id,
      userId: 'user_ketan_101',
      userName: 'Ketan Borse',
      userEmail: 'ketanborse101@gmail.com',
      phone: '+91 9876543210',
      registeredAt: new Date(Date.now() - 3600000).toISOString(),
      paymentId: 'pay_rzp_demo_882910',
      amountPaid: 99,
      status: 'CONFIRMED'
    };
    this.participants.set(`user_ketan_101_${this.competition._id}`, initialUser);
  }

  // Helper to serialize atomic transactions
  private async withLock<T>(action: () => Promise<T> | T): Promise<T> {
    const nextLock = this.lock.then(action, action);
    this.lock = nextLock.then(() => {}, () => {});
    return nextLock;
  }

  public getCompetition(id?: string): CompetitionDocument {
    // Dynamic recalculation of spots left
    return {
      ...this.competition,
      // Ensure booked spots accurately reflect participants count
      bookedSpots: Math.max(this.competition.bookedSpots, this.participants.size)
    };
  }

  public getUserState(competitionId: string, userId: string) {
    const participant = this.participants.get(`${userId}_${competitionId}`);
    const submission = this.submissions.get(`${userId}_${competitionId}`);

    const isRegistered = !!participant && participant.status === 'CONFIRMED';
    const isSubmitted = !!submission;

    return {
      userId,
      competitionId,
      isRegistered,
      participant: participant || null,
      isSubmitted,
      submission: submission || null,
      spotsLeft: Math.max(0, this.competition.totalSpots - this.competition.bookedSpots),
      isSoldOut: this.competition.bookedSpots >= this.competition.totalSpots
    };
  }

  // Atomic Registration with Concurrency & Race-Condition Safe Spot Decrement
  public registerUser(params: {
    competitionId: string;
    userId: string;
    userName: string;
    userEmail: string;
    phone: string;
    paymentMethod: string;
  }): { success: boolean; statusCode?: number; error?: string; data?: any } {
    const { competitionId, userId, userName, userEmail, phone, paymentMethod } = params;

    const key = `${userId}_${competitionId}`;
    if (this.participants.has(key)) {
      return {
        success: false,
        statusCode: 409,
        error: 'User is already registered for this competition'
      };
    }

    // Atomic Spot Verification
    if (this.competition.bookedSpots >= this.competition.totalSpots) {
      this.competition.status = 'SOLDOUT';
      return {
        success: false,
        statusCode: 410,
        error: 'Competition is completely sold out! No participation spots remaining.'
      };
    }

    // Atomically increment booked spots (equivalent to MongoDB findOneAndUpdate with $inc)
    this.competition.bookedSpots += 1;

    const registration: ParticipantRecord = {
      _id: `reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      competitionId,
      userId,
      userName,
      userEmail,
      phone,
      registeredAt: new Date().toISOString(),
      paymentId: `pay_rzp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      amountPaid: this.competition.entryFee,
      status: 'CONFIRMED'
    };

    this.participants.set(key, registration);

    return {
      success: true,
      data: {
        registration,
        bookedSpots: this.competition.bookedSpots,
        totalSpots: this.competition.totalSpots,
        spotsLeft: this.competition.totalSpots - this.competition.bookedSpots
      }
    };
  }

  // Concurrency Simulation Runner
  public async simulateConcurrentRegistrations(competitionId: string, userCount: number) {
    const results: Array<{ userId: string; success: boolean; message: string; spotAllocated?: number }> = [];

    const promises = Array.from({ length: userCount }).map(async (_, idx) => {
      const simUserId = `sim_user_${Date.now()}_${idx + 1}`;
      const simUserName = `Concurrent User #${idx + 1}`;

      // Simulate network jitter
      await new Promise(r => setTimeout(r, Math.random() * 50));

      const res = this.registerUser({
        competitionId,
        userId: simUserId,
        userName: simUserName,
        userEmail: `${simUserId}@feedants.test`,
        phone: `+91 999990000${idx}`,
        paymentMethod: 'RAZORPAY_UPI'
      });

      results.push({
        userId: simUserId,
        success: res.success,
        message: res.success ? `Spot confirmed! Booked ${res.data.bookedSpots}/${this.competition.totalSpots}` : (res.error || 'Failed'),
        spotAllocated: res.success ? res.data.bookedSpots : undefined
      });
    });

    await Promise.all(promises);

    return {
      totalAttempted: userCount,
      successCount: results.filter(r => r.success).length,
      failedCount: results.filter(r => !r.success).length,
      currentBooked: this.competition.bookedSpots,
      remainingSpots: Math.max(0, this.competition.totalSpots - this.competition.bookedSpots),
      results
    };
  }

  // Submission Management
  public createSubmission(params: {
    competitionId: string;
    userId: string;
    title: string;
    danceForm: string;
    videoUrl: string;
    description: string;
    durationSec: number;
  }) {
    const { competitionId, userId, title, danceForm, videoUrl, description, durationSec } = params;

    // Validate registration
    const userKey = `${userId}_${competitionId}`;
    if (!this.participants.has(userKey)) {
      return {
        success: false,
        statusCode: 403,
        error: 'Only registered and paid participants can submit entries.'
      };
    }

    const submission: SubmissionRecord = {
      _id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      competitionId,
      userId,
      title,
      danceForm,
      videoUrl,
      description,
      durationSec,
      submittedAt: new Date().toISOString(),
      status: 'PENDING_REVIEW'
    };

    this.submissions.set(userKey, submission);

    return {
      success: true,
      data: submission
    };
  }

  public getSubmissions(competitionId: string): SubmissionRecord[] {
    return Array.from(this.submissions.values()).filter(s => s.competitionId === competitionId);
  }

  public getTestimonials(): Testimonial[] {
    return this.testimonials;
  }

  // Admin/Demo helpers
  public overrideCompetitionState(id: string, lifecycleState?: CompetitionStatus, spotsOverride?: number) {
    if (lifecycleState) {
      this.competition.status = lifecycleState;
    }
    if (typeof spotsOverride === 'number') {
      this.competition.bookedSpots = Math.min(this.competition.totalSpots, Math.max(0, spotsOverride));
    }
    return this.competition;
  }

  public resetCompetition(id: string) {
    this.competition = JSON.parse(JSON.stringify(INITIAL_COMPETITION));
    this.participants.clear();
    this.submissions.clear();

    const initialUser: ParticipantRecord = {
      _id: 'reg_demo_ketan',
      competitionId: this.competition._id,
      userId: 'user_ketan_101',
      userName: 'Ketan Borse',
      userEmail: 'ketanborse101@gmail.com',
      phone: '+91 9876543210',
      registeredAt: new Date(Date.now() - 3600000).toISOString(),
      paymentId: 'pay_rzp_demo_882910',
      amountPaid: 99,
      status: 'CONFIRMED'
    };
    this.participants.set(`user_ketan_101_${this.competition._id}`, initialUser);

    return {
      competition: this.competition,
      userState: this.getUserState(this.competition._id, 'user_ketan_101')
    };
  }
}

export const db = new CompetitionDataStore();
