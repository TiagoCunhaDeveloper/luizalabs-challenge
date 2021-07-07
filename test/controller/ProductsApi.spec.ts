import request from "supertest"
import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"

import { AppModule } from '../../src/AppModule'
import { clientMock, productMock } from "../mocks"
import { ProductRepository } from "../../src/repositories/ProductRepository"
import { JwtService } from "@nestjs/jwt"

const mockClient = () => ({
  ...clientMock()
})

const mockProducts = () => ([{
  ...productMock()
}])

const mockProduct = () => ({
  ...productMock()
})

describe('ProductsApi Controller', () => {
    let app: INestApplication
    let productsRepository: ProductRepository  
    let token: string 
    let jwtService: JwtService 

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        app = module.createNestApplication()
        await app.init()

        productsRepository = app.get<ProductRepository>(ProductRepository)
        jwtService = app.get<JwtService>(JwtService)

        token = await jwtService.signAsync({ user: mockClient() })

        jest.spyOn(productsRepository, 'getByPage').mockImplementation(async () => Promise.resolve(mockProducts()))
        jest.spyOn(productsRepository, 'getById').mockImplementation(async () => Promise.resolve(mockProduct()))
      })

    describe('/product', () => {
        test(`/GET Get products by page`, () => (
          request(app.getHttpServer())
              .get('/product?page=1')
              .auth(token, { type: 'bearer' })
              .expect(200)
        ))

        test(`/GET Get product`, () => (
          request(app.getHttpServer())
              .get('/product/any_id')
              .auth(token, { type: 'bearer' })
              .expect(200)
        ))
    })

    afterAll(async () => {
        await app.close()
    })
})
