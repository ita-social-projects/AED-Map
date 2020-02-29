export const mockData = [
  {
    id: '423432fsd4',
    _id: '423432fsd4',
    title: 'Львівська Ратуша',
    address: 'м. Львів, пл. Ринок, 1',
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
  },
  {
    id: 'djsgherjt45658ure7wy',
    _id: 'djsgherjt45658ure7wy',
    title: 'Львівський міжнародний аеропорт',
    address: 'м. Львів, вул. Любінська, 168',
    location: {
      type: 'Point',
      coordinates: [23.959755, 49.818201]
    },
    actual_date: '2019-02-22',
    storage_place:
      'Поверх 1, біля каб. Медпункту (на стіні)',
    accessibility: 'Цілодобово. Без вихідних',
    language: 'Україномовний',
    informational_plates: 'Присутні тільки біля приладу',
    phone: ['380322298303'],
    additional_information:
      'Вхід в крайні ліві розсувні двері (ліворуч та прямо)'
  },
  {
    id: 'gfdsjhdshjt5h65utu8',
    _id: 'gfdsjhdshjt5h65utu8',
    title: 'Медичний центр \'Профідент-плюс\'',
    address:
      'м. Львів, вул. Єфремова, 85 (вхід з вул. Конотопська)',
    location: {
      type: 'Point',
      coordinates: [24.001906, 49.828486]
    },
    actual_date: '2019-03-07',
    storage_place:
      'Поверх 1, рецепція (схований від загального виду, треба запитатись)',
    accessibility: 'Пн-Пт: 09:00-18:00',
    language: 'Російськомовний',
    informational_plates: 'Присутні',
    phone: ['380503713200', '380322401740'],
    additional_information: ''
  }
];

export const mockState = {
  data: mockData,
  loading: false,
  error: null,
  page: 1,
  perPage: 10
};

export const mockNewDefInfo = {
  id: '576uyjty',
  _id: '576uyjty',
  title: 'Львівська Ратуша',
  address: 'м. Львів, пл. Ринок, 1',
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

export const mockFilter = 'some address';

export const mockError = new Error(
  'Request failed with status code 500'
);

export const mockMap = {
  lng: 24.0311,
  lat: 49.842,
  zoom: 12.5
};

export const mockCurrDef = {
  id: '',
  coordinates: []
};

export const mockUser = {
  email: 'mock@gmail.com',
  password: 'dsajjd3jej3hk333DDSFDS___2s'
};
export const mockToken =
  'Bearer daskjfih43uit.dsaodowiidi3988rifk.dsadsagerkjgk';
