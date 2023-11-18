import express from "express";
import { example } from "@/middlewares/global/example";

export const middlewares = [
    express.json(),
    // express.urlencoded(),
    example,
] as const;
