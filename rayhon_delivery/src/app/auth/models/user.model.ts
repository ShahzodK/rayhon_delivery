export interface IUser {
    data: {
        id: string,
        phone: string,
        first_name: string,
        last_name: string,
        image: string,
        language: string
    } | null,
    error: null | {
        code: string
        message: string
    }
}