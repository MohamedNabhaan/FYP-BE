import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Encounter } from './encounter.entity';
import { Repository } from 'typeorm';
import { CreateUpdateEncounterDto } from './encounter.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PatientService } from '../patient/patient.service';
import { Readable } from 'stream';
import * as FormData from 'form-data';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class EncounterService {
  @InjectRepository(Encounter)
  private readonly repository: Repository<Encounter>;
  @Inject(ConfigService)
  private readonly config: ConfigService;
  @Inject(PatientService)
  private readonly patientService: PatientService;

  constructor(private readonly httpService: HttpService) {}

  public async create(
    body: CreateUpdateEncounterDto,
  ): Promise<Encounter | never> {
    const { patientId } = body;
    const patient: any = await this.patientService.findById(patientId);
    const encounter = this.repository.create({ ...body, patient });

    return this.repository.save(encounter);
  }

  public async findById(id: string): Promise<Encounter | never> {
    return this.repository.findOne({
      where: { id: id },
      relations: ['patient'],
    });
  }

  public async findAll(): Promise<Encounter[] | never> {
    return this.repository.find({
      relations: ['patient'],
    });
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async update(
    id: string,
    payload: CreateUpdateEncounterDto,
  ): Promise<Encounter> {
    const encounter: Encounter = await this.repository.findOne({
      where: { id: id },
    });
    const newPatient: any = await this.patientService.findById(
      payload.patientId,
    );

    encounter.diagnosis = payload.diagnosis;
    encounter.patient = newPatient;
    encounter.serviceDate = payload.serviceDate;
    encounter.nextAppointment = payload.nextAppointment;
    encounter.doctor = payload.doctor;

    return this.repository.save(encounter);
  }

  public async patientDiagnosisRecognition(
    file: Express.Multer.File,
  ): Promise<any> {
    const readstream = Readable.from(file.buffer);
    // console.log(readstream);
    const form = new FormData();
    form.append('file', file.buffer, file.originalname);
    //const postUrl = this.config.get('HTR_END_POINT');
    const postUrl =
      'https://southeastasia.api.cognitive.microsoft.com/formrecognizer/documentModels/greaterPDModelNeural:analyze?api-version=2022-01-30-preview';
    const config = {
      headers: {
        'Ocp-Apim-Subscription-Key': this.config.get('HTR_SECRET_KEY'),
        'Content-Type': 'image/jpeg',
      },
    };

    // 'Content-Type': 'image/jpeg',

    return await lastValueFrom(
      this.httpService
        .post(postUrl, form, config)
        .pipe(map((response) => response.headers['operation-location'])),
    );
  }

  public async getPatientDiagnosisRecognitionResult(url: string) {
    const getConfig = {
      headers: {
        'Ocp-Apim-Subscription-Key': this.config.get('HTR_SECRET_KEY'),
      },
    };
    return await lastValueFrom(
      this.httpService
        .get(url, getConfig)
        .pipe(map((response) => response.data)),
    );
  }
}
