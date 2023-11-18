import { CreateExample, Example, UpdateExample } from "@models/example/schema";

// dummy data
const exampleData: Example[] = [
    { id: "1700184314435", name: "Joe", email: "joe@email.com", role: "admin" },
    {
        id: "1700184329028",
        name: "Patrick",
        email: "patrick@email.com",
        role: "user",
    },
];

function getAll(): Example[] {
    return exampleData;
}

function getById(id: string): Example | undefined {
    return exampleData.find((d) => d.id === id);
}

function create(example: CreateExample): Example {
    const id = Date.now().toString();

    const newExample = { id, ...example };

    exampleData.push(newExample);

    return newExample;
}

function update(id: string, example: UpdateExample): Example | undefined {
    const index = exampleData.findIndex((d) => d.id === id);
    if (index === -1) {
        return;
    }

    const exampleToUpdate = exampleData[index];

    exampleData.splice(index, 1, { ...exampleToUpdate, ...example });

    return exampleData[index];
}

function remove(id: string): void {
    const index = exampleData.findIndex((d) => d.id === id);
    if (index === -1) {
        return;
    }

    exampleData.splice(index, 1);
}

export const ExampleModel = {
    getAll,
    getById,
    create,
    update,
    remove,
} as const;
