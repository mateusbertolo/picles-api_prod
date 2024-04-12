import { IUseCase } from 'src/domain/iusecase.interface';
import DeletePetByIdUseCaseInput from './dtos/delete.pet.by.id.usecase.input';
import DeletePetByIdUseCaseOutput from './dtos/delete.pet.by.id.usecase.output';
import { Pet } from '../schemas/pet.schema';
import { Inject, Injectable } from '@nestjs/common';
import PetNotFoundError from 'src/domain/errors/pet.not.found.error';
import PetTokens from '../pet.tokens';
import IPetRepository from '../pet.repository';
@Injectable()
export default class DeletePetByIdUseCase
  implements IUseCase<DeletePetByIdUseCaseInput, DeletePetByIdUseCaseOutput>
{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,
  ) {}

  async run(
    input: DeletePetByIdUseCaseInput,
  ): Promise<DeletePetByIdUseCaseOutput> {
    const pet = await this.findPetById(input.id);

    if (!pet) {
      throw new PetNotFoundError();
    }

    await this.petRepository.deleteById(input.id);

    return new DeletePetByIdUseCaseOutput();
  }

  private async findPetById(id: string): Promise<Pet> {
    try {
      return await this.petRepository.getById(id);
    } catch (error) {
      return null;
    }
  }
}
