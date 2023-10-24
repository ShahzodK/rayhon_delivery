export interface ICart {
    items_count: number,
    delivery_time: string,
    delivery_distance: number,
    delivery_date_display: string,
    delivery_time_display: string,
    promo_code: string
    subtotal: {
        price: number,
        discount: number
    }
    delivery: {
        price: number,
        discount: number
    },
    total: {
        price: number,
        discount: number
    }
    items: {
        variant_id: string,
        price: number,
        item_id: string,
        name: string,
        active: boolean,
        image: string,
        quantity: number,
        note: string
    }[],
    vendor: {
        id: string,
        name: string,
        phone: string,
        active: boolean,
        pre_order: boolean,
        start: string,
        finish: string
    },
    address: {
      id: string,
      name: string,
      address: string
    }
}