# ActionReceipt

### AI Proof-to-Payout Infrastructure for Remote Physical Purchases

> **Don’t trust the listing. Make the transaction prove itself.**

[**Visit ActionReceipt**](https://actionreceipt.app)

---

## What is ActionReceipt?

**ActionReceipt is an AI-powered pre-payment trust layer for remote physical purchases.**

It is designed for the moment when a buyer wants to purchase a physical product from a seller they may never have met — through social commerce, classifieds, marketplaces, independent stores, or remote merchant websites.

Instead of asking the buyer to trust a listing and send money first, ActionReceipt verifies the important parts of the transaction **before protected payment becomes available**.

It can verify:

* Seller identity
* Seller/business authority
* Intended payout destination
* Product listing consistency
* Physical product possession
* GPS/location consistency
* Overall transaction evidence

If the required evidence is consistent:

**PURCHASE VERIFIED ✓**

Payment becomes available.

After the payment provider confirms the payment:

**PAYMENT CONFIRMED ✓**

**ORDER PLACED ✓**

At that point, ActionReceipt’s current transaction mission is complete and the seller or marketplace continues through its normal fulfilment process.

---

# The Problem

Remote-purchase scams often exploit one simple weakness:

> **Money can move before the transaction has proved enough about the seller and the physical product.**

A scammer can:

* copy genuine product photographs;
* create a convincing social-media profile;
* impersonate a legitimate business;
* advertise a product they do not possess;
* provide an unrelated payment account;
* claim to operate from a false location;
* pressure the buyer into paying quickly;
* disappear once money has been received.

A traditional remote-purchase flow can look like this:

```text
PRODUCT LISTING
      ↓
BUYER CONTACTS SELLER
      ↓
SELLER BUILDS TRUST
      ↓
BUYER PAYS
      ↓
PROBLEM DISCOVERED
      ↓
RECOVERY ATTEMPT
```

ActionReceipt changes the order.

```text
PRODUCT LISTING
      ↓
VERIFY PURCHASE
      ↓
VERIFY SELLER
      ↓
VERIFY PAYOUT
      ↓
VERIFY LISTING
      ↓
VERIFY PRODUCT
      ↓
VERIFY LOCATION
      ↓
TRUTHCHAIN
      ↓
PURCHASE VERIFIED
      ↓
PAY
      ↓
PAYMENT CONFIRMED
      ↓
ORDER PLACED ✓
```

**Verification comes before payment.**

---

# How ActionReceipt Works

A buyer sees a remote physical product they want to purchase.

For example:

```text
XPhone Pro 256GB
£650

Seller:
TechWorld Store
```

Instead of paying immediately, the buyer selects:

## VERIFY PURCHASE

ActionReceipt launches its verification workflow.

### 1. Seller Check

ActionReceipt evaluates who is actually behind the sale.

For an individual seller this may include:

* identity verification;
* liveness;
* verified contact information;
* authorised verification-provider results.

For a business seller it may also evaluate:

* business identity;
* authorised representative;
* relationship between the person and business.

---

### 2. Payout Integrity

ActionReceipt checks whether the intended payout beneficiary is consistent with the verified seller or business.

Example:

```text
Seller:
TechWorld Store

Payout Beneficiary:
TechWorld Store

PAYOUT MATCH ✓
```

A mismatch becomes a major transaction contradiction.

---

### 3. Listing Intelligence

The product listing is analysed for consistency.

ActionReceipt can evaluate:

* product name;
* category;
* price;
* description;
* condition;
* listing images;
* seller claims;
* timestamps;
* location claims;
* available metadata.

The goal is not merely to ask whether a listing *looks suspicious*.

The goal is to determine what the transaction must prove.

---

### 4. Product LiveCheck

For transactions requiring stronger verification, the seller may be asked to complete a dynamic product challenge.

For a smartphone, ActionReceipt might request:

```text
Show the front
      ↓
Show the back
      ↓
Rotate the device
      ↓
Open Settings
      ↓
Open device information
      ↓
Show an identifier
      ↓
Perform a random requested action
```

This provides stronger evidence than relying only on previously uploaded listing photographs.

---

### 5. LocationProof

Where authorised and technically available, ActionReceipt can compare relevant location evidence such as:

* seller device GPS;
* declared seller location;
* business/shop location;
* product-verification location;
* country or regional consistency.

Buyer-facing results should normally remain privacy-preserving.

Example:

```text
LOCATION VERIFIED ✓
London, United Kingdom
```

A private seller’s exact live GPS coordinates do not need to be exposed unnecessarily.

---

### 6. TruthChain

All important verification results are brought together by **TruthChain**.

```text
SELLER
   ↓
IDENTITY / AUTHORITY
   ↓
PAYOUT
   ↓
LISTING
   ↓
PHYSICAL PRODUCT
   ↓
LOCATIONPROOF
   ↓
TRUTHCHAIN
```

TruthChain checks whether the transaction tells **one consistent story**.

Possible results include:

```text
CONSISTENT
```

```text
ADDITIONAL_PROOF_REQUIRED
```

```text
CRITICAL_CONTRADICTION
```

---

# Gemini Multi-Agent Trust Engine

ActionReceipt uses a multi-agent AI architecture.

```text
                    BUYER
                      │
                      ▼
               PRODUCT LISTING
                      │
                      ▼
              VERIFY PURCHASE
                      │
                      ▼
        ┌──────────────────────────┐
        │ PURCHASE ORCHESTRATOR    │
        │ Gemini 3.6 Flash         │
        └────────────┬─────────────┘
                     │
       ┌─────────────┼─────────────┐
       │             │             │
       ▼             ▼             ▼
    LISTING        SELLER        PAYOUT
     AGENT          AGENT         AGENT
       │             │             │
       └─────────────┼─────────────┘
                     │
             ┌───────┴────────┐
             ▼                ▼
       LOCATIONPROOF      PRODUCT /
           AGENT         LIVECHECK
                            AGENT
             │                │
             └───────┬────────┘
                     ▼
              TRUTHCHAIN AGENT
                     │
                     ▼
             VERIFICATION RESULT
                     │
                     ▼
         DETERMINISTIC POLICY ENGINE
                     │
             ┌───────┴────────┐
             ▼                ▼
      PURCHASE VERIFIED   PAYMENT LOCKED
             │
             ▼
         READY TO PAY
             │
             ▼
     PAY WITH ACTIONRECEIPT
             │
             ▼
      PAYMENT ORCHESTRATOR
             │
             ▼
    REGULATED PAYMENT PROVIDER
             │
             ▼
      PAYMENT CONFIRMED ✓
             │
             ▼
        ORDER PLACED ✓
```

## The Seven Logical Agents

### Purchase Orchestrator

Decides what a transaction needs to prove and coordinates the specialist agents.

### Listing Intelligence Agent

Understands the product listing, price, condition and claims.

### Seller Identity & Authority Agent

Checks who is selling and whether they are acting in the claimed capacity.

### Payout Integrity Agent

Checks whether the intended payout beneficiary is consistent with the verified seller.

### LocationProof Agent

Evaluates relevant seller, shop and product-location consistency.

### Product Evidence & LiveCheck Agent

Helps prove that the physical product exists and is actually in the seller’s possession.

### TruthChain Agent

Reconciles all major evidence and identifies contradictions.

---

# AI Does Not Control the Money

This is a core ActionReceipt design principle.

> **AI interprets evidence.
> Code controls payment eligibility.
> The payment provider confirms money movement.**

Gemini agents do not directly move money.

After AI verification, a deterministic server-side policy evaluates the required results.

Example:

```text
Seller         PASS
Payout         PASS
Listing        PASS
Product        PASS
Location       PASS
TruthChain     CONSISTENT
```

Then:

```text
PURCHASE VERIFIED = TRUE
PAYMENT ALLOWED = TRUE
```

If mandatory checks fail:

```text
PAYMENT LOCKED
```

---

# Why Buyers Use ActionReceipt

Buyers gain a stronger way to answer questions such as:

* Is this seller genuinely who they claim to be?
* Does the payment destination match the seller?
* Does the physical product actually exist?
* Does the seller possess the item?
* Is the claimed seller/product location consistent?
* Does the overall transaction evidence make sense?

The buyer does not need to understand the underlying AI architecture.

They see a simple result:

```text
Seller Confirmed ✓
Payout Confirmed ✓
Listing Confirmed ✓
Product Confirmed ✓
Location Confirmed ✓
TruthChain Consistent ✓

PURCHASE VERIFIED ✓
```

---

# Why Sellers Use ActionReceipt

ActionReceipt is not designed only for buyers.

It also gives genuine sellers a reason to participate.

A genuine remote seller often faces another problem:

> **“How do I convince someone who has never met me that I am genuine?”**

ActionReceipt allows legitimate sellers to demonstrate trust through evidence instead of simply asking buyers to believe them.

Seller benefits can include:

* stronger buyer confidence;
* reduced repetitive proof requests;
* a visible ActionReceipt verification status;
* easier remote selling;
* differentiation from fake sellers;
* higher trust for high-value purchases;
* Seller Rewards from successful protected transactions.

## Seller Rewards

Verified sellers receive:

# 15% of eligible paid ActionReceipt protection fees

ActionReceipt OPS retains:

# 85%

Example:

```text
Protected order:
£200

ActionReceipt Protection Fee:
£1.20

Seller Reward:
£0.18

ActionReceipt OPS:
£1.02
```

This means ActionReceipt can protect the buyer **while also rewarding the genuine seller for participating in verified commerce**.

---

# Pricing

ActionReceipt charges **once per successful protected order**, not once per individual product.

| Protected Order Value | Protection Fee |
| --------------------: | -------------: |
|              Under £5 |       **FREE** |
|            £5 – £9.99 |      **£0.30** |
|          £10 – £14.99 |      **£0.35** |
|          £15 – £44.99 |      **£0.40** |
|          £45 – £99.99 |      **£0.65** |
|           £100 – £300 |      **£1.20** |

Pricing above £300 is being defined separately and should not be assumed from the existing tiers.

### Example

A customer buys:

```text
Item A     £1.20
Item B     £0.80
Item C     £1.50
Item D     £0.90

Total      £4.40
```

ActionReceipt fee:

**FREE**

The fee is based on the entire protected order value, not each item.

---

# Where ActionReceipt Can Be Used

ActionReceipt is designed for remote physical commerce including:

### Social Commerce

* TikTok sellers
* Instagram sellers
* Facebook sellers
* WhatsApp sellers

### Marketplaces & Classifieds

* second-hand marketplaces
* classified platforms
* specialist marketplaces
* community marketplaces

### Independent Businesses

* electronics stores
* sole traders
* small online retailers
* independent merchants

### High-Value Remote Purchases

* phones
* cameras
* jewellery
* vehicles
* tractors
* machinery
* equipment

### Large Commerce Platforms

Marketplaces and merchant platforms can integrate ActionReceipt through APIs or platform-level integrations.

---

# Integration Options

ActionReceipt is designed so ordinary sellers do not need to understand APIs or AI.

## Social Seller

```text
Create ActionReceipt Account
        ↓
Verify Seller
        ↓
Add Payout Destination
        ↓
Generate Protected Purchase Link
        ↓
Place Link in Social Profile
        ↓
Buyer Clicks
        ↓
Verify Purchase
```

No coding required.

---

## Private / Classified Seller

```text
Copy Product Listing
        ↓
Open ActionReceipt
        ↓
Create Protected Sale
        ↓
Confirm Product & Price
        ↓
Verify Seller/Product
        ↓
Generate Purchase Link
        ↓
Send to Buyer
```

---

## Small Business

```text
Create Business Account
        ↓
Verify Business
        ↓
Verify Payout
        ↓
Create Sale
        ↓
Send Protected Purchase Link
        ↓
Buyer Verifies
        ↓
Payment
        ↓
Order Placed
```

---

## Online Store

Possible integration methods include:

* ActionReceipt purchase link
* website button
* store connector
* plugin
* API

Platform-native integrations should only be marked as live when they are actually implemented.

---

## Large Marketplace

```text
MARKETPLACE
     ↓
ActionReceipt API
     ↓
Gemini Multi-Agent Verification
     ↓
Policy Engine
     ↓
Purchase Verified / Payment Locked
     ↓
Payment Provider
     ↓
Order Placed ✓
```

---

# Google Cloud Architecture

ActionReceipt is designed around Google Cloud services.

### Google Cloud Run

Hosts backend APIs, orchestration services and verification workflows.

### Gemini 3.6 Flash

Powers the AI multi-agent verification layer.

### Firestore

Stores transaction states, agent results, seller information and pricing records.

### Firebase Authentication

Handles authenticated buyer, seller and administrative sessions.

### Cloud Storage

Stores authorised transaction evidence and verification artefacts.

### Secret Manager

Protects sensitive credentials and service configuration.

### Cloud Logging

Records execution events, agent activity and state transitions.

### Cloud Monitoring

Monitors application health and production services.

---

# Transaction States

The current ActionReceipt transaction scope is deliberately focused.

```text
LISTING_SELECTED
      ↓
PURCHASE_VERIFICATION_REQUESTED
      ↓
VERIFYING
      ↓
PURCHASE_VERIFIED
      ↓
READY_TO_PAY
      ↓
PAYMENT_PENDING
      ↓
PAYMENT_CONFIRMED
      ↓
ORDER_PLACED
      ↓
ACTIONRECEIPT_COMPLETE
```

A failed verification can instead produce:

```text
ADDITIONAL_PROOF_REQUIRED
```

or:

```text
PAYMENT_LOCKED
```

---

# Current Product Boundary

ActionReceipt currently focuses on the part of the transaction where remote-purchase scams are most dangerous:

> **Before and during purchase/payment.**

The current MVP ends at:

# ORDER PLACED ✓

Normal merchant or marketplace fulfilment continues after this point.

The current core architecture does not attempt to replace:

* warehouse systems;
* packing workflows;
* courier systems;
* delivery infrastructure;
* retailer supply chains.

---

# Operations & Revenue Transparency

ActionReceipt separates operational data into three modes:

### Live Production

Only genuine production activity.

If there are no real transactions, values remain zero.

### Demo / Simulator

Synthetic transactions used to demonstrate how verification works.

### Revenue / Growth Projection

Hypothetical scale modelling.

Projection values are always labelled:

**SCENARIO PROJECTION — NOT LIVE REVENUE**

Gross protection fees are divided into:

```text
GROSS PROTECTION FEES
        ↓
┌───────────────────┐
│                   │
▼                   ▼
85%                 15%
ActionReceipt OPS   Seller Rewards
```

---

# Core Principle

ActionReceipt is built around one simple rule:

> **No verified transaction. No protected payment.**

More specifically:

```text
NO VERIFIED SELLER
NO VERIFIED PAYOUT DESTINATION
NO VERIFIED LISTING
NO VERIFIED PRODUCT
NO VERIFIED LOCATION
NO CONSISTENT TRUTHCHAIN
NO VERIFIED PURCHASE
NO PAYMENT
```

Successful journey:

# VERIFY → PROVE → PAY → ORDER PLACED ✓

---

# Vision

ActionReceipt aims to become a reusable trust layer between:

> **“I want to buy this remotely.”**

and:

> **“I am ready to pay.”**

From a social seller sharing a single ActionReceipt link to a large commerce platform integrating through an API, the goal is the same:

**make the transaction prove itself before money moves.**

---

## Website

**https://actionreceipt.app**

---

## Project Status

ActionReceipt is actively being developed.

Some integrations and commercial capabilities shown in the product roadmap may remain prototype, demo, planned, or provider-dependent until their production integrations are completed.

The project should never represent simulated payments, projected revenue, planned platform integrations, or synthetic transactions as live production activity.

---

## Final Message

### For Buyers

**Verify before you pay.**

### For Sellers

**Prove you are genuine. Build buyer confidence. Earn Seller Rewards.**

### For Platforms

**Add a pre-payment trust layer to remote physical commerce.**

---

# ActionReceipt

### **Don’t trust the listing. Make the transaction prove itself.**
