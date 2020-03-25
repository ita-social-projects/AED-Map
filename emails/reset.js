const { EMAIL_FROM, BASE_URL } = require('../config/keys');

const resetEmail = (email) => (
  {
    from: EMAIL_FROM,
    to: email,
    subject: 'Відновлення пароля пройшло успішно',
    html: `
      <h1>Вітаємо, вас!</h1>
      <p>Відновлення пароля пройшло успішно.</p>
      <hr />
      <a href="${BASE_URL}">Головна сторінка</a>
    `
  }
);

module.exports = {
  resetEmail
};
