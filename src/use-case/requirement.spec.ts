import { it, describe, expect } from 'vitest'

import { RequirementUseCase } from './requirement'

import { InMemoryRequirementsRepository } from '@/repositories/in-memory/in-memory-requirements-repository'

let requirementsRepository: InMemoryRequirementsRepository
let requirementUseCase: RequirementUseCase

describe('Upload data Image Pets Use Case', () => {
  it('should be possible to requirement of a pet', async () => {
    requirementsRepository = new InMemoryRequirementsRepository()
    requirementUseCase = new RequirementUseCase(requirementsRepository)

    const requirement = await requirementUseCase.execute({
      pet_id: 'Pet id',
      requirement: ['Test 11', 'Test 12'],
    })

    expect(requirement).toHaveLength(2)
    expect(requirement).toEqual([
      expect.objectContaining({ requirement: 'Test 11' }),
      expect.objectContaining({ requirement: 'Test 12' }),
    ])
  })
})
