export class NotPetIdProvidedError extends Error {
  constructor() {
    super('Not pet_id provided')
  }
}
