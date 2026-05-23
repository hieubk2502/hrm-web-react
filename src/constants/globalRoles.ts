export const GLOBAL_ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    USER: 'user',
    HR: 'hr',
    EMPLOYEE: 'employee',
} as const;

export type GlobalRole = typeof GLOBAL_ROLES[keyof typeof GLOBAL_ROLES];
