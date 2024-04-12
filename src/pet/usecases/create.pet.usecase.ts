import { IUseCase } from 'src/domain/iusecase.interface';
import CreatePetUseCaseOutput from './dtos/create.pet.usecase.output';
import CreatePetUsecaseInput from './dtos/create.pet.usecase.input';
import IPetRepository from 'src/pet/pet.repository';
import { Inject } from '@nestjs/common';
import PetTokens from 'src/pet/pet.tokens';

export default class CreatePetUseCase
  implements IUseCase<CreatePetUsecaseInput, CreatePetUseCaseOutput>
{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,
  ) {}

  async run(input: CreatePetUsecaseInput): Promise<CreatePetUseCaseOutput> {
    const newPet = await this.petRepository.create(input);
    return new CreatePetUseCaseOutput({
      id: newPet._id,
      name: newPet.name,
      type: newPet.type,
      size: newPet.size,
      gender: newPet.gender,
      bio: newPet.bio,
      photo: newPet.photo,
      createdAt: newPet.createdAt,
      updatedAt: newPet.updatedAt,
    });
  }
}
