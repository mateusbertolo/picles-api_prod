import { IUseCase } from 'src/domain/iusecase.interface';
import getShelterDetailsUseCaseOutput from './dtos/get.shelter.details.usecase.output';
import { Inject } from '@nestjs/common';

import ShelterTokens from '../shelter.tokens';
import ISShelterRepository from '../interfaces/shelter.repository.interface';
export default class GetShelterDetailsUseCase
  implements IUseCase<null, getShelterDetailsUseCaseOutput>
{
  constructor(
    @Inject(ShelterTokens.shelterRepository)
    private readonly shelterRepository: ISShelterRepository,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(input: null): Promise<getShelterDetailsUseCaseOutput> {
    const shelter = await this.shelterRepository.get();
    return new getShelterDetailsUseCaseOutput({
      shelterName: shelter.name,
      shelterEmail: shelter.email,
      shelterPhone: shelter.whatsApp,
      shelterWhatsapp: shelter.phone,
      createAt: shelter.createdAt,
      updateAt: shelter.updatedAt,
    });
  }
}
