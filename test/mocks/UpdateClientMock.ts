import { UpdateClientDTO } from "../../src/dtos/UpdateClientDTO";

const updateClientMock = (): UpdateClientDTO => ({
  id: 'any_id',
  name: 'Name'
} as unknown as UpdateClientDTO)

export { updateClientMock }