import { NextFunction, Request, Response } from "express";
import { ExampleSchemas } from "@models/example/schema";
import { ExampleModel } from "@models/example/model";
import { HttpException } from "@exceptions/HttpException";

async function getAll(
    _: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const data = await ExampleModel.getAll();

        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}

async function getById(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const id = ExampleSchemas.id.parse(req.params.id);

        const example = await ExampleModel.getById(id);

        if (example === undefined) {
            throw new HttpException(404, "example doesn't exist");
        }

        res.status(200).json(example);
    } catch (err) {
        next(err);
    }
}

async function create(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const example = ExampleSchemas.createExample.parse(req.body);

        const newExample = await ExampleModel.create(example);

        res.status(201).json(newExample);
    } catch (err) {
        next(err);
    }
}

async function update(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const id = ExampleSchemas.id.parse(req.params.id);
        const example = ExampleSchemas.updateExample.parse(req.body);

        const updatedExample = await ExampleModel.update(id, example);

        if (updatedExample === undefined) {
            throw new HttpException(404, "example doesn't exist");
        }

        res.status(200).json(updatedExample);
    } catch (err) {
        next(err);
    }
}

async function remove(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const id = ExampleSchemas.id.parse(req.params.id);

        await ExampleModel.remove(id);

        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
}

export const ExampleController = {
    getAll,
    getById,
    create,
    update,
    remove,
} as const;
