const supertest = require('supertest');
const { app, mongoose } = require('../../server');
const Defibrillator = require('../../models/Defibrillator');

const request = supertest(app);
const databaseName = 'jestTest';
const url = `mongodb://localhost:27017/${databaseName}`;

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
  await mongoose.connect(url);
  done();
});

describe('get method', () => {
  it('get all defibrillators', async () => {
    const response = await request.get(
      '/api/defibrillators'
    );
    expect(response.status).toBe(200);
    expect(response.body.length >= 0).toBe(true);
  });
});

describe('post method', () => {
  it('tests adding new defibrillator', async () => {
    const oldRecords = await Defibrillator.find();
    const response = await request
      .post('/api/defibrillators')
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
      .send(newDefibrillator);
    const updateDef = await request
      .put(
        `/api/defibrillators/${response.body.defibrillator._id}`
      )
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
      .send(newDefibrillator);
    const oldRecords = await Defibrillator.find();
    const removedDef = await request.delete(
      `/api/defibrillators/${response.body.defibrillator._id}`
    );
    const newRecords = await Defibrillator.find();
    expect(removedDef.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(oldRecords.length - newRecords.length).toBe(1);
  });
});

afterAll(async (done) => {
  await mongoose.connection
    .collection('defibrillators')
    .drop();
  mongoose.connection.close();
  done();
});
