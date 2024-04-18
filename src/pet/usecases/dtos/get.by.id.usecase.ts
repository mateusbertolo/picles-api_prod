import { IUseCase } from "src/domain/iusecase.interface";
import GetPetByIdUseCaseInput from "./get.pet.by.id.usecase.input";
import GetPetByIdUseCaseOutput from "./get.pet.by.id.usecase.output";

export default class GetPetByIdUseCase implements IUseCase<GetPetByIdUseCaseInput, GetPetByIdUseCaseOutput>{
    run(input: GetPetByIdUseCaseInput): Promise<GetPetByIdUseCaseOutput> {
        throw new Error("Method not implemented.");
    }
    
}