import * as Yup from 'yup';

const FormValidation =Yup.object().shape({
  address: Yup.string().required('Поле обов\'язкове'),
  title: Yup.string().required('Поле обов\'язкове'),
  phone: Yup.string()
    .required('Поле обов\'язкове')
    .length(19, 'Номер містить замало символів'),
  accessibility: Yup.string().required(
    'Поле обов\'язкове'
  ),
  storage_place: Yup.string().required(
    'Поле обов\'язкове'
  ),
  floor: Yup.number()
    .required('Поле обов\'язкове')
    .min(0, 'Значення поля не може бути від\'ємне')
    .max(20, 'Значення поля не може бути вище 20')
});

export default FormValidation;
