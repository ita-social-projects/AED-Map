const supertest = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../../server');
const User = require('../../models/User');

const BASEURL = '/api/images';
const mockDatabaseName = 'mockImages';

const mockAdminEmail = 'admin@admin.com';
const mockAdminPassword = 'qwe123Q!';
const mockAdminPasswordHashed =
  '$2a$10$9kWs/nlfM7ZIxJq0tj8yquATo47d0OqDl1pv.3tRfRU8fvcWrBK0W';

const newDefibrillator = {
  title: 'Площа ринок',
  address: 'Площа ринок 4',
  location: {
    type: 'Point',
    coordinates: [24.031691, 49.841771]
  },
  actual_date: '2019-02-12',
  storage_place: 'Поверх 1, каб. Муніципальної Варти',
  accessibility: 'Цілодобово. Без вихідних',
  language: 'Російськомовний',
  informational_plates: 'Відсутні',
  phone: ['380322975994'],
  additional_information:
    'Перший кабінет праворуч на 1 поверсі'
};

let imageFilename, imageId, defibrillatorId;

const DBURL = `mongodb://localhost:27017/${mockDatabaseName}`;

const fs = require('fs');
const db = require('../../db');
const request = supertest(app);

describe('images routes', () => {
  beforeAll(async (done) => {
    await mongoose.connection.close();
    db.dbInit(DBURL);

    const admin = await User.findOne({
      email: mockAdminEmail
    });

    if (!admin) {
      const newAdmin = new User({
        email: mockAdminEmail,
        password: mockAdminPasswordHashed,
        role: 'Admin'
      });
      await newAdmin.save();
    }

    const res = await request
      .post('/api/auth/signin')
      .send({
        email: mockAdminEmail,
        password: mockAdminPassword
      });

    tokenAdmin = res.headers.authorization;

    const resDef = await request
      .post('/api/defibrillators')
      .set('Authorization', tokenAdmin)
      .send(newDefibrillator);

    defibrillatorId = resDef.body.defibrillator._id;

    done();
  });

  it('should return status 401 when not authorized for creating', async () => {
    const res = await request
      .post(`${BASEURL}/${defibrillatorId}`)
      .set('Content-Type', 'multipart/form-data')
      .expect(401);
  });

  it('should return status 201 when image created', async () => {
    const res = await request
      .post(`${BASEURL}/${defibrillatorId}`)
      .set('Authorization', tokenAdmin)
      .set('Content-Type', 'multipart/form-data')
      .attach(
        'images',
        fs.createReadStream(
          './routes/__test__/mock/mock-image.jpg'
        )
      )
      .expect((res) => {
        if (!Array.isArray(res.body.images))
          throw new Error("images isn't array");
      })
      .expect(201);

    expect(res.body.images).toBeTruthy();

    imageFilename = res.body.images[0].filename;
    imageId = res.body.images[0].id;
  });

  it('should return status 404 when image not found', async () => {
    const res = await request
      .get(`${BASEURL}/mock.jpg`)
      .expect(404);
  });

  it('should return status 200 when image shown', async () => {
    const res = await request
      .get(`${BASEURL}/${imageFilename}`)
      .expect('Transfer-encoding', 'chunked')
      .expect(200);
  });

  it('should return status 401 when not authorized for deleting', async () => {
    const res = await request
      .delete(`${BASEURL}/${defibrillatorId}/${imageId}`)
      .expect(401);
  });

  it('should return status 200 when image deleted', async () => {
    const res = await request
      .delete(`${BASEURL}/${defibrillatorId}/${imageId}`)
      .set('Authorization', tokenAdmin)
      .expect(200);
  });

  afterAll(async (done) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    done();
  });
});
