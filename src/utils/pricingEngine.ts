export type PricingTier =
  | 'FREE_UNDER_5'
  | '5_TO_9_99'
  | '10_TO_14_99'
  | '15_TO_44_99'
  | '45_TO_99_99'
  | '100_TO_299_99'
  | '300_TO_499_99'
  | '500_TO_800'
  | 'ABOVE_800';

export interface PricingBreakdown {
  orderValue: number;
  currency: string;
  pricingTier: PricingTier;
  pricingTierName: string;
  protectionFee: number;
  sellerRewardRate: number; // 0.15
  sellerReward: number;     // 15% of fee
  opsRevenueRate: number;    // 0.85
  opsRevenue: number;        // 85% of fee
  pricingVersion: string;   // 'AR-PRICING-2026-01'
  isPendingTier: boolean;
  notice?: string;
}

export const PRICING_TIERS_CONFIG = [
  { tier: 'FREE_UNDER_5', name: 'Under £5', min: 0, max: 4.99, fee: 0, display: 'FREE' },
  { tier: '5_TO_9_99', name: '£5 – £9.99', min: 5, max: 9.99, fee: 0.30, display: '£0.30' },
  { tier: '10_TO_14_99', name: '£10 – £14.99', min: 10, max: 14.99, fee: 0.35, display: '£0.35' },
  { tier: '15_TO_44_99', name: '£15 – £44.99', min: 15, max: 44.99, fee: 0.40, display: '£0.40' },
  { tier: '45_TO_99_99', name: '£45 – £99.99', min: 45, max: 99.99, fee: 0.65, display: '£0.65' },
  { tier: '100_TO_299_99', name: '£100 – £299.99', min: 100, max: 299.99, fee: 1.20, display: '£1.20' },
  { tier: '300_TO_499_99', name: '£300 – £499.99', min: 300, max: 499.99, fee: 2.50, display: '£2.50' },
  { tier: '500_TO_800', name: '£500 – £800', min: 500, max: 800, fee: 4.50, display: '£4.50' },
  { tier: 'ABOVE_800', name: 'Above £800', min: 800.01, max: Infinity, fee: 4.50, display: '£4.50' }
];

export function calculatePricing(orderValue: number, currency: string = 'GBP'): PricingBreakdown {
  const version = 'AR-PRICING-2026-01';

  if (orderValue < 5) {
    return {
      orderValue,
      currency,
      pricingTier: 'FREE_UNDER_5',
      pricingTierName: 'Under £5 (FREE)',
      protectionFee: 0,
      sellerRewardRate: 0.15,
      sellerReward: 0,
      opsRevenueRate: 0.85,
      opsRevenue: 0,
      pricingVersion: version,
      isPendingTier: false,
    };
  }

  if (orderValue >= 5 && orderValue < 10) {
    const fee = 0.30;
    return {
      orderValue,
      currency,
      pricingTier: '5_TO_9_99',
      pricingTierName: '£5 – £9.99',
      protectionFee: fee,
      sellerRewardRate: 0.15,
      sellerReward: +(fee * 0.15).toFixed(4),
      opsRevenueRate: 0.85,
      opsRevenue: +(fee * 0.85).toFixed(4),
      pricingVersion: version,
      isPendingTier: false,
    };
  }

  if (orderValue >= 10 && orderValue < 15) {
    const fee = 0.35;
    return {
      orderValue,
      currency,
      pricingTier: '10_TO_14_99',
      pricingTierName: '£10 – £14.99',
      protectionFee: fee,
      sellerRewardRate: 0.15,
      sellerReward: +(fee * 0.15).toFixed(4),
      opsRevenueRate: 0.85,
      opsRevenue: +(fee * 0.85).toFixed(4),
      pricingVersion: version,
      isPendingTier: false,
    };
  }

  if (orderValue >= 15 && orderValue < 45) {
    const fee = 0.40;
    return {
      orderValue,
      currency,
      pricingTier: '15_TO_44_99',
      pricingTierName: '£15 – £44.99',
      protectionFee: fee,
      sellerRewardRate: 0.15,
      sellerReward: +(fee * 0.15).toFixed(4),
      opsRevenueRate: 0.85,
      opsRevenue: +(fee * 0.85).toFixed(4),
      pricingVersion: version,
      isPendingTier: false,
    };
  }

  if (orderValue >= 45 && orderValue < 100) {
    const fee = 0.65;
    return {
      orderValue,
      currency,
      pricingTier: '45_TO_99_99',
      pricingTierName: '£45 – £99.99',
      protectionFee: fee,
      sellerRewardRate: 0.15,
      sellerReward: +(fee * 0.15).toFixed(4),
      opsRevenueRate: 0.85,
      opsRevenue: +(fee * 0.85).toFixed(4),
      pricingVersion: version,
      isPendingTier: false,
    };
  }

  if (orderValue >= 100 && orderValue < 300) {
    const fee = 1.20;
    return {
      orderValue,
      currency,
      pricingTier: '100_TO_299_99',
      pricingTierName: '£100 – £299.99',
      protectionFee: fee,
      sellerRewardRate: 0.15,
      sellerReward: +(fee * 0.15).toFixed(4), // 0.18
      opsRevenueRate: 0.85,
      opsRevenue: +(fee * 0.85).toFixed(4),    // 1.02
      pricingVersion: version,
      isPendingTier: false,
    };
  }

  if (orderValue >= 300 && orderValue < 500) {
    const fee = 2.50;
    return {
      orderValue,
      currency,
      pricingTier: '300_TO_499_99',
      pricingTierName: '£300 – £499.99',
      protectionFee: fee,
      sellerRewardRate: 0.15,
      sellerReward: +(fee * 0.15).toFixed(4), // 0.375
      opsRevenueRate: 0.85,
      opsRevenue: +(fee * 0.85).toFixed(4),    // 2.125
      pricingVersion: version,
      isPendingTier: false,
    };
  }

  if (orderValue >= 500 && orderValue <= 800) {
    const fee = 4.50;
    return {
      orderValue,
      currency,
      pricingTier: '500_TO_800',
      pricingTierName: '£500 – £800',
      protectionFee: fee,
      sellerRewardRate: 0.15,
      sellerReward: +(fee * 0.15).toFixed(4), // 0.675
      opsRevenueRate: 0.85,
      opsRevenue: +(fee * 0.85).toFixed(4),    // 3.825
      pricingVersion: version,
      isPendingTier: false,
    };
  }

  const fee = 4.50;
  return {
    orderValue,
    currency,
    pricingTier: 'ABOVE_800',
    pricingTierName: 'Above £800',
    protectionFee: fee,
    sellerRewardRate: 0.15,
    sellerReward: +(fee * 0.15).toFixed(4),
    opsRevenueRate: 0.85,
    opsRevenue: +(fee * 0.85).toFixed(4),
    pricingVersion: version,
    isPendingTier: false,
  };
}
