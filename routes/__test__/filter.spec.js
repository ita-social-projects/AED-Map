const supertest = require('supertest');
const mongoose = require('mongoose');
const urlModule = require('url');
const { app } = require('../../server');
const Defibrillator = require('../../models/Defibrillator');
const User = require('../../models/User');

const request = supertest(app);
const databaseName = 'filterTest';
const url = `mongodb://localhost:27017/${databaseName}`;

const mockAdminEmail = 'admin@admin.com';
const mockAdminPassword = 'qwe123Q!';
const mockAdminPasswordHashed =
  '$2a$10$9kWs/nlfM7ZIxJq0tj8yquATo47d0OqDl1pv.3tRfRU8fvcWrBK0W';
let tokenAdmin;

const mockQuery = {
  title: 'площа',
  language: 'російськомовний',
  informational_plates: 'відсутні'
};

const mockInvalidQuery = {
  title: 'qwerty'
};

const mockDefibrillator1 = {
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

const mockDefibrillator2 = {
  title: 'Львівський міжнародний аеропорт',
  address: 'м. Львів, вул. Любінська, 168',
  location: {
    type: 'Point',
    coordinates: [23.959755, 49.818201]
  },
  actual_date: '2019-02-22',
  storage_place: 'Поверх 1, біля каб. Медпункту (на стіні)',
  accessibility: 'Цілодобово. Без вихідних',
  language: 'Україномовний',
  informational_plates: 'Присутні тільки біля приладу',
  phone: ['380322298303'],
  additional_information:
    'Вхід в крайні ліві розсувні двері (ліворуч та прямо)'
};

beforeAll(async (done) => {
  await mongoose.connection.close();
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
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

  await request
    .post('/api/defibrillators')
    .set('Authorization', tokenAdmin)
    .send(mockDefibrillator1);
  await request
    .post('/api/defibrillators')
    .set('Authorization', tokenAdmin)
    .send(mockDefibrillator2);

  done();
});

describe('get method with an applied filter', () => {
  it('get filtered list of defibrillators', async () => {
    const allRecords = await Defibrillator.find();
    const response = await request
      .get('/api/defibrillators/')
      .query(mockQuery);
    const queryObj = urlModule.parse(
      response.req.path,
      true
    ).query;
    const filter = {};
    Object.keys(queryObj).forEach((key) => {
      filter[key] = new RegExp(queryObj[key], 'i');
    });
    const filteredRecords = await Defibrillator.find(
      filter
    );
    const isMatched = filteredRecords.every((def) =>
      Object.keys(filter).every((key) =>
        filter[key].test(def[key])
      )
    );

    expect(response.status).toBe(200);
    expect(allRecords.length).toBeGreaterThanOrEqual(
      filteredRecords.length
    );
    expect(isMatched).toBe(true);
  });

  it('should return empty array when filter is not match with defs', async () => {
    const allRecords = await Defibrillator.find();
    const response = await request
      .get('/api/defibrillators/')
      .query(mockInvalidQuery);
    const queryObj = urlModule.parse(
      response.req.path,
      true
    ).query;
    const filter = {};
    Object.keys(queryObj).forEach((key) => {
      filter[key] = new RegExp(queryObj[key], 'i');
    });
    const filteredRecords = await Defibrillator.find(
      filter
    );

    expect(response.status).toBe(200);
    expect(allRecords.length).toBeGreaterThanOrEqual(
      filteredRecords.length
    );
    expect(filteredRecords.length).toBe(0);
  });
});

afterAll(async (done) => {
  await mongoose.connection
    .collection('users')
    .drop();
  await mongoose.connection
    .collection('defibrillators')
    .drop();
  await mongoose.connection.close();
  done();
});
