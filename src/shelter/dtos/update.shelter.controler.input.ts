import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length, length } from "class-validator"
export default class updateShelterControllerInput {
   @IsString()
   @IsNotEmpty()
   name:string
   @IsString()
   @Length(10,11)
   @IsNotEmpty()
   whatsapp: string
   @IsNotEmpty()
   @IsString()
   @IsNumberString()
   phone: string
   @IsNotEmpty()
   @IsString()
   @IsEmail()
   email: string
   
}