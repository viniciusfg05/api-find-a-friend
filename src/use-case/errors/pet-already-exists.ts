export class PetAlreadyExists extends Error {
  constructor() {
    super('E-mail already exists')
  }
}
