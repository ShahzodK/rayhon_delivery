export interface IPopularMeal {
    id: number,
    name: string,
    items: {
        id: string,
        name: string,
        description: string,
        price: number,
        image: string,
        active: boolean,
        start: string,
        finish: string,
        has_discount: boolean,
        preparation_time: number,
        is_favourite: boolean,
        discount: {
            type: string,
            value: number
        },
        variants: {
            id: string,
            name: string,
            price: number,
            active: boolean,
            preparation_time: number
        }
    }[],
    items_count: number
}