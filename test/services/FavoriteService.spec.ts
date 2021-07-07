import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../src/AppModule'
import { FavoriteRepository } from '../../src/repositories/FavoriteRepository'
import { ClientService } from '../../src/services/ClientService'

import { FavoriteServices } from '../../src/services/FavoriteServices'
import { ProductsService } from '../../src/services/ProductsService'
import { clientMock, favoriteMock, favoriteProductsMock, productMock } from '../mocks'

const mockClient = () => ({
  ...clientMock()
})

const mockFavorite = () => ({
  ...favoriteMock()
})

const mockFavoriteProducts = () => ([{
  ...favoriteProductsMock()
}])

const mockProduct = () => ({
  ...productMock()
})

const mockSave = () => ({
  ...{
    idClient: '60e0bf0608107b33cdc58913',
    products: [
      '60de1899aa82d34a986ad2bc',
      '60de1898aa82d34a986ad2b8',
      '60de1899aa82d34a986ad2ba'
    ]
  }
})

describe('Favorite Service', () => {
    let sut: FavoriteServices
    let favoriteRepository: FavoriteRepository
    let clientService: ClientService
    let productsService: ProductsService

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        sut = app.get<FavoriteServices>(FavoriteServices)  
        favoriteRepository = app.get<FavoriteRepository>(FavoriteRepository)
        clientService = app.get<ClientService>(ClientService)
        productsService = app.get<ProductsService>(ProductsService)

        jest.spyOn(favoriteRepository, 'findByClientIdOrCreate').mockImplementation(async () => Promise.resolve(mockFavorite()))
        jest.spyOn(favoriteRepository, 'findByClientId').mockImplementation(async () => Promise.resolve(mockFavorite()))
        jest.spyOn(favoriteRepository, 'update').mockImplementation(async () => Promise.resolve())
        jest.spyOn(productsService, 'getById').mockImplementation(async () => Promise.resolve(mockProduct()))
    })

    describe('save()', () => {
      it('should call getByEmail with correct values', async () => {
        jest.spyOn(clientService, 'getById').mockImplementation(async () => mockClient())
        jest.spyOn(sut, 'validateProducts').mockImplementation(async () => mockFavoriteProducts())          
        const getSpy = jest.spyOn(clientService, 'getById')
        await sut.save(mockSave(), mockClient())
        expect(getSpy).toHaveBeenCalledWith('any_id')
      })

      it('should throw an notfound exception if not found client', async () => {
        jest.spyOn(clientService, 'getById').mockImplementation(async () => null)
        const promise = sut.save(mockSave(), mockClient())
        await expect(promise).rejects.toBeInstanceOf(NotFoundException)
      })
    })

    describe('getByIdClient()', () => {
      it('should call getByIdClient', async () => {        
        const getSpy = jest.spyOn(favoriteRepository, 'findByClientId')
        const result = await sut.getByIdClient('any_id')
        expect(getSpy).toHaveBeenCalledWith('any_id')
        expect(result).toEqual(mockFavorite())
      })
    })

    describe('validateProducts()', () => {
      it('should call getById with correct values', async () => {      
        const getSpy = jest.spyOn(productsService, 'getById').mockImplementation(async () => Promise.resolve(mockProduct()))
        await sut.validateProducts(mockSave(), mockFavorite())
        expect(getSpy).toHaveBeenCalledWith('60de1899aa82d34a986ad2bc')
      })
    })

})
