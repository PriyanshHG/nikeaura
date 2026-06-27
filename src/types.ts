export interface Activity {
  id: string;
  name: string;
  baseHeartRate: number;
  baseVO2Max: number;
  baseFatigue: number;
  baseStrideEfficiency: number;
  waveFrequency: number;
  color: string;
  description: string;
}

export interface Coach {
  id: string;
  name: string;
  title: string;
  quote: string;
  bio: string;
  focus: string[];
  metricsTarget: string;
  accentColor: string;
  avatarIcon: string;
  initialCue: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnually: number;
  tagline: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface BiometricLog {
  time: string;
  heartRate: number;
  vo2Max: number;
  fatigue: number;
  stride: number;
}
