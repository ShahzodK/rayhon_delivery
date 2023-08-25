export interface IVerifyPhoneResponse {
    data: {
        access_token: string,
        expires: string
    } | null
    error: {
        code: string,
        message: string
    } | null
}