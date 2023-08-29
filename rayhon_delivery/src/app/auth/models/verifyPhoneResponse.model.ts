import { IError } from "src/app/shared/models/IError.model"

export interface IVerifyPhoneResponse {
    data: {
        access_token: string,
        expires: string
    } | null
    error: IError | null
}