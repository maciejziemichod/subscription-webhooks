import express from "express";
import { middlewares } from "@middlewares/index";
import { routes } from "@routes/index";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(...middlewares);

routes.forEach(([path, route]) => {
    app.use(path, route);
});

app.use(errorHandler);

export default app;
