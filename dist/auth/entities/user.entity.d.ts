export declare class User {
    id: string;
    email: string;
    password: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    checkFieldsBeforeInsert(): void;
    checkFieldsBeforeUpdate(): void;
}
