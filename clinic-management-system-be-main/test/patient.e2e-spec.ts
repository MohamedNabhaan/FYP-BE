/// <reference types="@types/jest" />;
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PatientModule } from './../src/api/patient/patient.module';
import { AppModule } from './../src/app.module';

describe('Patient Module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PatientModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ Patients (GET)', async () => {
    const loginData = {
      email: 'user1@gmail.com',
      password: 'P@ssword123',
    };
    //Login to get JWT token for authentication purpose
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData);

    const response = await request(app.getHttpServer())
      .get('/patient')
      .set('Authorization', 'Bearer ' + loginResponse.body.token);
    // console.log(response.body);
    expect(response.status).toEqual(200);
  });

  it('/ Patient Registration (POST)', async () => {
    const loginData = {
      email: 'user1@gmail.com',
      password: 'P@ssword123',
    };
    //Login to get JWT token for authentication purpose
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData);

    const createResponse = await request(app.getHttpServer())
      .post('/patient/registration')
      .set('Content-Type', 'multipart/form-data')
      .attach('file', './pr-img.jpeg')
      .set('Authorization', 'Bearer ' + loginResponse.body.token);
    expect(createResponse.status).toEqual(201);

    const deleteResponse = await request(app.getHttpServer())
      .delete(`/patient/${createResponse.body.id}`)
      .set('Authorization', 'Bearer ' + loginResponse.body.token);
    expect(deleteResponse.status).toEqual(200);
  });

  it('/ Single Patient (GET)', async () => {
    const id = '780d2450-cbfe-43e0-acc8-2c5cc15be766';
    const loginData = {
      email: 'user1@gmail.com',
      password: 'P@ssword123',
    };
    //Login to get JWT token for authentication purpose
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData);

    const response = await request(app.getHttpServer())
      .get(`/patient/${id}`)
      .set('Authorization', 'Bearer ' + loginResponse.body.token);
    expect(response.status).toEqual(200);
  });

  it('/ Update Patient (PUT)', async () => {
    const id = '780d2450-cbfe-43e0-acc8-2c5cc15be766';
    const loginData = {
      email: 'user1@gmail.com',
      password: 'P@ssword123',
    };
    //Login to get JWT token for authentication purpose
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData);

    const response = await request(app.getHttpServer())
      .put(`/patient/update/${id}`)
      .send({
        firstName: 'Jacks',
        lastName: 'Sparrow',
        gender: 'Male',
      })
      .set('Authorization', 'Bearer ' + loginResponse.body.token);
    expect(response.status).toEqual(200);
  });

  it('/ CREATE DELETE Patient (POST, DELETE)', async () => {
    const loginData = {
      email: 'user1@gmail.com',
      password: 'P@ssword123',
    };
    //Login to get JWT token for authentication purpose
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData);

    const createResponse = await request(app.getHttpServer())
      .post(`/patient/create`)
      .send({
        firstName: 'Nicholas',
        lastName: 'Tan',
        contactNumber: '0122234321',
        gender: 'Male',
        address: 'Monash Uni Malaysia, Bandar Sunway',
        city: 'Kuala Lumpur',
        postcode: '43200',
        dob: '2/1/2000',
        emergencyFirstName: 'Lily',
        emergencyLastName: 'Wang',
        emergencyContact: '0193321145',
        emergencyRelationship: 'Friend',
        medicalDetails: 'Allergic',
        allergicDetails: 'Skin',
      })
      .set('Authorization', 'Bearer ' + loginResponse.body.token);
    expect(createResponse.status).toEqual(201);

    const deleteResponse = await request(app.getHttpServer())
      .delete(`/patient/${createResponse.body.id}`)
      .set('Authorization', 'Bearer ' + loginResponse.body.token);
    expect(deleteResponse.status).toEqual(200);
  });
});
