export type Role = "normal" | "parent" | "child";

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    parentKey?: string;          // only for parents, e.g. "PG-ABCD1234"
    linkedParentId?: string;     // only for children, points to parent user id
}
