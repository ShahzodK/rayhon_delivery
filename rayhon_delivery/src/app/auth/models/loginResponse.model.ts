import { IError } from "src/app/shared/models/IError.model"

export interface ILoginResponse {
    data: {
            phone: string,
            otp_job_id: string
          } | null,
    error: IError | null
}