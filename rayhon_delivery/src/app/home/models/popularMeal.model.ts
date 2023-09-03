export interface IPopularMeal {
    id: number,
    name: string,
    items: {
        id: string,
        name: string,
        description: string,
        price: number,
        image: string,
        start: string,
        finish: string,
        has_discount: boolean,
        discount: {
            type: string,
            value: number
        },
        type: string
    }[],
    items_count: number
}