// import { Module } from '@nestjs/common';
// import { PetController } from './pet.controller';
// import PetTokens from './pet.tokens';
// import CreatePetUseCase from './usecases/dtos/create.pet.usecase';
// import { Pet, PetSchema } from './schemas/pet.schema';
// import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';

import CreatePetUseCase from './usecases/create.pet.usecase';
import PetRepository from './pet.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './schemas/pet.schema';
import GetPetByIdUseCase from './usecases/get.pet.by.id.usecase';
import UpdatePetByIdUseCase from './usecases/update.pet.by.id.usecase';
import DeletePetByIdUseCase from './usecases/delete.pet.by.id.usecase';
import FileService from 'src/file.service';
import AppTokens from 'src/app.tokens';
import UpdatePetPhotoByIdUseCase from './usecases/update.photo.pet.by.id.usecase';
import GetPetUseCase from './usecases/dtos/get.pets.usecase';
import PetTokens from './pet.token';

@Module({
  controllers: [PetController],

  imports: [MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }])],
  providers: [
    {
      provide: PetTokens.createPetUseCase,
      useClass: CreatePetUseCase,
    },
    {
      provide: PetTokens.petRepository,
      useClass: PetRepository,
    },
    {
      provide: PetTokens.getPetByIdUseCase,
      useClass: GetPetByIdUseCase,
    },
    {
      provide: PetTokens.updatePetByIdUseCase,
      useClass: UpdatePetByIdUseCase,
    },
    {
      provide: PetTokens.deletePetByIdUseCase,
      useClass: DeletePetByIdUseCase,
    },
    {
      provide: AppTokens.fileService,
      useClass: FileService,
    },
    {
      provide: PetTokens.updatePetPhotoByIdUseCase,
      useClass: UpdatePetPhotoByIdUseCase,
    },
    {
      provide: PetTokens.getPetUseCase,
      useClass: GetPetUseCase,
    },
  ],
})
export class PetModule {}
