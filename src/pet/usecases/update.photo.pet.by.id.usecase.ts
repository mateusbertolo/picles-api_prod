import { IUseCase } from 'src/domain/iusecase.interface';
import UpdatePetPhotoByIdUseCaseInput from './dtos/update.pet.photo.by.id.usecase.input';
import { Inject, Injectable } from '@nestjs/common';
import UpdatePetPhotoByIdUseCaseOutput from './dtos/update.pet.photo.by.id.usecase.output';
import IPetRepository from '../pet.repository';

import { Pet } from '../schemas/pet.schema';
import PetNotFoundError from 'src/domain/errors/pet.not.found.error';
import AppTokens from 'src/app.tokens';
import IFileService from 'src/interfaces/file.service.interface';
import PetTokens from '../pet.token';

@Injectable()
export default class UpdatePetPhotoByIdUseCase
  implements
    IUseCase<UpdatePetPhotoByIdUseCaseInput, UpdatePetPhotoByIdUseCaseOutput>
{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,

    @Inject(AppTokens.fileService)
    private readonly fileService: IFileService,
  ) {}

  async run(
    input: UpdatePetPhotoByIdUseCaseInput,
  ): Promise<UpdatePetPhotoByIdUseCaseOutput> {
    const pet = await this.getPetById(input.id);
    if (pet === null) {
      throw new PetNotFoundError();
    }
    await this.petRepository.updateById({
      _id: input.id,
      photo: input.photoPath,
    });
    const photo = await this.fileService.readFile(input.photoPath);
    return new UpdatePetPhotoByIdUseCaseOutput({
      id: pet._id,
      name: pet.name,
      type: pet.type,
      size: pet.size,
      gender: pet.gender,
      bio: pet.bio,
      photo: photo.toString('base64'),
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
