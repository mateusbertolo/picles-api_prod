import { IUseCase } from 'src/domain/iusecase.interface';
import UpdatePetByIdUsecaseInput from './dtos/update.pet.by.id.usecase.input';
import UpdatePetByIdUsecaseOutput from './dtos/update.pet.by.id.usecase.output';
import { Inject, Injectable } from '@nestjs/common';
import IPetRepository from '../pet.repository';
import { Pet } from '../schemas/pet.schema';
import PetNotFoundError from 'src/domain/errors/pet.not.found.error';
import AppTokens from 'src/app.tokens';
import IFileService from 'src/interfaces/file.service.interface';
import PetTokens from '../pet.token';

@Injectable()
export default class UpdatePetByIdUsecase
  implements IUseCase<UpdatePetByIdUsecaseInput, UpdatePetByIdUsecaseOutput>
{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,
    @Inject(AppTokens.fileService)
    private readonly fileService: IFileService,
  ) {}
  async run(
    input: UpdatePetByIdUsecaseInput,
  ): Promise<UpdatePetByIdUsecaseOutput> {
    let pet = await this.getPetById(input.id);

    if (!pet) {
      throw new PetNotFoundError();
    }
    await this.petRepository.updateById({
      ...input,
      _id: input.id,
    });
    pet = await this.getPetById(input.id);
    const petPhoto = !!pet.photo
      ? (await this.fileService.readFile(pet.photo)).toString('base64')
      : null;

    return new UpdatePetByIdUsecaseOutput({
      id: pet._id,
      name: pet.name,
      type: pet.type,
      size: pet.size,
      gender: pet.gender,
      bio: pet.bio,
      photo: petPhoto,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt,
    });
  }
  private async getPetById(id: string): Promise<Pet> {
    try {
      return await this.petRepository.getById(id);
    } catch (error) {
      return null;
    }
  }
}
