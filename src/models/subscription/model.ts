import {
    Subscription,
    CreateSubscription,
    UpdateSubscription,
} from "@models/subscription/schema";

// dummy data
const subscriptionData: Subscription[] = [
    {
        id: 1,
        userId: 2,
        startTime: 1700263264000,
        endTime: 1702855264000,
        status: "active",
    },
    {
        id: 2,
        userId: 1,
        startTime: 1700243264000,
        endTime: 1703055264000,
        status: "active",
    },
];

function getAll(): Subscription[] {
    return subscriptionData;
}

function getById(id: number): Subscription | undefined {
    return subscriptionData.find((d) => d.id === id);
}

function create(subscription: CreateSubscription): Subscription {
    const id = Date.now();

    const newSubscription = { id, ...subscription };

    subscriptionData.push(newSubscription);

    return newSubscription;
}

function update(
    id: number,
    subscription: UpdateSubscription,
): Subscription | undefined {
    const index = subscriptionData.findIndex((d) => d.id === id);
    if (index === -1) {
        return;
    }

    const subscriptionToUpdate = subscriptionData[index];

    subscriptionData.splice(index, 1, {
        ...subscriptionToUpdate,
        ...subscription,
    });

    return subscriptionData[index];
}

function remove(id: number): void {
    const index = subscriptionData.findIndex((d) => d.id === id);
    if (index === -1) {
        return;
    }

    subscriptionData.splice(index, 1);
}

export const SubscriptionModel = {
    getAll,
    getById,
    create,
    update,
    remove,
} as const;
