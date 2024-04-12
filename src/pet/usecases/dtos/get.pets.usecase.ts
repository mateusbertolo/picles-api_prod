import { IUseCase } from "src/domain/iusecase.interface";
import GetPetsUseCaseInput from "./get.pets.usecase.input";
import GetPetsUseCaseOutput from "./get.pets.usecase.output";
import { Inject, Injectable } from "@nestjs/common";
import PetTokens from "src/pet/pet.token";
import IPetRepository from "src/pet/pet.repository";
import petRepository from "src/pet/pet.repository";
@Injectable()
export default class GetPetUseCase implements IUseCase<GetPetsUseCaseInput, GetPetsUseCaseOutput> {
    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository,

        @Inject(PetTokens.fileService)
        private readonly fileService: IFileservice,
    ) {}

    async run(input: GetPetsUseCaseInput): Promise<GetPetsUseCaseOutput> {
        throw new Error("Method not implemented.");
    }
}
