export default class UpdateShelterDetailsUseCaseInput {
  name: string;
  whatsApp: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<UpdateShelterDetailsUseCaseInput>) {
    Object.assign(this, data);
  }
}
