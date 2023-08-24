export interface IVerifyPhoneRequest {
    phone: string,
    otp: string,
    otp_job_id: number,
    Device: {
      id: string,
      name: string,
      platform: string,
      version: string,
      build: string
    }
}