import { RequirementsRepository } from '@/repositories/requirements-repository'

interface CreatePetUseCaseRequest {
  requirement: string[]
  pet_id: string
}

export class RequirementUseCase {
  constructor(private requirementsRepository: RequirementsRepository) {}

  async execute({ pet_id, requirement }: CreatePetUseCaseRequest) {
    const requirements = []

    for (const data of requirement) {
      const requirementsCreate = await this.requirementsRepository.create({
        requirement: data,
        pet_id,
      })

      requirements.push(requirementsCreate)
    }

    return requirements
  }
}
