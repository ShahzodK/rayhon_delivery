export interface IVerifyPhoneRequest {
    phone: string,
    otp: string,
    otp_job_id: string,
    Device: {
      id: string,
      name: string,
      platform: string,
      version: string,
      build: string
    }
}