import { jsonParser } from "@middlewares/global/jsonParser";

export const middlewares = [jsonParser] as const;
