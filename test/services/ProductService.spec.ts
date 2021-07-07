import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../src/AppModule'
import { ProductRepository } from '../../src/repositories/ProductRepository'
import { ProductsService } from '../../src/services/ProductsService'
import { productMock } from '../mocks'

const mockSave = () => ({
  ...{
    title: 'any_title',
    image: 'any_image',
    brand: 'any_brand',
    price: 0,
    reviewScore: 0
  }
})

const mockProduct = () => ({
  ...productMock()
})

const mockProducts = () => ([{
  ...productMock()
}])

describe('Product Service', () => {
    let sut: ProductsService
    let productRepository: ProductRepository

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        sut = app.get<ProductsService>(ProductsService)
        productRepository = app.get<ProductRepository>(ProductRepository)    

        jest.spyOn(productRepository, 'create').mockImplementation(async () => Promise.resolve())
        jest.spyOn(productRepository, 'getByPage').mockImplementation(async () => Promise.resolve(mockProducts()))
        jest.spyOn(productRepository, 'deleteAll').mockImplementation(async () => Promise.resolve())     
        jest.spyOn(productRepository, 'getById').mockImplementation(async () =>  Promise.resolve(mockProduct()))   
    })

    describe('save()', () => {
      it('should call save', async () => {
        const getSpy = jest.spyOn(productRepository, 'create')
        await sut.save(mockSave())
        expect(getSpy).toHaveBeenCalledWith(mockSave())
      })
    })

    describe('getById()', () => {
      it('should call getById', async () => {        
        const getSpy = jest.spyOn(productRepository, 'getById')
        const result = await sut.getById('any_id')
        expect(getSpy).toHaveBeenCalledWith('any_id')
        expect(result).toEqual(mockProduct())
      })
    })

    describe('getByPage()', () => {
      it('should call getByPage', async () => {        
        const getSpy = jest.spyOn(productRepository, 'getByPage')
        const result = await sut.getByPage(1)
        expect(getSpy).toHaveBeenCalledWith(1,2)
        expect(result).toEqual(mockProducts())
      })
    })

    describe('deleteAll()', () => {
      it('should call deleteAll', async () => {        
        const getSpy = jest.spyOn(productRepository, 'deleteAll')
        await sut.deleteAll()
        expect(getSpy).toHaveBeenCalled()
      })
    })

})
