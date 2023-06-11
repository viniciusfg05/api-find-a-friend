import { expect, it, describe } from 'vitest'
import { RegisterOrganizationsUserCase } from './register'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { OrganizationAlreadyExists } from './errors/organization-already-exists'
// import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organizations-repository'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterOrganizationsUserCase

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterOrganizationsUserCase(organizationsRepository)

    const { organization } = await sut.execute({
      address: 'QS 12 CJ 9B',
      cep: '71219585',
      email: 'vinicius.fg05@gmail.com',
      uf: 'DF',
      city: 'Brasilia',
      name: 'Vinícius',
      password: '150517Vl',
      phone: '61996804406',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to register a duplicate org', async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterOrganizationsUserCase(organizationsRepository)

    await sut.execute({
      address: 'QS 12 CJ 9B',
      cep: '71219585',
      email: 'vinicius.fg05@gmail.com',
      uf: 'DF',
      city: 'Brasilia',
      name: 'Vinícius',
      password: '150517Vl',
      phone: '61996804406',
    })

    await expect(() =>
      sut.execute({
        address: 'QS 12 CJ 9B',
        cep: '71219585',
        email: 'vinicius.fg05@gmail.com',
        uf: 'DF',
        city: 'Brasilia',
        name: 'Vinícius',
        password: '150517Vl',
        phone: '61996804406',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExists)
  })
})
