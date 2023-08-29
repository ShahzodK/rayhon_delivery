export interface IAppState {
    auth: {
        phoneNum: string,
        otp_job_id: string
    },
    user: {
        id: string,
        phone: string,
        first_name: string,
        last_name: string,
        image: string,
        language: string
    },
    addresses: {
            id: string,
            name: string,
            address: string,
            latitude: number,
            longitude: number,
            is_default: boolean
        }[]
}