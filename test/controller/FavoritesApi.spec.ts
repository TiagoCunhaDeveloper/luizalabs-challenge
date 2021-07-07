import request from "supertest"
import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"

import { AppModule } from '../../src/AppModule'
import { ClientRepository } from "../../src/repositories/ClientRepository"
import { JwtService } from "@nestjs/jwt"
import { clientMock, favoriteMock, favoriteProductsMock } from "../mocks"
import { FavoriteRepository } from "../../src/repositories/FavoriteRepository"
import { FavoriteServices } from "../../src/services/FavoriteServices"

const mockClient = () => ({
  ...clientMock()
})

const mockFavorite = () => ({
  ...favoriteMock()
})

const mockFavoriteProducts = () => ([{
  ...favoriteProductsMock()
}])

const mockSave = () => ({
  ...{
    idClient: 'any_id',
    products: [
      '60de1899aa82d34a986ad2bc',
      '60de1898aa82d34a986ad2b8',
      '60de1899aa82d34a986ad2ba'
    ]
  }
})

describe('FavoritesApi Controller', () => {
    let app: INestApplication
    let favoriteRepository: FavoriteRepository
    let clientRepository: ClientRepository
    let token: string
    let jwtService: JwtService
    let favoriteService: FavoriteServices

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        app = module.createNestApplication()
        await app.init()

        favoriteRepository = app.get<FavoriteRepository>(FavoriteRepository)
        clientRepository = app.get<ClientRepository>(ClientRepository)
        jwtService = app.get<JwtService>(JwtService)
        favoriteService = app.get<FavoriteServices>(FavoriteServices)

        token = await jwtService.signAsync({ user: mockClient() })

        jest.spyOn(clientRepository, 'getById').mockImplementation(async () => Promise.resolve(mockClient()))
        jest.spyOn(favoriteRepository, 'findByClientIdOrCreate').mockImplementation(async () => Promise.resolve(mockFavorite()))
        jest.spyOn(favoriteRepository, 'findByClientId').mockImplementation(async () => Promise.resolve(mockFavorite()))
        jest.spyOn(favoriteRepository, 'update').mockImplementation(async () => Promise.resolve())
        jest.spyOn(favoriteService, 'validateProducts').mockImplementation(async () => Promise.resolve(mockFavoriteProducts()))
    })

    describe('/favorite', () => {
        test(`/POST Save favorite`, () => (
            request(app.getHttpServer())
                .post('/favorite')
                .auth(token, { type: 'bearer' })
                .send(mockSave())
                .expect(201)
        ))

        test(`/GET Get favorite by client`, () => (
          request(app.getHttpServer())
              .get('/favorite')
              .auth(token, { type: 'bearer' })
              .expect(200)
        ))
    })

    afterAll(async () => {
        await app.close()
    })
})
