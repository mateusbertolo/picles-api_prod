import { InjectionToken } from "@nestjs/common";

export default class PetTokens {
  static createPetUseCase = 'createPetUseCase';
  static petRepository = 'PetRepository';
  static updatePetByIdUseCase = 'updatePetByIdUseCase';
  static deletePetByIdUseCase = 'deletePetByIdUseCase';
  static updatePetPhotoByIdUseCase = 'updatePetPhotoByIdUseCase';
  static getPetByIdUseCase = 'getPetByIdUseCase';
  static getPetUseCase: InjectionToken;
}
