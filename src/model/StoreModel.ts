import { type ProductModel } from "./ProductModel"
export interface StoreModel {
  name: string
  dateCreated: string
  fb?: string
  description?: string
  openTime: string
  type: string
  closeTime: string
  isFavorite?: boolean
  location?: string
  productQuantity: number
  Products?: ProductModel
}