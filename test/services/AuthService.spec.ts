import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../src/AppModule'

import { AuthService } from '../../src/services/AuthService'
import { ClientService } from '../../src/services/ClientService'
import { clientMock } from '../mocks'

const mockClient = () => ({
  ...clientMock()
})

const mockLogin = () => ({
  ...{
      email: 'email@example.com',
      password: 'any_password'
  }
})

const mockClientWithoutPassword = () => ({
  id: 'any_id',
  name: 'Name'
})

describe('Auth Service', () => {
    let sut: AuthService
    let jwtService: JwtService
    let clientService: ClientService

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        sut = app.get<AuthService>(AuthService)
        jwtService = app.get<JwtService>(JwtService)
        clientService = app.get<ClientService>(ClientService)

        jest.spyOn(clientService, 'getByEmail').mockImplementation(async () => Promise.resolve(mockClient()))
        jest.spyOn(jwtService, 'signAsync').mockImplementation(async () => Promise.resolve(''))
        jest.spyOn(sut, 'hashPassword').mockImplementation(async () => Promise.resolve(''))         
    })

    describe('login()', () => {
        it('should call getByEmail with correct values', async () => {
          jest.spyOn(sut, "comparePassword").mockImplementationOnce(async () => true)
          const getSpy = jest.spyOn(clientService, 'getByEmail')
          await sut.login(mockLogin())
          expect(getSpy).toHaveBeenCalledWith('email@example.com')
        })

        it('should call comparePassword with correct values', async () => {     
          jest.spyOn(sut, "comparePassword").mockImplementationOnce(async () => true)     
          const getSpy = jest.spyOn(sut, 'comparePassword')
          await sut.login(mockLogin())
          expect(getSpy).toHaveBeenCalledWith('any_password', 'c1297762d0a5e0e0c5b7f3399221f84b4f9586eddbd89401d2cc569375efd32916fcb3d0c6a9df0802567e7ad71dc59111ce735ecbd1f2f6fa6cc0d27b288c88')
        })

        it('should call generateJwt with correct values', async () => {
          jest.spyOn(sut, "comparePassword").mockImplementationOnce(async () => true)
          const getSpy = jest.spyOn(jwtService, 'signAsync')
          await sut.login(mockLogin())
          expect(getSpy).toHaveBeenCalledWith({ user:mockClientWithoutPassword() })
        })

        it('should throw an unauthorized exception if not found client', async () => {
          jest.spyOn(clientService, "getByEmail").mockImplementationOnce(async () => null)
          jest.spyOn(sut, "comparePassword").mockImplementationOnce(async () => true)
          const promise = sut.login(mockLogin())
          await expect(promise).rejects.toBeInstanceOf(UnauthorizedException)
        })

        it('should throw an unauthorized exception if not found client', async () => {
          jest.spyOn(sut, "comparePassword").mockImplementationOnce(async () => false)
          const promise = sut.login(mockLogin())
          await expect(promise).rejects.toBeInstanceOf(UnauthorizedException)
        })

    })

})
