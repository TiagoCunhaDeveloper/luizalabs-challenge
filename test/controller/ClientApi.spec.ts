import request from "supertest"
import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"

import { AppModule } from '../../src/AppModule'
import { AuthService } from "../../src/services/AuthService"
import { ClientRepository } from "../../src/repositories/ClientRepository"
import { JwtService } from "@nestjs/jwt"
import { clientMock, updateClientMock } from "../mocks"

const mockClient = () => ({
  ...clientMock()
})

const mockUpdateClient = () => ({
    ...updateClientMock()
  })

const mockSave = () => ({
    ...{
      name: 'any_name',
      email: 'email@example.com',
      password: 'any_password'
    }
  })

describe('ClientApi Controller', () => {
    let app: INestApplication
    let authService: AuthService
    let clientRepository: ClientRepository
    let token: string
    let jwtService: JwtService

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        app = module.createNestApplication()
        await app.init()

        authService = app.get<AuthService>(AuthService)
        clientRepository = app.get<ClientRepository>(ClientRepository)
        jwtService = app.get<JwtService>(JwtService)

        token = await jwtService.signAsync({ user: mockClient() })

        jest.spyOn(clientRepository, 'getByEmail').mockImplementation(async () => Promise.resolve(null))
        jest.spyOn(clientRepository, 'getById').mockImplementation(async () => Promise.resolve(mockClient()))
        jest.spyOn(clientRepository, 'update').mockImplementation(async () => Promise.resolve())
        jest.spyOn(clientRepository, 'create').mockImplementation(async () => Promise.resolve())
        jest.spyOn(clientRepository, 'deleteById').mockImplementation(async () => Promise.resolve())
        jest.spyOn(authService, 'hashPassword').mockImplementation(async () => Promise.resolve(''))
    })

    describe('/client', () => {
        test(`/POST Save client`, () => (
            request(app.getHttpServer())
                .post('/client')
                .send(mockSave())
                .expect(201)
        ))

        test(`/GET Get all clients`, () => (
          request(app.getHttpServer())
              .get('/client')
              .auth(token, { type: 'bearer' })
              .expect(200)
        ))

        test(`/GET Get client`, () => (
          request(app.getHttpServer())
              .get('/client/email@example.com')
              .auth(token, { type: 'bearer' })
              .expect(200)
        ))

        test(`/PUT Update client`, () => (
            request(app.getHttpServer())
                .put('/client')
                .auth(token, { type: 'bearer' })
                .send(mockUpdateClient())
                .expect(200)
        ))
        
        test(`/Delete delete client`, () => (
            request(app.getHttpServer())
                .delete('/client/any_id')
                .auth(token, { type: 'bearer' })
                .expect(200)
        ))
    })

    afterAll(async () => {
        await app.close()
    })
})
