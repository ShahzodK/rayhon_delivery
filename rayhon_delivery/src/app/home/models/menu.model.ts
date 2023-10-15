export interface IMenu {
    category_items_count: number,
    categories: {
        id: string,
        name: string
    }[],
    category_items: {
        id: string,
        name: string,
        items_count: number
        items: {
            id: string,
            name: string,
            description: string,
            price: number,
            image: string,
            active: boolean,
            has_discount: boolean,
            preparation_time: number,
            start: number,
            finish: number,
            discount: {
                type: string,
                value: number
            },
            is_favourite: boolean
        }[]
    }[],
}