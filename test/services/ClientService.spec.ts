import { ConflictException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../src/AppModule'
import { ClientRepository } from '../../src/repositories/ClientRepository'
import { AuthService } from '../../src/services/AuthService'

import { ClientService } from '../../src/services/ClientService'
import { clientMock, updateClientMock } from '../mocks'

const mockClient = () => ({
  ...clientMock()
})

const mockUpdateClient = () => ({
  ...updateClientMock()
})

const mockClients = () => ([{
  ...clientMock()
}])

const mockSave = () => ({
  ...{
    name: 'any_name',
    email: 'email@example.com',
    password: 'any_password'
  }
})

describe('Client Service', () => {
    let sut: ClientService
    let clientRepository: ClientRepository
    let authService: AuthService

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        sut = app.get<ClientService>(ClientService)
        clientRepository = app.get<ClientRepository>(ClientRepository)
        authService = app.get<AuthService>(AuthService)

        jest.spyOn(clientRepository, 'create').mockImplementation(async () => Promise.resolve())
        jest.spyOn(clientRepository, 'update').mockImplementation(async () => Promise.resolve())
        jest.spyOn(clientRepository, 'deleteById').mockImplementation(async () => Promise.resolve())     
        jest.spyOn(clientRepository, 'getById').mockImplementation(async () =>  Promise.resolve(mockClient()))     
        jest.spyOn(clientRepository, 'getAll').mockImplementation(async () =>  Promise.resolve(mockClients()))     
        jest.spyOn(authService, 'hashPassword').mockImplementation(async () => Promise.resolve(''))     
    })

    describe('save()', () => {
      it('should call getByEmail with correct values', async () => {
        jest.spyOn(clientRepository, 'getByEmail').mockImplementation(async () => null)
        const getSpy = jest.spyOn(clientRepository, 'getByEmail')
        await sut.save(mockSave())
        expect(getSpy).toHaveBeenCalledWith('email@example.com')
      })

      it('should throw an conflit exception if found client', async () => {
        jest.spyOn(clientRepository, 'getByEmail').mockImplementation(async () => mockClient())
        const promise = sut.save(mockSave())
        await expect(promise).rejects.toBeInstanceOf(ConflictException)
      })
    })

    describe('getByEmail()', () => {
      it('should call getByEmail', async () => {
        jest.spyOn(clientRepository, 'getByEmail').mockImplementation(async () =>  Promise.resolve(mockClient()))
        const getSpy = jest.spyOn(clientRepository, 'getByEmail')
        const result = await sut.getByEmail('email@example.com')
        expect(getSpy).toHaveBeenCalledWith('email@example.com')
        expect(result).toEqual(mockClient())
      })
    })

    describe('getById()', () => {
      it('should call getById', async () => {        
        const getSpy = jest.spyOn(clientRepository, 'getById')
        const result = await sut.getById('any_id')
        expect(getSpy).toHaveBeenCalledWith('any_id')
        expect(result).toEqual(mockClient())
      })
    })

    describe('getAll()', () => {
      it('should call getAll', async () => {        
        const getSpy = jest.spyOn(clientRepository, 'getAll')
        const result = await sut.getAll()
        expect(getSpy).toHaveBeenCalledWith()
        expect(result).toEqual(mockClients())
      })
    })

    describe('update()', () => {
      it('should call update', async () => {        
        const getSpy = jest.spyOn(clientRepository, 'update')
        await sut.update(mockUpdateClient())
        expect(getSpy).toHaveBeenCalledWith(mockClient(),'any_id')
      })
    })

    describe('deleteById()', () => {
      it('should call deleteById', async () => {        
        const getSpy = jest.spyOn(clientRepository, 'deleteById')
        await sut.deleteById('any_id')
        expect(getSpy).toHaveBeenCalledWith('any_id')
      })
    })

})
