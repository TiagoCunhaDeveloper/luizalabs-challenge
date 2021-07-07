import { FavoriteModel } from "../../src/domain/models/Favorite";
import { FavoriteProducts } from "../../src/domain/models/FavoriteProduct";

const favoriteMock = (): FavoriteModel => ({
  idClient: 'any_id',
  products: [
    '60de1899aa82d34a986ad2bc',
    '60de1898aa82d34a986ad2b8',
    '60de1899aa82d34a986ad2ba'
  ]
} as unknown as FavoriteModel)

const favoriteProductsMock = () : FavoriteProducts => ({
  id: 'any_id',
  name: 'any_name',
  imageUrl: 'any_url'
} as unknown as FavoriteProducts)

export { favoriteMock, favoriteProductsMock }