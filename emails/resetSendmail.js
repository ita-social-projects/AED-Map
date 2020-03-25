const { EMAIL_FROM, BASE_URL } = require('../config/keys');

const resetSendmailEmail = (email, token) => (
  {
    from: EMAIL_FROM,
    to: email,
    subject: 'Відновлення пароля',
    html: `
      <h1>Вітаємо, вас!</h1>
      <p>Для успішного завершення відновлення потрібно змінити пароль.</p>
      <p>Посилання для зміни пароля - <a href="${BASE_URL}/reset/${email}/${token}">Відновити пароль</a>.</p>
      <p>Посилання дійсне протягом години.</p>
      <hr />
      <a href="${BASE_URL}">Головна сторінка</a>
    `
  }
);

module.exports = {
  resetSendmailEmail
};
