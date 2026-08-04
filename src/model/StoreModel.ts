import { type ProductModel } from "./ProductModel"
export interface StoreModel {
  id: string
  name: string
  dateCreated: string
  facebook: string
  description: string
  openTime: string
  type: string
  closeTime: string
  isFavorite: boolean
  location: string
  totalBought: number
  products: ProductModel[];
  color: string
}