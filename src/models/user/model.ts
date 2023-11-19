import { CreateUser, UpdateUser, User } from "@models/user/schema";

// dummy data
const userData: User[] = [
    { id: 1, name: "Joe", email: "joe@email.com" },
    {
        id: 2,
        name: "Patrick",
        email: "patrick@email.com",
    },
];

function getAll(): User[] {
    return userData;
}

function getById(id: number): User | undefined {
    return userData.find((d) => d.id === id);
}

function create(user: CreateUser): User {
    const id = Date.now();

    const newUser = { id, ...user };

    userData.push(newUser);

    return newUser;
}

function update(id: number, user: UpdateUser): User | undefined {
    const index = userData.findIndex((d) => d.id === id);
    if (index === -1) {
        return;
    }

    const userToUpdate = userData[index];

    userData.splice(index, 1, { ...userToUpdate, ...user });

    return userData[index];
}

function remove(id: number): void {
    const index = userData.findIndex((d) => d.id === id);
    if (index === -1) {
        return;
    }

    userData.splice(index, 1);
}

export const UserModel = {
    getAll,
    getById,
    create,
    update,
    remove,
} as const;
