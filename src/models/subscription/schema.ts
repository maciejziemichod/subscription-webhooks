import z from "zod";
import { UserSchemas } from "@models/user/schema";

const id = z.number().min(1);
const timestamp = z
    .number()
    .min(1)
    .max(Math.pow(2, 31) - 1);
const subscription = z.object({
    id,
    userId: UserSchemas.id,
    startTime: timestamp,
    endTime: timestamp,
    status: z.enum(["active", "cancelled", "inactive"]),
});
const createSubscription = subscription.omit({ id: true });
const updateSubscription = subscription.partial();

export const SubscriptionSchemas = {
    id,
    subscription,
    createSubscription,
    updateSubscription,
} as const;
export type Subscription = z.infer<typeof subscription>;
export type CreateSubscription = z.infer<typeof createSubscription>;
export type UpdateSubscription = z.infer<typeof updateSubscription>;
