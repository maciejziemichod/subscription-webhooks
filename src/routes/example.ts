import { Router } from "express";
import { ExampleController } from "@controllers/example";

const path = "/example";
const router = Router();

router.route("/").get(ExampleController.getAll).post(ExampleController.create);

router
    .route("/:id")
    .get(ExampleController.getById)
    .patch(ExampleController.update)
    .delete(ExampleController.remove);

export const ExampleRoute = [path, router] as const;
