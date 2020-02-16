const supertest = require('supertest');
const { app, mongoose } = require('../../server');
const User = require('../../models/User');

const BASEURL = '/api/auth';
const mockDatabaseName = 'mockUsers';
const mockEmailForRegister = 'admin@gmail.com';
const mockPassword = '1234AAAaaa__';

let tokenForRegister, tokenForAuth;

const DBURL = `mongodb://localhost:27017/${mockDatabaseName}`;

const request = supertest(app);

describe('auth routes', () => {
  beforeAll(async (done) => {
    await mongoose.connection.close();
    await mongoose.connect(DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    done();
  });

  it('should return status 201 when mail sent', async () => {
    const user = await User.findOne({ email: mockEmailForRegister });
    if (user) {
      await User.findByIdAndDelete(user._id);
    }
    
    const res = await request
      .post(`${BASEURL}/signup/sendmail`)
      .send({
        email: mockEmailForRegister
      })
      .expect((res) => {
        if(res.body.message !== 'Вітаємо!\n На цю електронну адресу надіслано лист\n з посиланням для створення пароля.')
          throw new Error('message isn\'t correct');

        if(res.body.token === undefined)
          throw new Error('token isn\'t exist');
        
        tokenForRegister = res.body.token;
      })
      .expect(201);
  });

  it('should return status 201 when user created', async () => {
    const res = await request
      .post(`${BASEURL}/signup`)
      .send({
        token: tokenForRegister,
        password: mockPassword,
        passwordConfirm: mockPassword
      })
      .expect({
        message:
          'Вітаємо!\n Регістрація нового користувача пройшла успішно.'
      })
      .expect(201);
  });

  it('should return status 409 when user already exist', async () => {
    const res = await request
      .post(`${BASEURL}/signup/sendmail`)
      .send({
        email: mockEmailForRegister
      })
      .expect({
        errors: {
          email:
            'Ця електронна адреса вже комусь належить.\n Спробуйте іншу.'
        }
      })
      .expect(409);
  });

  it('should return status 422 when token isn\'t correct', async () => {
    const res = await request
      .post(`${BASEURL}/signup`)
      .send({
        token: '$2a$10$i.0VgohTBtx8arWSKs4/AOY2IFgYbKLjHsDKs8raOHXnLz86HLcQKd',
        password: mockPassword,
        passwordConfirm: mockPassword
      })
      .expect({
        message: 'Посилання для створення пароля не є дійсним.\n Зверніться до адміністратора, щоб отримати нове.'
      })
      .expect(422);
  });

  it('should return status 409 when user already exist', async () => {
    const res = await request
      .post(`${BASEURL}/signup`)
      .send({
        token: tokenForRegister,
        password: mockPassword,
        passwordConfirm: mockPassword
      })
      .expect({
        errors: {
          email: 'Ця електронна адреса вже комусь належить.\n Спробуйте іншу.'
        }
      })
      .expect(409);
  });

  it('should return status 401 when user not found', async () => {
    const mockEmail = 'whatever2@gmail.com';

    const res = await request
      .post(`${BASEURL}/signin`)
      .send({
        email: mockEmail,
        password: mockPassword
      })
      .expect({
        message:
          'Неправильна електронна адреса або пароль.\n Повторіть спробу.'
      })
      .expect(401);
  });

  it('should return status 401 when password dont match', async () => {
    const res = await request
      .post(`${BASEURL}/signin`)
      .send({
        email: mockEmailForRegister,
        password:
          '$2a$10$i.0VgohTBtx8arWSKs4/AOY2IFgYbKLjHsDKs8raOHXnLz86HLcQKd'
      })
      .expect({
        message:
          'Неправильна електронна адреса або пароль.\n Повторіть спробу.'
      })
      .expect(401);
  });

  it('should return status 200 when user exist', async () => {
    const res = await request
      .post(`${BASEURL}/signin`)
      .send({
        email: mockEmailForRegister,
        password: mockPassword
      })
      .expect(200);

    expect(res.headers.authorization).toBeTruthy();
    tokenForAuth = res.headers.authorization;
  });

  it('should validate and get 401 when user non authorized', async () => {
    const res = await request
      .get(`${BASEURL}/validate`)
      .expect(401);
  });

  it('should validate and get 200 when user authorized', async () => {
    const res = await request
      .get(`${BASEURL}/validate`)
      .set('Authorization', tokenForAuth)
      .expect(200);

    expect(res.headers.authorization).toBeTruthy();
  });

  afterAll(async (done) => {
    await mongoose.connection.close();
    done();
  });
});
