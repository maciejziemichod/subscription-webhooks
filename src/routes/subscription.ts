import express from "express";
import { Router } from "express";
import { SubscriptionController } from "@controllers/subscription";
import { webhookAuth } from "@middlewares/local/webhookAuth";
import { bufferToJson } from "@middlewares/local/bufferToJson";
import { WebhookRoutes } from "@configs/webhooks";

// this would probably be in something like /webhooks so that these middlewares don't interfere with global ones
const path = "/";
const router = Router();

router.use(express.raw({ type: "*/*" }));
router.use(webhookAuth);
router.use(bufferToJson);

router.post(
    WebhookRoutes.SubscriptionActivated,
    SubscriptionController.activate,
);
router.post(WebhookRoutes.SubscriptionCancelled, SubscriptionController.cancel);
router.post(
    WebhookRoutes.SubscriptionInactivated,
    SubscriptionController.inactivate,
);

export const SubscriptionRoute = [path, router] as const;
