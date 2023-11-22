export interface IChosenOrder {
    id: number,
    actions: string[],
    delivery_time: string,
    delivery_distance: number,
    created_date: string,
    created_time: string,
    items_count: number,
    status: {
      id: string,
      name: string
    },
    items: {
      variant_id: string,
      price: number,
      item_id: string,
      name: string,
      active: boolean,
      image: string,
      quantity: string,
      note: string
    }[],
    address: {
      id: string,
      name: string,
      address: string
    },
    payment: {
      id: string,
      name: string,
      status: string
    },
    courier: {
      id: string,
      name: string,
      phone: string,
      image: string,
      latitude: number,
      longitude: number,
      rating: number,
      joined_date: string,
      vehicle_name: string,
      plate_number: string
    },
    subtotal: {
      price: number,
      discount: number
    },
    delivery: {
      price: number,
      discount: number
    },
    total: {
      price: number,
      discount: number
    }
}