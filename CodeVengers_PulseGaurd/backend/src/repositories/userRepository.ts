import { User, Role } from "../types/user";

// In-memory store
let users: User[] = [
    { id: "parent-1", name: "Alice (Parent)", email: "alice@example.com", role: "parent" },
    { id: "child-1", name: "Bob (Child)", email: "bob@example.com", role: "child" },
    { id: "normal-1", name: "Charlie (Normal)", email: "charlie@example.com", role: "normal" }
];

export const userRepository = {
    findById: async (id: string): Promise<User | undefined> => {
        return users.find(u => u.id === id);
    },

    createUser: async (user: User): Promise<User> => {
        users.push(user);
        return user;
    },

    findByParentKey: async (parentKey: string): Promise<User | undefined> => {
        return users.find(u => u.parentKey === parentKey);
    },

    findChildrenByParentId: async (parentId: string): Promise<User[]> => {
        return users.filter(u => u.linkedParentId === parentId);
    },

    updateUser: async (id: string, updates: Partial<User>): Promise<User | undefined> => {
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex === -1) return undefined;

        users[userIndex] = { ...users[userIndex], ...updates };
        return users[userIndex];
    },

    generateParentKey: (): string => {
        let key = "";
        let isUnique = false;
        while (!isUnique) {
            const randomStr = Math.random().toString(36).substring(2, 10).toUpperCase();
            key = `PG-${randomStr}`;
            isUnique = !users.some(u => u.parentKey === key);
        }
        return key;
    },

    // For testing/mocking
    getAll: async () => users
};
