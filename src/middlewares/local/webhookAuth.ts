import crypto from "crypto";
import { HttpException } from "@exceptions/HttpException";
import { NextFunction, Request, Response } from "express";
import { WEBHOOK_SECRET } from "@configs/webhooks";

export function webhookAuth(
    req: Request,
    _: Response,
    next: NextFunction,
): void {
    if (WEBHOOK_SECRET === undefined) {
        console.error(
            "This shouldn't happen due to environment variables validation on app start (unimplemented). We'll throw error as if the validation was incorrect",
        );
        throw new HttpException(401, "Invalid signature.");
    }

    const signature = req.get("x-signature");
    if (signature === undefined) {
        throw new HttpException(400, "Missing signature.");
    }

    const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
    const digest = hmac.update(req.body).digest("hex");
    let isSignatureValid = false;
    console.log(digest);

    try {
        isSignatureValid = crypto.timingSafeEqual(
            Buffer.from(digest, "utf8"),
            Buffer.from(signature, "utf8"),
        );
    } catch (err) {}

    if (!isSignatureValid) {
        throw new HttpException(401, "Invalid signature.");
    }

    next();
}
