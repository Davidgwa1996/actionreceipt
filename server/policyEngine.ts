import { Transaction } from '../src/types';
import { calculatePricing } from '../src/utils/pricingEngine';

export interface PolicyEvaluationResult {
  passed: boolean;
  finalState: 'PURCHASE_VERIFIED' | 'PURCHASE_BLOCKED';
  checks: {
    sellerIdentityConfirmed: boolean;
    sellerLivenessConfirmed: boolean;
    sellerAddressConfirmed: boolean;
    payoutMatchedToSeller: boolean;
    liveCheckStatusPassed: boolean;
    truthChainConsensusPassed: boolean;
    protectionFeeCalculated: boolean;
    pricingTierValid: boolean;
    riskTierAcceptable: boolean;
  };
  policyViolations: string[];
  evaluatedAt: string;
}

/**
 * Deterministic Purchase Policy Engine
 * Evaluates success signals from all specialist agents and transaction attributes.
 * Ensures 'PURCHASE_VERIFIED' is ONLY set if all strict conditions are met, preventing AI-level overrides.
 */
export function evaluatePurchasePolicy(tx: Transaction): PolicyEvaluationResult {
  const policyViolations: string[] = [];

  const sellerIdentityConfirmed = Boolean(tx.seller?.identityConfirmed);
  if (!sellerIdentityConfirmed) policyViolations.push('Seller government identity verification incomplete.');

  const sellerLivenessConfirmed = Boolean(tx.seller?.livenessConfirmed);
  if (!sellerLivenessConfirmed) policyViolations.push('Seller liveness verification check missing.');

  const sellerAddressConfirmed = Boolean(tx.seller?.addressCheckConfirmed);
  if (!sellerAddressConfirmed) policyViolations.push('Seller proof of address verification missing.');

  const payoutMatchedToSeller = Boolean(tx.payout?.payoutMatchedToSeller);
  if (!payoutMatchedToSeller) policyViolations.push('Bank payout beneficiary does NOT match verified seller legal identity.');

  const liveCheckStatusPassed = tx.liveCheck?.status === 'PASS';
  if (!liveCheckStatusPassed) policyViolations.push('Product LiveCheck gesture/token physical challenge did NOT pass.');

  const truthChainConsensusPassed = tx.truthChainSummary?.consistent === true;
  if (!truthChainConsensusPassed) policyViolations.push('Multi-Agent TruthChain reconciliation consensus failed.');

  const pricing = calculatePricing(tx.itemPrice, tx.currency || 'GBP');
  const protectionFeeCalculated = typeof pricing.protectionFee === 'number';
  if (!protectionFeeCalculated) policyViolations.push('Protection fee tier calculation failed.');

  const pricingTierValid = Boolean(pricing.pricingTier);
  if (!pricingTierValid) policyViolations.push('Transaction pricing tier is pending or invalid.');

  const riskTierAcceptable = tx.riskTier !== 'CRITICAL';
  if (!riskTierAcceptable) policyViolations.push('Transaction flagged as CRITICAL risk tier.');

  const passed =
    sellerIdentityConfirmed &&
    sellerLivenessConfirmed &&
    sellerAddressConfirmed &&
    payoutMatchedToSeller &&
    liveCheckStatusPassed &&
    truthChainConsensusPassed &&
    protectionFeeCalculated &&
    pricingTierValid &&
    riskTierAcceptable;

  return {
    passed,
    finalState: passed ? 'PURCHASE_VERIFIED' : 'PURCHASE_BLOCKED',
    checks: {
      sellerIdentityConfirmed,
      sellerLivenessConfirmed,
      sellerAddressConfirmed,
      payoutMatchedToSeller,
      liveCheckStatusPassed,
      truthChainConsensusPassed,
      protectionFeeCalculated,
      pricingTierValid,
      riskTierAcceptable
    },
    policyViolations,
    evaluatedAt: new Date().toISOString()
  };
}
