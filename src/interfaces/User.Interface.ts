export interface IRegisterUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ILoginUSer {
    email: string;
    password: string;
}

export interface IRegisterUserFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword?: string;
}