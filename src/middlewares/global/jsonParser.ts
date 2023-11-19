import { WebhookRoutes } from "@configs/webhooks";
import express, { NextFunction, Request, Response } from "express";

const expressJsonParser = express.json();
const webhookRoutes: string[] = Object.values(WebhookRoutes);

export function jsonParser(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    if (webhookRoutes.includes(req.path)) {
        next();
    } else {
        expressJsonParser(req, res, next);
    }
}
