const { EMAIL_FROM, BASE_URL } = require('../config/keys');

const signupSendmailEmail = (email, token) => (
  {
    from: EMAIL_FROM,
    to: email,
    subject: 'Регістрація нового користувача',
    html: `
      <h1>Вітаємо, вас!</h1>
      <p>Для успішного завершення регістрації потрібно створити пароль.</p>
      <p>Посилання для створення пароля - <a href="${BASE_URL}/signup/${email}/${token}">Створити пароль</a>.</p>
      <p>Посилання дійсне протягом години.</p>
      <hr />
      <a href="${BASE_URL}">Головна сторінка</a>
    `
  }
);

module.exports = {
  signupSendmailEmail
};
