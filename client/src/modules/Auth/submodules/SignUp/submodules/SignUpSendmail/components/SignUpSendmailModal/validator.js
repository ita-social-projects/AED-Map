import { string, object } from 'yup';

const SignUpSendmailSchema = object().shape({
  email: string()
    .required('Поле обов\'язкове.')
    .email('Некоректно введена електронна адреса.'),
});

export default SignUpSendmailSchema;
