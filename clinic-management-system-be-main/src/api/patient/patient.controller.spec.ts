import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { AppModule } from '../../app.module';
import { HttpModule } from '@nestjs/axios';
import { PatientModule } from './patient.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';

describe('PatientController', () => {
  let patientController: PatientController;
  let patientService: PatientService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PatientModule],
    }).compile();

    patientController = moduleRef.get<PatientController>(PatientController);
    patientService = moduleRef.get<PatientService>(PatientService);
  });
  describe('Get Patients', () => {
    it('should return an array of patients', async () => {
      const result: any = ['test'];
      jest.spyOn(patientService, 'findAll').mockImplementation(() => result);

      console.log(result);
      expect(await patientController.findAll()).toBe(result);
    });
  });
});
