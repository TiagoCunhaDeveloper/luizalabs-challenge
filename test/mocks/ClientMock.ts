import { ClientModel } from "../../src/domain/models/Client";

const clientMock = (): ClientModel => ({
  id: 'any_id',
  name: 'Name',
  email: 'email@example.com',
  password: 'c1297762d0a5e0e0c5b7f3399221f84b4f9586eddbd89401d2cc569375efd32916fcb3d0c6a9df0802567e7ad71dc59111ce735ecbd1f2f6fa6cc0d27b288c88'
} as unknown as ClientModel)

export { clientMock }