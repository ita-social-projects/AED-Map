export const mockData = {
  listDefs: [
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
  ],
  mapDefs: [
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
  ]
};

export const mockState = {
  listData: mockData.listDefs,
  mapData: mockData.mapDefs,
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

export const mockSearch = 'Львів';

export const mockNewPoint = {
  lng: 23.519565,
  lat: 49.334796
};

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

export const photos = [
  {
    img:
      'https://4.imimg.com/data4/GP/KJ/MY-10640121/automatic-external-defibrillator-500x500.jpg',
    title: 'Image 1',
    author: 'author'
  },
  {
    img:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBEGo9o6eKyGcCPSbrM7HxhOZiNeWW5DPyfb5YsiLIFA7x5h2o',
    title: 'Image 2',
    author: 'author 2'
  },
  {
    img:
      'https://www.defibshop.co.uk/media/catalog/product/cache/1/image/3102d3655b77f202abde6e3fa94697ad/f/r/frx-adult-defibrillation-pad-bundle-defibshop-989803139261b.jpg',
    title: 'Image 3',
    author: 'author 3'
  },
  {
    img:
      'https://estock.stjohnambulance.com.au/application_images/stockitems/0815_1_400.jpg',
    title: 'Image 4',
    author: 'author'
  },
  {
    img:
      'https://cdn.medisave.co.uk/media/catalog/product/cache/1/image/585x585/9df78eab33525d08d6e5fb8d27136e95/d/e/defibsafe_2.jpg',
    title: 'Image 5',
    author: 'author 2'
  },
  {
    img:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQaJPYiRcJ0mjke2MdKCKsvsM7hBc4Yg8_HP4pN869_5cRCoOix',
    title: 'Image 6',
    author: 'author 3'
  }
];
