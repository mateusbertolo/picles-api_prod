import { IUseCase } from 'src/domain/interfaces/usecase/IUsecase.interface';
import CreatePetUseCaseOutput from './dtos/create.pet.usecase.output';
import { Inject, Injectable } from '@nestjs/common';
import UpdatePetByIdUseCaseInput from './dtos/update.pet.by.id.usecase.input';
import UpdatePetByIdUseCaseOutput from './dtos/update.pet.usecase.output';
import PetNotFoundError from 'src/domain/errors/pet.not.found.error';
import { Pet } from '../schemas/pet.schema';
import PetTokens from '../pet.token';
import IPetRepository from '../interfaces/pet.repository.interface';

@Injectable()
export default class UpdatePetByIdUseCase
  implements IUseCase<UpdatePetByIdUseCaseInput, UpdatePetByIdUseCaseOutput>
{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,
  ) {}

  async run(
    input: UpdatePetByIdUseCaseInput,
  ): Promise<UpdatePetByIdUseCaseOutput> {
    let pet = await this.findPetById(input.id);

    if (pet == null) {
      throw new PetNotFoundError();
    }

    await this.petRepository.update({
      ...input,
      _id: input.id,
    });

    pet = await this.findPetById(input.id);

    return new CreatePetUseCaseOutput({
      id: pet._id,
      name: pet.name,
      type: pet.type,
      size: pet.size,
      gender: pet.gender,
      bio: pet.bio,
      photo: pet.photo,
      createdAt: pet.createdAt,
      updatedAt: pet.updateAt,
    });
  }

  private async findPetById(id: string): Promise<Pet> {
    try {
      return await this.petRepository.getById(id);
    } catch {
      return null;
    }
  }
}
