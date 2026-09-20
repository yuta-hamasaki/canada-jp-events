# Hinode Vancouver

A bilingual, self-service marketplace for Japanese community and cultural events in Metro Vancouver. Organizers own their listings and publish without review; free events require a verified Clerk email, while paid events additionally require a Stripe Connect account with charges enabled.

## Stack

Next.js 16 App Router, TypeScript, Tailwind CSS, Clerk, Neon PostgreSQL/Prisma, Stripe Checkout + Connect, Resend and S3-compatible object storage.

## Local setup

1. Use Node 20.9+ and copy `.env.example` to `.env.local`.
2. Create Neon, Clerk, Stripe, Resend, and S3-compatible storage projects and fill the environment variables. Never expose secret variables as `NEXT_PUBLIC_*`.
3. Run `npm install`, `npx prisma migrate dev --name init`, then `npm run dev`.
4. Seed the categories listed in `prisma/seed.ts` through your deployment seed job.

`TOKEN_PEPPER` must be at least 32 random characters and must remain stable. Amounts are integer cents and the MVP currency is CAD. `PLATFORM_FEE_PERCENT` defaults to 3 and is configurable without a deploy-time code edit.

## Payments and Stripe Connect

The checkout implementation uses **destination charges**: the platform creates the Checkout payment, transfers it to the organizer's connected account, and retains `application_fee_amount`. This provides one platform-controlled Checkout/Webhook integration; your terms must explicitly allocate refunds, disputes, and seller obligations. Revisit direct charges if platform-of-record obligations are unacceptable in your jurisdiction.

The success redirect is not proof of payment. Both the signed webhook and success handler must retrieve the Checkout Session from Stripe and call the idempotent `fulfillCheckoutSession()`. Fulfillment verifies session/order identity, status, currency and amount in a database transaction. Ticket inventory is claimed with a conditional update. Raw access/check-in/return tokens must never be logged or stored.

For local webhook testing:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
stripe trigger checkout.session.completed
```

Copy the emitted signing secret to `STRIPE_WEBHOOK_SECRET`. Subscribed production events are `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `charge.refunded`, and `account.updated`.

## Validation and deployment

```bash
npm run typecheck
npm run lint
npm test
npm run db:validate
npm run build
```

On Vercel, configure every variable from `.env.example`, use pooled Neon `DATABASE_URL`, add the production Stripe webhook URL, and run `prisma migrate deploy` in the release step. Configure lifecycle cleanup for abandoned image uploads. Images permit only JPEG, PNG, and WebP after server-side MIME/dimension validation; store object key, URL, size and dimensions in `EventImage`, never binary data.

## Security notes

All organizer/admin mutations require Clerk server-side authentication, verified email, role and ownership checks. Download endpoints accept only ticket owner identity, a hashed access token, or a current hashed return cookie. Check-in uses a separate hashed token and atomic `VALID` → `USED` update. Resend failures occur after ticket commit and are retryable. Resend/report/checkout/publish endpoints should use a durable Redis rate limiter in production; resend responses must always be generic to prevent enumeration.
