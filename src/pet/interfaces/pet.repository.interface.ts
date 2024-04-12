import { Pet } from '../schemas/pet.schema';

export default interface IPetRepository {
  [x: string]: any;
  create(data: Partial<Pet>): Promise<Pet>;
  getById(id: string): Promise<Pet>;
  deleteById(id: string): Promise<void>;
  updateById(data: Partial<Pet>): Promise<void>;
}
