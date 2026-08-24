<div align="center">

# 💸 NexPay

### Move Money. Connect Africa.

A modern payment platform designed to simplify local and cross-border payments across Africa.

<br />

![Status](https://img.shields.io/badge/status-MVP%20in%20development-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TanStack](https://img.shields.io/badge/TanStack-Start-ff4154)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-336791)
![License](https://img.shields.io/badge/license-MIT-green)

<br />

**Send money as easily as sending a message.**

</div>

---

# 🌍 What is NexPay?

NexPay is a fintech platform designed to make **local and cross-border payments simpler, faster and more accessible**.

The initial idea behind NexPay comes from a simple observation:

> Sending money between African countries is still unnecessarily complicated.

A person in the Republic of Congo may want to send money to someone in Senegal.

Today, depending on the countries, operators and payment methods involved, this can require:

- multiple intermediaries;
- expensive transfer fees;
- complicated procedures;
- limited payment methods;
- poor user experience;
- separate applications for different payment networks.

NexPay aims to provide a unified experience.

Instead of forcing users to understand the underlying payment infrastructure, NexPay provides a simple interface:

```text
Choose a recipient
        ↓
Enter an amount
        ↓
Choose a payment method
        ↓
Confirm
        ↓
Money transferred
```

The complexity remains behind the scenes.

---

# 🎯 Vision

NexPay's long-term vision is to become a **payment layer connecting African payment ecosystems**.

The goal is not simply to build another money-transfer application.

The ambition is to create an infrastructure where users can interact with different payment methods through a single experience.

```text
                    NEXPAY
                       │
              Payment Orchestration
                       │
        ┌──────────────┼──────────────┐
        │              │              │
    Mobile Money     Cards          Banks
        │              │              │
   ┌────┼────┐      ┌──┴──┐          │
   │    │    │      │     │          │
  MTN Airtel Orange Visa Mastercard  ...
   │    │    │
   └────┼────┘
        │
      Users
```

---

# 🚨 The Problem

Africa has one of the world's most dynamic digital-payment ecosystems.

Mobile Money has dramatically improved access to financial services.

However, the ecosystem remains fragmented.

Different countries may have different:

- Mobile Money operators;
- payment providers;
- banking systems;
- currencies;
- regulations;
- transaction limits;
- payment APIs.

This creates friction for users.

### Example

A user in Congo wants to send:

```text
10,000 XAF
```

to a friend in Senegal.

The user should not need to know:

- which payment network exists in Senegal;
- which provider handles the transaction;
- how the payment API works;
- how the payout is processed;
- how the currency conversion works.

They should simply be able to enter:

```text
+221 XX XXX XX XX
```

and send the money.

That's the experience NexPay is trying to build.

---

# 💡 The Solution

NexPay provides a unified interface for payments.

The application acts as an **orchestration layer** between users and supported payment providers.

```text
User
 │
 ▼
NexPay
 │
 ▼
Payment Engine
 │
 ▼
Payment Provider
 │
 ├── Mobile Money
 ├── Card
 └── Other supported methods
```

NexPay is designed so that the application does not need to directly integrate every local payment network itself.

Instead, payment providers can abstract parts of the underlying infrastructure.

---

# ⚠️ Important Regulatory Principle

NexPay is being designed around a critical principle:

> NexPay should not unnecessarily hold customer funds.

The initial architecture is therefore designed around payment orchestration rather than becoming a bank or creating its own stored-value wallet.

However:

**Using a regulated payment provider does not automatically make NexPay legally compliant in every country.**

Financial regulation depends on:

- the countries where NexPay operates;
- the exact services offered;
- the flow of funds;
- the legal entity;
- the payment provider;
- KYC/AML obligations;
- licensing requirements;
- consumer protection requirements;
- data protection requirements.

The legal structure must therefore be validated before going live.

The MVP is initially intended for **development, testing and sandbox environments**.

---

# 🚀 MVP

The first version of NexPay will intentionally remain focused.

The MVP is not intended to become a complete bank.

The MVP focuses on one core use case:

> **Send money from one supported payment method to another supported recipient.**

---

## MVP Goals

The MVP should allow a user to:

1. Create an account.
2. Verify their phone number.
3. Complete the required identity information.
4. Add a payment method.
5. Select a recipient.
6. Enter an amount.
7. See the fees before confirmation.
8. Confirm the transaction.
9. Authenticate the transaction.
10. Track the transaction.
11. Receive a transaction receipt.

---

# 👤 Authentication

NexPay follows a mobile-first authentication experience.

### Registration

```text
Phone number
      ↓
OTP
      ↓
Personal information
      ↓
Security PIN
      ↓
Account created
```

The phone number is the primary identity used by the application.

---

## Login

```text
Phone number
      ↓
Password / authentication method
      ↓
Authenticated session
```

Additional authentication mechanisms may be introduced later.

---

# 🔐 Transaction PIN

Authentication and transaction authorization are intentionally separated.

Being logged into NexPay should not automatically authorize a financial transaction.

Example:

```text
User logged in
      ↓
Send 50,000 XAF
      ↓
Transaction PIN
      ↓
Payment authorized
```

This separation is critical for financial operations.

---

# 👥 Contacts

Users should be able to send money using:

- phone numbers;
- saved contacts;
- NexPay contacts;
- favorite recipients.

With permission, NexPay can access the device contact list.

```text
Contacts
   │
   ├── Marie
   ├── Paul
   ├── Junior
   └── Mom
```

A user can select a contact instead of manually entering a phone number.

---

# 💸 Send Money Flow

The core NexPay experience:

```text
Dashboard
    │
    ▼
Send Money
    │
    ▼
Choose recipient
    │
    ▼
Enter amount
    │
    ▼
Choose payment method
    │
    ▼
Display fees
    │
    ▼
Display exchange rate
    │
    ▼
Transaction summary
    │
    ▼
Transaction PIN
    │
    ▼
Payment processing
    │
    ▼
Provider confirmation
    │
    ▼
Success / Failed / Pending
```

---

# 💰 Transaction Example

A user wants to send:

```text
10,000 XAF
```

NexPay should display something similar to:

```text
Amount                  10,000 XAF

NexPay fee                 500 XAF

Provider fee               XXX XAF

-----------------------------------

Total                    XX,XXX XAF

Recipient receives       XX,XXX XAF
```

The exact fees must be calculated dynamically based on:

- country;
- currency;
- payment method;
- provider;
- transaction amount;
- applicable taxes;
- exchange rate.

NexPay should never hard-code assumptions about provider fees.

---

# 🌍 Cross-Border Transfers

Cross-border payments introduce additional complexity.

A transaction may involve:

```text
Sender
  │
  │  Currency A
  ▼
NexPay
  │
  │  Payment Provider
  ▼
Collection
  │
  ▼
Currency Conversion
  │
  ▼
Payout
  │
  ▼
Recipient
  │
  │ Currency B
```

The user should see the complete transaction information before confirmation.

---

# 🏦 Payment Providers

NexPay is designed around a provider abstraction.

The first provider can be:

**Moneroo**

The architecture should not permanently depend on a single provider.

```text
NexPay
   │
   ▼
Payment Provider Interface
   │
   ├── Moneroo
   ├── Provider B
   └── Provider C
```

This allows NexPay to add providers later.

---

# 🧩 Payment Provider Architecture

The application should never scatter provider-specific logic throughout the codebase.

Instead:

```text
packages/payments/

├── core/
│
├── providers/
│   ├── moneroo/
│   ├── provider-b/
│   └── provider-c/
│
└── types/
```

Conceptually:

```typescript
interface PaymentProvider {
  createCollection(): Promise<CollectionResult>

  createPayout(): Promise<PayoutResult>

  getTransaction(): Promise<TransactionResult>

  verifyWebhook(): Promise<WebhookResult>
}
```

The rest of NexPay interacts with the abstraction.

---

# 🔄 Transaction State Machine

A transaction should not simply be:

```text
SUCCESS / FAILED
```

Real payment systems need multiple states.

Example:

```text
CREATED
   ↓
PENDING
   ↓
PROCESSING
   ↓
SUCCESS
```

or:

```text
PENDING
   ↓
FAILED
```

or:

```text
PENDING
   ↓
CANCELLED
```

The system must be designed to handle asynchronous payment processing.

---

# 🔔 Webhooks

Payment providers may notify NexPay asynchronously.

Example:

```text
Payment Provider
      │
      │ webhook
      ▼
NexPay Server
      │
      ▼
Verify signature
      │
      ▼
Validate event
      │
      ▼
Update transaction
      │
      ▼
Notify user
```

Webhook processing must be:

- authenticated;
- idempotent;
- logged;
- retry-safe.

---

# 🔁 Idempotency

Financial operations must protect against duplicate transactions.

Example:

```text
User clicks "Pay"
        ↓
Request sent
        ↓
Network timeout
        ↓
User clicks again
```

NexPay must not create two payments accidentally.

Idempotency keys should therefore be used for critical operations.

---

# 📜 Transaction History

Users should be able to see:

- amount;
- currency;
- recipient;
- sender;
- fees;
- provider;
- status;
- date;
- transaction reference.

Example:

```text
+----------------------------------+
| Transaction                     |
|                                  |
| To: Paul                         |
| Amount: -10,000 XAF              |
| Fee: 500 XAF                     |
| Status: Completed                |
| Reference: NP_01HXXXXXXXX       |
| Date: 12 Aug 2026                |
+----------------------------------+
```

---

# 🧾 Receipts

Successful transactions should generate a digital receipt.

The receipt should contain:

- NexPay reference;
- sender;
- recipient;
- amount;
- currency;
- fees;
- date;
- payment method;
- status.

---

# 🔔 Notifications

NexPay should notify users about:

- successful payments;
- failed payments;
- pending payments;
- received money;
- security events;
- account changes.

Channels may include:

- in-app notifications;
- email;
- SMS;
- push notifications.

---

# 📊 Dashboard

The dashboard is designed around actions rather than financial-accounting complexity.

Main actions:

```text
💸 Send Money
📥 Receive Money
```

Additional sections:

```text
Recent transactions
Payment methods
Favorite contacts
Monthly activity
Supported countries
```

---

# 💳 Payment Methods

Users should be able to manage supported payment methods.

Example:

```text
Payment Methods

✓ MTN Mobile Money
✓ Airtel Money
✓ Orange Money
✓ Visa
✓ Mastercard

+ Add payment method
```

The exact available methods depend on the country and payment provider.

---

# 🌍 Supported Countries

The initial development target may focus on a limited number of markets.

Potential initial markets:

```text
🇨🇬 Republic of the Congo
🇨🇩 Democratic Republic of the Congo
🇸🇳 Senegal
🇬🇦 Gabon
```

Country availability is not guaranteed.

Actual launch countries will depend on:

- provider coverage;
- regulatory approval;
- KYC requirements;
- supported currencies;
- payment methods;
- business onboarding;
- operational feasibility.

---

# 💱 Currency

NexPay should be designed for multi-currency transactions.

Examples:

```text
XAF
CDF
XOF
EUR
USD
```

Currency conversion must be handled explicitly.

The system should never silently convert money without showing the user:

```text
Exchange rate
Conversion fee
Amount sent
Amount received
```

---

# 💵 Business Model

NexPay may generate revenue through transaction fees.

Example:

```text
User sends 10,000 XAF

Provider cost
      +
NexPay fee
      +
Potential taxes
      =
Total cost
```

NexPay's pricing engine should be configurable.

It should support:

- percentage fees;
- fixed fees;
- country-specific fees;
- provider-specific fees;
- minimum fees;
- maximum fees;
- promotional pricing.

---

# 📈 Pricing Engine

Instead of hard-coding:

```typescript
fee = amount * 0.05
```

NexPay should have a pricing system.

Conceptually:

```text
Transaction
     │
     ▼
Country
     │
     ▼
Currency
     │
     ▼
Payment method
     │
     ▼
Provider
     │
     ▼
Pricing rules
     │
     ▼
Final fee
```

This allows pricing rules to evolve without rewriting the payment engine.

---

# 🏗 Architecture

NexPay uses a **TypeScript-first full-stack architecture**.

```text
                         NEXPAY
                           │
                  TanStack Start
                           │
              ┌────────────┴────────────┐
              │                         │
           React UI              Server Functions
              │                         │
              └────────────┬────────────┘
                           │
                    Business Logic
                           │
            ┌──────────────┼──────────────┐
            │              │              │
          Auth          Payments       Users
            │              │              │
            └──────────────┼──────────────┘
                           │
                      Drizzle ORM
                           │
                      PostgreSQL
                           │
                External Integrations
                           │
                         Moneroo
```

---

# 🧰 Technology Stack

## Frontend

- React
- TypeScript
- TanStack Start
- TanStack Router
- TanStack Query
- TanStack Form
- Tailwind CSS
- shadcn/ui

---

## Backend

NexPay does not use a separate Django backend.

The application backend is built directly into the TypeScript ecosystem using:

- TanStack Start
- Server Functions
- Server Routes
- Middleware

---

## Database

- PostgreSQL
- Drizzle ORM

---

## Validation

- Zod

---

## Authentication

Authentication architecture may use:

- Better Auth
- OTP provider
- secure sessions
- transaction PIN

The exact implementation may evolve during MVP development.

---

## Payments

- Moneroo
- Additional payment providers in the future

---

## Testing

- Vitest
- Playwright
- React Testing Library

---

## Tooling

- pnpm
- Turborepo
- ESLint
- Prettier
- TypeScript

---

## Deployment

The application should support modern TypeScript-compatible hosting environments.

Possible infrastructure:

- Cloudflare
- Railway
- Vercel
- PostgreSQL hosting
- Object storage

The final deployment architecture will depend on production requirements.

---

# 📦 Monorepo

NexPay uses a monorepo architecture.

```text
nexpay/
│
├── apps/
│   │
│   ├── web/
│   │   └── Main NexPay application
│   │
│   └── admin/
│       └── Administration dashboard
│
├── packages/
│   │
│   ├── ui/
│   │   └── Shared UI components
│   │
│   ├── db/
│   │   └── Database schema & Drizzle
│   │
│   ├── auth/
│   │   └── Authentication
│   │
│   ├── payments/
│   │   └── Payment abstraction
│   │
│   ├── validation/
│   │   └── Zod schemas
│   │
│   ├── config/
│   │   └── Shared configuration
│   │
│   └── types/
│       └── Shared TypeScript types
│
├── docs/
│
├── tooling/
│
├── .env.example
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.json
└── README.md
```

---

# 📁 Application Structure

Example:

```text
apps/web/

├── src/
│
├── routes/
│   ├── __root.tsx
│   │
│   ├── index.tsx
│   │
│   ├── auth/
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── verify.tsx
│   │
│   └── app/
│       ├── dashboard.tsx
│       ├── send.tsx
│       ├── receive.tsx
│       ├── contacts.tsx
│       ├── transactions.tsx
│       ├── payment-methods.tsx
│       └── settings.tsx
│
├── components/
│
├── features/
│   ├── auth/
│   ├── payments/
│   ├── contacts/
│   └── transactions/
│
├── lib/
│
└── styles/
```

---

# 🗄 Database

The database will manage the core NexPay domain.

Main entities may include:

```text
User
Profile
PhoneNumber
Identity
Session

PaymentMethod
PaymentProvider

Recipient
Contact

Transaction
TransactionFee
TransactionEvent
PaymentAttempt

Currency
ExchangeRate

Notification
AuditLog
WebhookEvent
```

The exact schema is documented separately in the database documentation.

---

# 🔐 Security Architecture

Security is a first-class concern.

NexPay must protect:

- personal information;
- authentication credentials;
- transaction data;
- payment references;
- provider credentials;
- webhook secrets.

---

## Security principles

### Never trust the client

Frontend validation is useful for UX.

It is not a security mechanism.

Every sensitive operation must be validated server-side.

---

### Never expose provider secrets

Payment provider API keys must remain server-side.

Never place them in:

```text
React client
localStorage
public environment variables
Git repository
```

---

### Transaction authorization

Sensitive actions require additional authorization.

```text
Authenticated user
        ↓
Transaction request
        ↓
Authorization
        ↓
PIN / security challenge
        ↓
Payment
```

---

### Rate limiting

Rate limiting should protect:

- login;
- OTP;
- PIN attempts;
- payment creation;
- API endpoints;
- webhook endpoints.

---

# 🧾 KYC / AML

NexPay may need to collect information required by applicable laws and payment partners.

Depending on the final operating model, this may include:

- legal name;
- date of birth;
- phone number;
- country;
- identity document;
- identity verification;
- address;
- transaction information.

The exact requirements depend on the regulatory framework and payment partners.

---

# ⚖️ Regulatory Disclaimer

NexPay is a software project and does not claim to be a bank, payment institution, electronic-money issuer or money-transfer operator by default.

The final legal classification depends on:

- the operating countries;
- the legal entity;
- the flow of funds;
- the services offered;
- the contractual structure with payment providers;
- applicable financial regulations.

Before production launch, NexPay must obtain appropriate legal and regulatory advice.

The MVP should initially operate in sandbox/test environments until the business model and regulatory structure are validated.

---

# 🔄 Complete Transaction Architecture

Example cross-border transaction:

```text
                    USER
                     │
                     ▼
              NexPay Web App
                     │
                     ▼
             Authentication
                     │
                     ▼
              Transaction API
                     │
                     ▼
              Pricing Engine
                     │
                     ▼
             Currency Engine
                     │
                     ▼
              Payment Engine
                     │
                     ▼
             Provider Adapter
                     │
                     ▼
                  Moneroo
                     │
          ┌──────────┴──────────┐
          │                     │
      Collection             Payout
          │                     │
          └──────────┬──────────┘
                     │
                     ▼
                Recipient
                     │
                     ▼
               Webhook Event
                     │
                     ▼
            Transaction Update
                     │
                     ▼
                 Receipt
```

---

# 🔁 Reliability

Financial systems must assume that things can fail.

NexPay should handle:

- network failures;
- provider downtime;
- duplicate requests;
- delayed webhooks;
- duplicate webhooks;
- partial payment states;
- timeout;
- failed collection;
- failed payout;
- cancelled transaction.

---

# 📊 Transaction Observability

Each transaction should have a complete event history.

Example:

```text
Transaction created
        ↓
Payment initiated
        ↓
Collection pending
        ↓
Collection successful
        ↓
Payout initiated
        ↓
Payout successful
        ↓
Transaction completed
```

This allows support and administrators to understand exactly what happened.

---

# 🛠️ Local Development

## Requirements

Recommended:

- Node.js
- pnpm
- PostgreSQL
- Git
- Docker (optional)

---

## Install

```bash
git clone <repository-url>

cd nexpay

pnpm install
```

---

## Environment variables

Create:

```bash
cp .env.example .env
```

Example:

```env
DATABASE_URL=

AUTH_SECRET=

MONEROO_API_KEY=
MONEROO_WEBHOOK_SECRET=

OTP_PROVIDER_API_KEY=

APP_URL=http://localhost:3000
```

Never commit `.env`.

---

# 🗃 Database

Run migrations:

```bash
pnpm db:migrate
```

Generate Drizzle migrations:

```bash
pnpm db:generate
```

Open database tooling:

```bash
pnpm db:studio
```

---

# ▶️ Development

Start the development environment:

```bash
pnpm dev
```

The application should become available locally.

---

# 🧪 Testing

Run unit tests:

```bash
pnpm test
```

Run E2E tests:

```bash
pnpm test:e2e
```

Run type checking:

```bash
pnpm typecheck
```

Run linting:

```bash
pnpm lint
```

---

# 🧹 Code Quality

Before opening a pull request:

```bash
pnpm lint
pnpm typecheck
pnpm test
```

---

# 🌿 Git Workflow

Recommended branch structure:

```text
main
│
├── develop
│
├── feature/auth
├── feature/payments
├── feature/contacts
├── feature/transactions
└── fix/payment-webhook
```

Commit examples:

```text
feat(auth): add phone authentication

feat(payments): add payment provider abstraction

feat(transactions): add transaction history

fix(webhooks): prevent duplicate payment processing

docs(readme): update architecture
```

---

# 🗺 Roadmap

## Phase 0 — Foundation

- [x] Define product vision
- [x] Define MVP
- [x] Define architecture
- [ ] Initialize monorepo
- [ ] Configure TypeScript
- [ ] Configure TanStack Start
- [ ] Configure Turborepo
- [ ] Configure PostgreSQL
- [ ] Configure Drizzle
- [ ] Configure CI

---

# Phase 1 — Authentication

- [ ] Registration
- [ ] Phone number verification
- [ ] OTP
- [ ] Login
- [ ] Sessions
- [ ] Security PIN
- [ ] Account recovery

---

# Phase 2 — User Profile

- [ ] Profile
- [ ] Country
- [ ] Phone number
- [ ] Identity information
- [ ] KYC structure
- [ ] Security settings

---

# Phase 3 — Contacts

- [ ] Contacts permission
- [ ] Import contacts
- [ ] NexPay users detection
- [ ] Favorite recipients
- [ ] Recipient search

---

# Phase 4 — Payment Engine

- [ ] Payment provider abstraction
- [ ] Moneroo integration
- [ ] Collection
- [ ] Payout
- [ ] Transaction creation
- [ ] Transaction states
- [ ] Webhooks
- [ ] Idempotency
- [ ] Retry system

---

# Phase 5 — Money Transfer

- [ ] Local transfers
- [ ] Cross-border transfers
- [ ] Fees
- [ ] Currency conversion
- [ ] Transaction summary
- [ ] PIN confirmation
- [ ] Receipts
- [ ] Notifications

---

# Phase 6 — Dashboard

- [ ] Dashboard
- [ ] Recent transactions
- [ ] Payment methods
- [ ] Favorite contacts
- [ ] Activity statistics
- [ ] Country selection

---

# Phase 7 — Admin

- [ ] Admin authentication
- [ ] User management
- [ ] Transaction monitoring
- [ ] Payment monitoring
- [ ] Webhook monitoring
- [ ] Fraud monitoring
- [ ] Audit logs
- [ ] Support tools

---

# 🚀 Post-MVP

Once the core product is validated:

### Payments

- [ ] QR payments
- [ ] Merchant payments
- [ ] Payment links
- [ ] Request money
- [ ] Recurring payments

### Financial ecosystem

- [ ] More Mobile Money providers
- [ ] More countries
- [ ] More currencies
- [ ] Bank transfers
- [ ] Virtual cards

### Business

- [ ] Business accounts
- [ ] Merchant dashboard
- [ ] Invoices
- [ ] Payment API
- [ ] Developer platform

### Mobile

- [ ] Android application
- [ ] iOS application

---

# 🌐 Long-Term Vision

NexPay can eventually evolve into several products.

```text
                    NEXPAY
                       │
        ┌──────────────┼──────────────┐
        │              │              │
    NexPay App     NexPay Business  NexPay API
        │              │              │
        │              │              │
    Consumers       Merchants      Developers
```

Potential products:

```text
NexPay
NexPay Business
NexPay Merchant
NexPay API
NexPay QR
NexPay Cards
```

---

# 🧠 Design Philosophy

NexPay follows several principles.

## 1. Simplicity

Financial infrastructure is complicated.

The user experience should not be.

---

## 2. Transparency

Before confirming a transaction, users should understand:

- how much they send;
- how much they pay;
- how much the recipient receives;
- the exchange rate;
- the expected status.

---

## 3. Reliability

A payment system must assume failure.

Every transaction needs traceability.

---

## 4. Security

Security is not a feature added at the end.

It is part of the architecture.

---

## 5. Interoperability

NexPay should not be locked into one payment provider.

---

## 6. African-first

The product is designed around the realities of African payments:

- Mobile Money;
- different currencies;
- fragmented payment ecosystems;
- varying infrastructure;
- cross-border transactions.

---

# 🤝 Contributing

Contributions are welcome.

Before contributing:

1. Read the documentation.
2. Open an issue for significant changes.
3. Create a feature branch.
4. Write tests.
5. Keep commits focused.
6. Open a pull request.

---

# 📄 Documentation

Additional documentation will be available under:

```text
docs/

├── architecture/
├── database/
├── payments/
├── security/
├── api/
├── deployment/
├── regulatory/
└── product/
```

---

# 🔐 Security Issues

Do not publicly disclose security vulnerabilities.

Security reports should be handled privately through the project's security process.

---

# 📜 License

This project is currently distributed under the MIT License.

See:

```text
LICENSE
```

for details.

> Note: licensing the source code does not grant permission to operate a regulated financial service. Commercial deployment remains subject to applicable laws, regulations and contractual requirements.

---

# 👨‍💻 Author

**Dieuveil RODIM'S**

Full-Stack Developer & Founder

Building technology for Africa.

---

# 🌍 NexPay

> **Move Money. Connect Africa.**

NexPay is built around a simple belief:

**Sending money should be as easy as sending a message.**

---

<div align="center">

### 💸 Move Money.
### 🌍 Connect Africa.

**NexPay**

</div>