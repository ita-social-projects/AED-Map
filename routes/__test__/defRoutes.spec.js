const supertest = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../../server');
const Defibrillator = require('../../models/Defibrillator');
const User = require('../../models/User');

const request = supertest(app);
const databaseName = 'jestTest';
const url = `mongodb://localhost:27017/${databaseName}`;

const mockAdminEmail = 'admin@admin.com';
const mockAdminPassword = 'qwe123Q!';
const mockAdminPasswordHashed =
  '$2a$10$9kWs/nlfM7ZIxJq0tj8yquATo47d0OqDl1pv.3tRfRU8fvcWrBK0W';
let tokenAdmin;

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

beforeAll(async (done) => {
  await mongoose.connection.close();
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

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

  const res = await request.post('/api/auth/signin').send({
    email: mockAdminEmail,
    password: mockAdminPassword
  });

  tokenAdmin = res.headers.authorization;

  done();
});

describe('get method', () => {
  it('get all defibrillators', async () => {
    const response = await request.get(
      '/api/defibrillators'
    );
    expect(response.status).toBe(200);
    expect(response.body.listDefs.length >= 0).toBe(true);
    expect(response.body.mapDefs.length >= 0).toBe(true);
  });
  it('get more information by id', async () => {
    const response = await request
      .post('/api/defibrillators')
      .set('Authorization', tokenAdmin)
      .send(newDefibrillator);
    const defId = response.body.defibrillator._id;
    const moreInfo = await request.get(
      `/api/defibrillators/${defId}`
    );
    expect(moreInfo.status).toBe(200);
    expect(typeof response.body).toBe('object');
    expect(response.body.error).toBe(false);
    expect(moreInfo.body.defibrillator._id).toBe(defId);
  });
});

describe('post method', () => {
  it('tests adding new defibrillator', async () => {
    const oldRecords = await Defibrillator.find();
    const response = await request
      .post('/api/defibrillators')
      .set('Authorization', tokenAdmin)
      .send(newDefibrillator);
    const newRecords = await Defibrillator.find();
    expect(response.status).toBe(201);
    expect(typeof response.body).toBe('object');
    expect(response.body.error).toBe(false);
    expect(newRecords.length > oldRecords.length).toBe(
      true
    );
  });
});

describe('put method', () => {
  it('tests updating existing defibrillator', async () => {
    const response = await request
      .post('/api/defibrillators')
      .set('Authorization', tokenAdmin)
      .send(newDefibrillator);
    const updateDef = await request
      .put(
        `/api/defibrillators/${response.body.defibrillator._id}`
      )
      .set('Authorization', tokenAdmin)
      .send({ address: 'updated' });
    expect(updateDef.body.defibrillator.address).toBe(
      'updated'
    );
    expect(updateDef.status).toBe(200);
    expect(typeof response.body).toBe('object');
    expect(response.body.error).toBe(false);
  });
});

describe('delete method', () => {
  it('tests deleting existing defibrillator', async () => {
    const response = await request
      .post('/api/defibrillators')
      .set('Authorization', tokenAdmin)
      .send(newDefibrillator);
    const oldRecords = await Defibrillator.find();
    const removedDef = await request
      .delete(
        `/api/defibrillators/${response.body.defibrillator._id}`
      )
      .set('Authorization', tokenAdmin);
    const newRecords = await Defibrillator.find();
    expect(removedDef.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(oldRecords[0].images.length).toBe(0);
    expect(oldRecords.length - newRecords.length).toBe(1);
  });
});

afterAll(async (done) => {
  await mongoose.connection.collection('users').drop();
  await mongoose.connection
    .collection('defibrillators')
    .drop();
  await mongoose.connection.close();
  done();
});
