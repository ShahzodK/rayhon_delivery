export interface IPayment{
    id: string,
    name: string,
    image: string,
    accounts: {
        id: string,
        name: string,
        is_default: boolean
    }
}