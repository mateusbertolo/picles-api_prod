import { Shelter } from "../schemas/Shelter.schema";

export default interface IShelterRepository{
    get():Promise<Shelter>
    update(data: Partial<Shelter>): Promise<void>
}