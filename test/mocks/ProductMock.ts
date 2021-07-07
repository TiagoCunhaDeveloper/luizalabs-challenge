import { ProductModel } from "../../src/domain/models/Product";

const productMock = (): ProductModel => ({
  title: 'any_title',
  image: 'any_image',
  brand: 'any_brand',
  price: 0,
  reviewScore: 5
} as unknown as ProductModel)

export { productMock }