import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';
import { HttpService } from '@nestjs/axios';
import { Readable } from 'stream';
import * as FormData from 'form-data';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PatientService {
  @InjectRepository(Patient)
  private readonly repository: Repository<Patient>;
  @Inject(ConfigService)
  private readonly config: ConfigService;

  constructor(private readonly httpService: HttpService) {}

  public async create(body: CreatePatientDto): Promise<Patient | never> {
    return this.repository.save(body);
  }

  public async findById(id: string): Promise<Patient | never> {
    return this.repository.findOne({
      where: { id: id },
      relations: ['appointments', 'encounters'],
    });
  }

  public async findAll(): Promise<Patient[] | never> {
    return this.repository.find();
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async update(id: string, payload: UpdatePatientDto): Promise<Patient> {
    const patient: Patient = await this.repository.findOne({
      where: { id: id },
    });

    Object.keys(payload).map((key) => {
      patient[key] = payload[key];
    });

    return this.repository.save(patient);
  }

  public async patientRegistration(file: Express.Multer.File): Promise<any> {
    const readstream = Readable.from(file.buffer);
    // console.log(readstream);
    const form = new FormData();
    form.append('file', file.buffer, file.originalname);
    //const postUrl = this.config.get('HTR_END_POINT');
    const postUrl =
      'https://southeastasia.api.cognitive.microsoft.com/formrecognizer/documentModels/greaterPRModelNeural:analyze?api-version=2022-01-30-preview';
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

  public async getPatientRegistrationResult(url: string) {
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
