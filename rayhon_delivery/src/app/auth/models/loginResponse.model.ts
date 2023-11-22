import { IError } from "src/app/shared/models/IError.model"

export interface ILoginResponse {

    phone: string,
    otp_job_id: string
    // error: IError | null
}