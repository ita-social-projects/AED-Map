import { string, object, ref } from 'yup';
import PasswordValidator from 'password-validator';

const pwSchema = new PasswordValidator();
pwSchema
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().symbols()
  .has().not().spaces();

const ResetSchema = object().shape({
  password: string()
    .required('Поле обов\'язкове.')
    .min(8, 'Довжина пароля повинна бути від 8 до 64 символів.')
    .max(64, 'Довжина пароля повинна бути від 8 до 64 символів.')
    .test('password',
      'Пароль повинен містити щонайменше одну малу літеру, ' +
      'велику літеру, цифру, символ і не мати пробілів.', value => pwSchema.validate(value)),

  passwordConfirm: string()
    .required('Поле обов\'язкове.')
    .oneOf([ref('password'), null], 'Некоректно введене підтвердження пароля.')
});

export default ResetSchema;
