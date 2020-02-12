import { string, object } from 'yup';

const AuthSchema = object().shape({
  email: string()
    .required('Поле обов\'язкове.'),
  password: string()
    .required('Поле обов\'язкове.'),
});

export default AuthSchema;
