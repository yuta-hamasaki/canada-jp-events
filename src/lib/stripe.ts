import Stripe from "stripe";
export function stripeClient(){if(!process.env.STRIPE_SECRET_KEY)throw new Error("STRIPE_SECRET_KEY is not configured");return new Stripe(process.env.STRIPE_SECRET_KEY)}
export function platformFeePercent(){const value=Number(process.env.PLATFORM_FEE_PERCENT??"3");if(!Number.isFinite(value)||value<0||value>100)throw new Error("Invalid PLATFORM_FEE_PERCENT");return value}
