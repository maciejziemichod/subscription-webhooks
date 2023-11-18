import z from "zod";

const id = z.string();
const example = z.object({
    id,
    name: z
        .string({ required_error: "Name is required." })
        .trim()
        .min(1, "Name cannot be empty."),
    email: z
        .string({ required_error: "Email is required." })
        .trim()
        .min(1, "Email cannot be empty.")
        .email("Invalid email."),
    role: z.enum(["admin", "user"], { invalid_type_error: "Invalid role." }),
});
const createExample = example.omit({ id: true });
const updateExample = createExample.partial();

export const ExampleSchemas = {
    id,
    example,
    createExample,
    updateExample,
} as const;
export type Example = z.infer<typeof example>;
export type CreateExample = z.infer<typeof createExample>;
export type UpdateExample = z.infer<typeof updateExample>;
