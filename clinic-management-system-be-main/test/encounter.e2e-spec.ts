/// <reference types="@types/jest" />;
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EncounterModule } from './../src/api/encounter/encounter.module';
import { AppModule } from './../src/app.module';

describe('Patient Module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, EncounterModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ Encounters (GET)', async () => {
    const loginData = {
      email: 'user1@gmail.com',
      password: 'P@ssword123',
    };
    //Login to get JWT token for authentication purpose
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData);

    const response = await request(app.getHttpServer())
      .get('/encounter')
      .set('Authorization', 'Bearer ' + loginResponse.body.token);
    expect(response.status).toEqual(200);
  });

  it('/ Encounter Form Recognition (POST)', async () => {
    const loginData = {
      email: 'user1@gmail.com',
      password: 'P@ssword123',
    };
    //Login to get JWT token for authentication purpose
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData);

    const response = await request(app.getHttpServer())
      .post('/encounter/recognition')
      .set('Content-Type', 'multipart/form-data')
      .attach('file', './pd-img.jpeg')
      .set('Authorization', 'Bearer ' + loginResponse.body.token);
    expect(response.status).toEqual(201);
  });

  it('/ Single Encounter (GET)', async () => {
    const id = 'be08b118-e5b0-42df-ab56-d8b1ced8c1ce';
    const loginData = {
      email: 'user1@gmail.com',
      password: 'P@ssword123',
    };
    //Login to get JWT token for authentication purpose
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData);

    const response = await request(app.getHttpServer())
      .get(`/encounter/${id}`)
      .set('Authorization', 'Bearer ' + loginResponse.body.token);
    expect(response.status).toEqual(200);
  });

  it('/ Update Encounter (PUT)', async () => {
    const id = 'be08b118-e5b0-42df-ab56-d8b1ced8c1ce';
    const loginData = {
      email: 'user1@gmail.com',
      password: 'P@ssword123',
    };
    //Login to get JWT token for authentication purpose
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData);

    const response = await request(app.getHttpServer())
      .put(`/encounter/update/${id}`)
      .send({
        diagnosis: 'Cough',
        additionalNotes: 'nothing additional',
        serviceDate: '20/9/2022',
        nextAppointment: '23/9/2022',
        patientId: '4ef5e81a-bc8d-4a05-8a35-94b885c8752a',
        doctor: 'Dr Chong',
      })
      .set('Authorization', 'Bearer ' + loginResponse.body.token);
    expect(response.status).toEqual(200);
  });

  it('/ CREATE DELETE Encounter (POST, DELETE)', async () => {
    const loginData = {
      email: 'user1@gmail.com',
      password: 'P@ssword123',
    };
    //Login to get JWT token for authentication purpose
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData);

    const createResponse = await request(app.getHttpServer())
      .post(`/encounter/create`)
      .send({
        diagnosis: 'Fever',
        additionalNotes: 'Give MC',
        serviceDate: '20/9/2022',
        nextAppointment: '23/9/2022',
        patientId: '4ef5e81a-bc8d-4a05-8a35-94b885c8752a',
        doctor: 'Dr Chong',
      })
      .set('Authorization', 'Bearer ' + loginResponse.body.token);
    expect(createResponse.status).toEqual(201);

    const deleteResponse = await request(app.getHttpServer())
      .delete(`/patient/${createResponse.body.id}`)
      .set('Authorization', 'Bearer ' + loginResponse.body.token);
    expect(deleteResponse.status).toEqual(200);
  });
});
