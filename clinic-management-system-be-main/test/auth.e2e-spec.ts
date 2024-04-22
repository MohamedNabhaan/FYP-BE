/// <reference types="@types/jest" />;
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from './../src/api/user/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/api/user/user.entity';
import { AppModule, envFilePath } from './../src/app.module';
import { UserService } from './../src/api/user/user.service';
import { UserModule } from './../src/api/user/user.module';
import { TypeOrmConfigService } from '../src/shared/typeorm/typeorm.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from '../src/common/helper/env.helper';

// const envFilePath: string = getEnvPath(`src/common/envs`);
describe('Auth Module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ User Register (POST)', async () => {
    const data = {
      email: 'user-test@gmail.com',
      password: 'P@ssword123',
      name: 'UserTest',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(data);

    expect(response.status).toEqual(201);
  });

  it('/ User Login (POST)', async () => {
    const data = {
      email: 'user1@gmail.com',
      password: 'P@ssword123',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(data);

    expect(response.status).toEqual(201);
  });
});
