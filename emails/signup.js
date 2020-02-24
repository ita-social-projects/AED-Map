const { EMAIL_FROM, BASE_URL } = require('../config/keys');

const signupEmail = (email) => (
  {
    from: EMAIL_FROM,
    to: email,
    subject: 'Регістрація нового користувача пройшла успішно',
    html: `
      <h1>Вітаємо, вас!</h1>
      <p>Регістрація нового користувача пройшла успішно.</p>
      <p>Ваша електронна адреса для входу в особистий кабінет - ${email}.</p>
      <hr />
      <a href="${BASE_URL}">Головна сторінка</a>
    `
  }
);

module.exports = {
  signupEmail
};
