import { IUseCase } from "src/domain/iusecase.interface";
import GetPetsUseCaseInput from "./get.pets.usecase.input";
import GetPetsUseCaseOutput from "./get.pets.usecase.output";
import { Inject, Injectable } from "@nestjs/common";
import PetTokens from "src/pet/pet.token";
import IPetRepository from "src/pet/pet.repository";
import petRepository from "src/pet/pet.repository";
import PetResponse from "src/pet/dtos/pet.response";
@Injectable()
export default class GetPetUseCase implements IUseCase<GetPetsUseCaseInput, GetPetsUseCaseOutput> {
    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository,

        @Inject(PetTokens.fileService)
        private readonly fileService: IFileservice,
    ) {}

    async run(input: GetPetsUseCaseInput): Promise<GetPetsUseCaseOutput>{
        const queryResponse = await this.petRepository.findDilter(input);

        const petResponseList:PetResponse[] = [];

        for (const correntpet of queryResponse.items){
            if(correntpet.photo){
                const photobased64 = await this.fileService.readFile(correntpet.photo);
                correntpet.photo = photobased64.toString('base64');
            }

            petResponseList.push(PetResponse.fromPet({correntpet}));
        }

        const totalPages = Math.ceil(queryResponse.total / input.itensPerPage);

        return new GetPetsUseCaseOutput({
            correntPage: input.page,
            totalPages
        })
    }

    async run(input: GetPetsUseCaseInput): Promise<GetPetsUseCaseOutput> {
        throw new Error("Method not implemented.");
    }
}
