import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import * as request from 'supertest';


describe('PlayerController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Logovanje
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/signInPlayer')
      .send({
        email: 'dusan.pavlovic016v2@gmail.com',
        password: '123',
      });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.access_token).toBeDefined(); // Proveri da li token postoji
    jwtToken = loginResponse.body.access_token;
  });

  it('/player/me (GET) - should return player data', async () => {
    const response = await request(app.getHttpServer())
      .get('/player/me')
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe('dusan.pavlovic016v2@gmail.com');
  });

  it('/player/joinTeam (PUT) - should return teamId', async () => {
    const teamId = 1;

    const response = await request(app.getHttpServer())
      .put('/player/joinTeam')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ teamId });

    expect(response.status).toBe(200);
  });

  it('/player/playerTeam (GET) - should return teamId or error', async () => {
    const response = await request(app.getHttpServer())
      .get('/player/playerTeam')
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});