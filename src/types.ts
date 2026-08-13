export type SellerType = 'INDIVIDUAL' | 'SOLE_TRADER' | 'REGISTERED_BUSINESS';

export type TransactionState =
  | 'CREATED'
  | 'LISTING_SELECTED'
  | 'PRE_PAYMENT_PROOF_REQUESTED'
  | 'DRAFT'
  | 'SELLER_INVITED'
  | 'SELLER_ID_PENDING'
  | 'SELLER_ID_CONFIRMED'
  | 'SELLER_TYPE_CONFIRMED'
  | 'BUSINESS_PENDING'
  | 'BUSINESS_CONFIRMED'
  | 'SELLER_AUTHORITY_CONFIRMED'
  | 'PAYOUT_PENDING'
  | 'PAYOUT_CONFIRMED'
  | 'PRODUCT_LIVECHECK_PENDING'
  | 'PRODUCT_LIVECHECK_PASS'
  | 'PRODUCT_LIVECHECK_FAIL'
  | 'ASSET_FINGERPRINT_CREATED'
  | 'SOURCE_EVIDENCE_CONFIRMED'
  | 'TRUTHCHAIN_REVIEW'
  | 'READY_FOR_FUNDING'
  | 'BUYER_AUTH_CONFIRMED'
  | 'PAYMENT_PENDING'
  | 'PAYMENT_LOCKED'
  | 'PAYMENT_CONFIRMED'
  | 'PURCHASE_VERIFIED'
  | 'PURCHASE_BLOCKED'
  | 'PROTECTED_PAYMENT_DISABLED'
  | 'ORDER_CONFIRMED'
  | 'ORDER_PLACED'
  | 'PACKCHECK_PENDING'
  | 'PACKCHECK_CONFIRMED'
  | 'CARRIER_PENDING'
  | 'CARRIER_CONFIRMED'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'INSPECTION'
  | 'ACCEPTED'
  | 'DISPUTED'
  | 'SETTLEMENT_ELIGIBLE'
  | 'SETTLED'
  | 'BLOCKED';

export interface SellerVerification {
  type: SellerType;
  identityConfirmed: boolean;
  livenessConfirmed: boolean;
  phoneVerified: boolean;
  emailVerified: boolean;
  addressCheckConfirmed: boolean;
  governmentIdType?: string;
  fullName: string;
  maskedAddress?: string;
  // Business specific
  companyName?: string;
  companyNumber?: string;
  registryActive?: boolean;
  representativeAuthorityConfirmed?: boolean;
}

export interface PayoutDetails {
  beneficiaryName: string;
  bankName: string;
  accountEnding: string;
  payoutMatchedToSeller: boolean;
  mismatchReason?: string;
}

export interface LiveCheckChallenge {
  id: string;
  oneTimeToken: string;
  requiredGestures: string[];
  productSpecificInstructions: string[];
  timestamp: string;
  status: 'PENDING' | 'PASS' | 'FAIL';
  evidencePhotos?: string[];
  failureRationale?: string;
}

export interface AssetFingerprint {
  id: string;
  brand: string;
  model: string;
  serialNumber?: string;
  imei?: string;
  vin?: string;
  visualDescriptors: string[];
  uniqueMarks: string[];
  createdAt: string;
}

export interface PackagePassport {
  packageId: string;
  assetFingerprintId: string;
  sealId: string;
  itemMatched: boolean;
  boxCondition: string;
  shippingLabelMatched: boolean;
  verifiedAt: string;
  photos?: string[];
}

export interface CarrierTracking {
  carrierName: string;
  trackingNumber: string;
  status: 'CARRIER_PENDING' | 'CUSTODY_CONFIRMED' | 'IN_TRANSIT' | 'DELIVERED';
  events: {
    timestamp: string;
    location: string;
    event: string;
  }[];
}

export interface GeminiAgentLog {
  id: string;
  agentName: 'PurchaseOrchestratorAgent' | 'ListingIntelligenceAgent' | 'SellerIdentityAuthorityAgent' | 'PayoutIntegrityAgent' | 'LocationProofAgent' | 'ProductEvidenceLiveCheckAgent' | 'TruthChainAgent' | 'PricingProtectionAgent' | 'TransactionAgent' | 'SellerAgent' | 'LiveCheckAgent' | 'PackCheckAgent' | 'EvidenceAgent' | 'ReceiptAnalysisAgent';
  timestamp: string;
  modelUsed: string;
  inputPrompt: string;
  resultStatus: 'PASS' | 'MORE_PROOF_REQUIRED' | 'CRITICAL_CONTRADICTION' | 'FAIL';
  outputDetails: Record<string, any>;
  rationale: string;
  executionTimeMs: number;
  message?: string;
}

export interface LocationProofData {
  country: string;
  region: string;
  city: string;
  status: 'VERIFIED' | 'PENDING' | 'REJECTED';
  gpsAccuracyMeters: number;
  ipNetworkMatched: boolean;
  registeredAddressMatched: boolean;
  isPrivacyMode: boolean;
  verifiedAt?: string;
}

export interface Transaction {
  id: string;
  itemTitle: string;
  itemCategory: string;
  itemPrice: number;
  currency: string;
  listingUrl?: string;
  description: string;
  riskTier: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  state: TransactionState;
  createdAt: string;
  updatedAt: string;
  
  sellerIntegrationStatus?: 'INTEGRATED' | 'NOT_INTEGRATED';
  feeFundingMode?: 'SELLER_FUNDED' | 'BUYER_FUNDED';
  sellerFeeAccepted?: boolean;
  sellerRefusedVerification?: boolean;

  seller: SellerVerification;
  payout: PayoutDetails;
  liveCheck?: LiveCheckChallenge;
  locationProof?: LocationProofData;
  assetFingerprint?: AssetFingerprint;
  packagePassport?: PackagePassport;
  carrier?: CarrierTracking;
  
  buyer: {
    name: string;
    email: string;
    authenticated: boolean;
  };

  financials: {
    grossAmount: number;
    platformFee: number;
    paymentProviderFee: number;
    sellerNet: number;
    paymentMethod?: string;
    paidAt?: string;
    settledAt?: string;
  };

  agentLogs: GeminiAgentLog[];
  truthChainSummary?: {
    consistent: boolean;
    contradictions: string[];
    riskScore: number;
  };
  purchasePolicyResult?: {
    passed: boolean;
    finalState: string;
    checks: Record<string, boolean>;
    policyViolations: string[];
    evaluatedAt: string;
  };
}

export interface PlatformMetrics {
  grossVolumeUsd: number;
  totalPlatformFeesUsd: number;
  activeTransactionsCount: number;
  totalGeminiAgentCalls: number;
  blockedFraudCount: number;
  successfulDeliveriesCount: number;
  monthlyRevenue: {
    month: string;
    grossVolume: number;
    revenue: number;
  }[];
}

export interface FinancialPnL {
  period: string;
  revenue: number;
  costs: {
    googleCloud: number;
    geminiApi: number;
    identityVerification: number;
    paymentProcessing: number;
    smsAndEmail: number;
    marketingSpend: number;
  };
  netProfit: number;
}

export interface CustomerEvidence {
  id: string;
  customerName: string;
  customerRole: 'BUYER' | 'SELLER' | 'MERCHANT';
  companyOrMarketplace: string;
  quote: string;
  transactionRef: string;
  verifiedBadge: boolean;
  consentGiven: boolean;
}

export interface ReleaseGateResult {
  id: string;
  name: string;
  description: string;
  status: 'PASSED' | 'FAILED' | 'RUNNING';
  durationMs: number;
  details: string;
}
