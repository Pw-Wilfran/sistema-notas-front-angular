export interface User {
    id: number;
    firts_name: string;
    last_name: string;
    email: string;
    username: string;
    active: boolean;
    created_at?: string;
    updated_at?: string;
    roles?: Role[];
}

export interface Role {
    id: number;
    name: string;
}

export interface CreateUserDto {
    firts_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    active?: boolean;
    role_id?: number;
}

export interface UpdateUserDto {
    firts_name?: string;
    last_name?: string;
    email?: string;
    username?: string;
    password?: string;
    active?: boolean;
    role_id?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface AssignRolesDto {
    roles: number[];
}