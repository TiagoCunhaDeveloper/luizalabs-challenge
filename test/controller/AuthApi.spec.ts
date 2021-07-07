import request from "supertest"
import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"

import { AppModule } from '../../src/AppModule'
import { ClientService } from "../../src/services/ClientService"
import { AuthService } from "../../src/services/AuthService"
import { clientMock } from "../mocks"

const mockClient = () => ({
  ...clientMock()
})

const mockLogin = () => ({
  ...{
      email: 'email@example.com',
      password: 'any_password'
  }
})

describe('AuthApi Controller', () => {
    let app: INestApplication
    let clientService: ClientService
    let authService: AuthService

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        app = module.createNestApplication()
        await app.init()

        clientService = app.get<ClientService>(ClientService)
        authService = app.get<AuthService>(AuthService)

        jest.spyOn(clientService, 'getByEmail').mockImplementation(async () => Promise.resolve(mockClient()))
        jest.spyOn(authService, 'comparePassword').mockImplementation(async () => Promise.resolve(true))
        jest.spyOn(authService, 'generateJwt').mockImplementation(async () => Promise.resolve(''))
    })

    describe('/auth', () => {
        test(`/POST`, () => (
            request(app.getHttpServer())
                .post('/auth')
                .send(mockLogin())
                .expect(201)
        ))
    })

    afterAll(async () => {
        await app.close()
    })
})
