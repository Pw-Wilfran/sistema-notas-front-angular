export interface CreateStudentDto {
    name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    active: boolean;

    document: string;
    birth_date?: string;
    phone?: string;

    is_active: boolean;
}