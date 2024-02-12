export interface IFaq {
    id: string,
    name: string,
    items: {
        id: string,
        question: string,
        answer: string
    }[]
}