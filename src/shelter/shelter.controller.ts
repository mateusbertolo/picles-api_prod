import { Body, Controller, Get, Inject, Put } from '@nestjs/common';
import getShelterDetailsUseCaseOutput from './usecases/dtos/get.shelter.details.usecase.output';
import { IUseCase } from 'src/domain/iusecase.interface';
import ShelterTokens from './shelter.tokens';
import UpdateShelterControlerInput from './dtos/update.shelter.controller.input';
import UpdateShelterDetailsUseCaseInput from './usecases/dtos/update.shelter.details.usecase.input';

@Controller('shelter')
export class ShelterController {
  // Injection de tokens
  @Inject(ShelterTokens.getShelterDetailsUseCase)
  private readonly GetShelterDetailsUseCase: IUseCase<
    null,
    getShelterDetailsUseCaseOutput
  >;
  @Inject(ShelterTokens.updateShelterDetailsUseCase)
  private readonly updatetShelterDetailsUseCase: IUseCase<
    UpdateShelterDetailsUseCaseInput,
    UpdateShelterDetailsUseCaseInput
  >;

  @Get()
  async getShelterDetails(): Promise<getShelterDetailsUseCaseOutput> {
    return await this.GetShelterDetailsUseCase.run(null);
  }

  @Put()
  async updateShelterDetails(
    @Body() input: UpdateShelterControlerInput,
  ): Promise<UpdateShelterDetailsUseCaseInput> {
    const useCaseInput = new UpdateShelterDetailsUseCaseInput({ ...input });
    console.log(useCaseInput);
    return await this.updatetShelterDetailsUseCase.run(useCaseInput);
  }
}
