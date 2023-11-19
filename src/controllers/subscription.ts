import { NextFunction, Request, Response } from "express";
import { SubscriptionSchemas } from "@models/subscription/schema";
import { SubscriptionModel } from "@models/subscription/model";
import { HttpException } from "@exceptions/HttpException";

async function activate(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const id = SubscriptionSchemas.id.parse(req.body?.data?.id);

        if (id === undefined) {
            throw new HttpException(
                422,
                "Missing or incorrect subscription id.",
            );
        }

        const subscription = SubscriptionModel.update(id, { status: "active" });

        if (subscription === undefined) {
            throw new HttpException(404, "Subscription not found.");
        }

        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
}

async function cancel(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const id = SubscriptionSchemas.id.parse(req.body?.data?.id);

        if (id === undefined) {
            throw new HttpException(
                422,
                "Missing or incorrect subscription id.",
            );
        }

        const subscription = SubscriptionModel.update(id, {
            status: "cancelled",
        });

        if (subscription === undefined) {
            throw new HttpException(404, "Subscription not found.");
        }

        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
}

async function inactivate(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const id = SubscriptionSchemas.id.parse(req.body?.data?.id);

        if (id === undefined) {
            throw new HttpException(
                422,
                "Missing or incorrect subscription id.",
            );
        }

        const subscription = SubscriptionModel.update(id, {
            status: "inactive",
        });

        if (subscription === undefined) {
            throw new HttpException(404, "Subscription not found.");
        }

        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
}

export const SubscriptionController = {
    activate,
    cancel,
    inactivate,
} as const;
