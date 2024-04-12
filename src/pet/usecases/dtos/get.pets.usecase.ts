import { IUseCase } from "src/domain/iusecase.interface";
import GetPetsUseCaseInput from "./get.pets.usecase.input";
import GetPetsUseCaseOutput from "./get.pets.usecase.output";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class GetPetUseCase implements IUseCase<GetPetsUseCaseInput, GetPetsUseCaseOutput>{
    async run(input: GetPetsUseCaseInput): Promise<GetPetsUseCaseOutput>{
        throw new Error("Method noot implemented.");
        
    }
}