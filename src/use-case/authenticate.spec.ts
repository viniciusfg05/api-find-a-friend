import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { it, describe, beforeEach, expect } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { RegisterOrganizationsUserCase } from './register'
import { InvalidCredencialError } from './errors/Invalid-credencial-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateUseCase

let sutOrg: RegisterOrganizationsUserCase

describe('Authentication Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationsRepository)

    sutOrg = new RegisterOrganizationsUserCase(organizationsRepository)
  })

  it.only('should be able to authenticate', async () => {
    await sutOrg.execute({
      address: 'QS 12 CJ 9B',
      cep: '71219585',
      email: 'vinicius.fg06@gmail.com',
      uf: 'DF',
      city: 'Brasilia',
      name: 'Vinícius',
      password: '150517Vl',
      phone: '61996804406',
    })

    const { organization } = await sut.execute({
      email: 'vinicius.fg06@gmail.com',
      password: '150517Vl',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong password', async () => {
    await expect(() =>
      sut.execute({
        email: 'vinicius.fg05@gmail.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredencialError)
  })
})
