export const WebhookRoutes = {
    SubscriptionActivated: "/subscription-activated",
    SubscriptionCancelled: "/subscription-cancelled",
    SubscriptionInactivated: "/subscription-inactivated",
} as const;

export const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
