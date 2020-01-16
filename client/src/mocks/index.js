export const mockData = [
  {
    id: '127e7fejdfjd',
    city: 'Львів',
    address: 'пл. Ринок, 1 (Львівська ратуша)',
    cabinet: '1 пов.(перший кабінет праворуч)',
    lang: 'Російськомовний',
    accesibility: 'Цілодобово. Без вихідних',
    infoTableAboutAED: 'немає',
    phone: '+38 (032) 297-59-94',
  },
  {
    id: '423432fsd4',
    city: 'Львів',
    address:
      'вул. Любінська, 168, AED #1 ЛЬВІВСЬКИЙ МІЖНАРОДНИЙ АЕРОПОРТ',
    cabinet:
      'Вхід в крайні ліві розсувні двері (ліворуч та прямо) 1 пов. Біля каб. Медпункту (на стіні)',
    lang: 'Україномовний',
    accesibility: 'Цілодобово. Без вихідних',
    infoTableAboutAED: 'Лише біля самого AED',
    phone: '+38 (032) 229-83-03',
  },
  {
    id: '576uyjty',
    city: 'Львів',
    address:
      'вул. Єфремова 85 (вхід з вул. Конотопська) Медичний центр \'ПРОФІДЕНТ- ПЛЮС\'',
    cabinet:
      '1 пов. Рецепція (схований від загального виду/треба запитатись)',
    lang: 'Російськомовний',
    accesibility: 'Пн-Пт 09:00 - 18:00',
    infoTableAboutAED: 'Присутні',
    phone: '+38 (050) 371-32-00; +38 (032) 240-17-40',
  },
];

export const mockNewDefInfo = {
  id: '576uyjty',
  city: 'Львів 2',
  address:
    'вул. Єфремова 131 (вхід з вул. Конотопська) Медичний центр \'ПРОФІДЕНТ- ПЛЮС\'',
  cabinet:
    '1 пов. Рецепція (схований від загального виду/треба запитатись)',
  lang: 'Російськомовний',
  accesibility: 'Пн-Пт 09:00 - 18:00',
  infoTableAboutAED: 'Немає',
  phone: '+38 (050) 371-32-00; +38 (032) 240-17-40',
};

export const mockFilter = 'some address';

export const mockError = new Error('Some error');

export const mockMap = {
  lng: 24.0311,
  lat: 49.842,
  zoom: 12.5,
};
