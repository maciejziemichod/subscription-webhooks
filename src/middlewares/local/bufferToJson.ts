import { NextFunction, Request, Response } from "express";

export function bufferToJson(
    req: Request,
    _: Response,
    next: NextFunction,
): void {
    req.body = JSON.parse(req.body.toString());

    next();
}
