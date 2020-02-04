import { string, object } from 'yup';

const FilterSchema = object().shape({
  title: string()
    .min(2, 'Введіть мінімум 2 символи!')
    .max(50, 'Максимальна число 50 символів!'),
  address: string()
    .min(2, 'Введіть мінімум 2 символи!')
    .max(50, 'Максимальна довжнина 50 символів!')
});

export default FilterSchema;
