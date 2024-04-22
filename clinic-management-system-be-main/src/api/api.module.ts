import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { EncounterModule } from './encounter/encounter.module';

@Module({
  imports: [UserModule, PatientModule, AppointmentModule, EncounterModule],
})
export class ApiModule {}
