import z from "zod";

const id = z.number().min(1);
const user = z.object({
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
});
const createUser = user.omit({ id: true });
const updateUser = createUser.partial();

export const UserSchemas = {
    id,
    user,
    createUser,
    updateUser,
} as const;
export type User = z.infer<typeof user>;
export type CreateUser = z.infer<typeof createUser>;
export type UpdateUser = z.infer<typeof updateUser>;
