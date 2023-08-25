export interface ILoginResponse {
    data: {
            phone: string,
            otp_job_id: string
          } | null,
    error: {
            code: string,
            message: string
           } | null
}