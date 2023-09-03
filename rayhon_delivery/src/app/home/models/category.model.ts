export interface ICategory {
    id: number,
    name: string,
    items: {
        id: string,
        name: string,
        image: string
    }[],
    items_count: number,
    wrap_at: number
}