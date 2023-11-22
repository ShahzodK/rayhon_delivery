export interface IVerifyPhoneRequest {
    phone: string,
    otp: string,
    otp_job_id: string,
    device: {
      id: string,
      name: string,
      platform: string,
      version: string,
      build: string,
      notifications_muted: boolean
    }
}