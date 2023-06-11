import { Prisma, Pet, Requirement } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { RequirementsRepository } from "../requirements-repository";

export class PrismaRequirementsRepository implements RequirementsRepository {
  async create(data: Prisma.RequirementUncheckedCreateInput): Promise<Requirement> {
    const requirement = await prisma.requirement.create({
      data
    })


    return requirement

  }
}
