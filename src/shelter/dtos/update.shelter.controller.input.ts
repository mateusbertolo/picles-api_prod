import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export default class UpdateShelterControlerInput {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(10, 11)
  whatsapp: string;
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  phone: string;
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  //teste
}
