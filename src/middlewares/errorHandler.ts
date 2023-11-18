import { HttpException } from "@exceptions/HttpException";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(
    error: Error,
    _: Request,
    res: Response,
    next: NextFunction,
): void {
    if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
    } else if (error instanceof ZodError) {
        res.status(422).json({
            message: error.issues.map(({ path, message }) => ({
                path,
                message,
            })),
        });
    } else {
        next(error);
    }
}
