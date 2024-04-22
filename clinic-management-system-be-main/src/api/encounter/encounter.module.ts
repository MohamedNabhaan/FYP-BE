import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientModule } from '../patient/patient.module';
import { EncounterController } from './encounter.controller';
import { Encounter } from './encounter.entity';
import { EncounterService } from './encounter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Encounter]), HttpModule, PatientModule],
  controllers: [EncounterController],
  providers: [EncounterService],
})
export class EncounterModule {}
