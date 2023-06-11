export class OrganizationAlreadyExists extends Error {
  constructor() {
    super('E-mail the organization already exists')
  }
}
