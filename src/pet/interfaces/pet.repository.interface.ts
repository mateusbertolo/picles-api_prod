import FindByFilterAndTotal from '../dtos/find.by.filter.and.total';
import { Pet } from '../schemas/pet.schema';
import GetPetsUseCaseInput from '../usecases/dtos/get.pets.usecase.input';

export default interface IPetRepository {
  [x: string]: any;
  create(data: Partial<Pet>): Promise<Pet>;
  getById(id: string): Promise<Pet>;
  deleteById(id: string): Promise<void>;
  updateById(data: Partial<Pet>): Promise<void>;
  findByFilter(input: GetPetsUseCaseInput): Promise<FindByFilterAndTotal>
}
