export interface IOrder {
  id: string,
  status: {
    id: string,
    name: string
  },
  created_date: string,
  created_time: string,
  items_count: number,
  image_url: string,
  payment: {
    id: number,
    name: string,
    status: string
  },
  actions: string[],
  delivery_time: string,
  delivery_distance: number,
  total: number 
}