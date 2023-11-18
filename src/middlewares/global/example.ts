import { NextFunction, Request, Response } from "express";

export function example(_: Request, __: Response, next: NextFunction): void {
    console.log("hello from global middleware");
    next();
}
