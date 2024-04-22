/// <reference types="@types/jest" />;
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppointmentModule } from './../src/api/appointment/appointment.module';
import { AppModule } from './../src/app.module';

describe('Appointment Module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AppointmentModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ Appointments (GET)', async () => {
    const loginData = {
      email: 'user1@gmail.com',
      password: 'P@ssword123',
    };
    //Login to get JWT token for authentication purpose
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData);

    const response = await request(app.getHttpServer())
      .get('/appointment')
      .set('Authorization', 'Bearer ' + loginResponse.body.token);
    // console.log(response.body);
    expect(response.status).toEqual(200);
  });

  it('/ Single Appointment (GET)', async () => {
    const id = '485ed4e1-aa42-40a7-8bd5-32f5d9603987';
    const loginData = {
      email: 'user1@gmail.com',
      password: 'P@ssword123',
    };
    //Login to get JWT token for authentication purpose
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData);

    const response = await request(app.getHttpServer())
      .get(`/appointment/${id}`)
      .set('Authorization', 'Bearer ' + loginResponse.body.token);
    // console.log(response.body);
    expect(response.status).toEqual(200);
  });

  it('/ Update Appointment (PUT)', async () => {
    const id = '485ed4e1-aa42-40a7-8bd5-32f5d9603987';
    const loginData = {
      email: 'user1@gmail.com',
      password: 'P@ssword123',
    };
    //Login to get JWT token for authentication purpose
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData);

    const response = await request(app.getHttpServer())
      .put(`/appointment/update/${id}`)
      .send({
        title: 'Event Demo1',
        patientId: '780d2450-cbfe-43e0-acc8-2c5cc15be766',
        start: '2022-10-20T05:35:31.960Z',
        end: '2022-10-23T05:35:31.960Z',
      })
      .set('Authorization', 'Bearer ' + loginResponse.body.token);
    expect(response.status).toEqual(200);
  });

  it('/ CREATE DELETE APPOINTMENT (POST, DELETE)', async () => {
    const loginData = {
      email: 'user1@gmail.com',
      password: 'P@ssword123',
    };
    //Login to get JWT token for authentication purpose
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData);

    const createResponse = await request(app.getHttpServer())
      .post(`/appointment/create`)
      .send({
        title: 'EventTest',
        patientId: '780d2450-cbfe-43e0-acc8-2c5cc15be766',
        start: '2022-09-20T05:35:31.960Z',
        end: '2022-09-23T05:35:31.960Z',
      })
      .set('Authorization', 'Bearer ' + loginResponse.body.token);
    expect(createResponse.status).toEqual(201);

    const deleteResponse = await request(app.getHttpServer())
      .delete(`/appointment/${createResponse.body.id}`)
      .set('Authorization', 'Bearer ' + loginResponse.body.token);
    expect(deleteResponse.status).toEqual(200);
  });
});
