const resetEmail = (email) => ({
  from: process.env.EMAIL_FROM,
  to: email,
  subject: 'Відновлення пароля пройшло успішно',
  html: `
      <h1>Вітаємо, вас!</h1>
      <p>Відновлення пароля пройшло успішно.</p>
      <hr />
      <a href="${process.env.BASE_URL}">Головна сторінка</a>
    `
});

module.exports = {
  resetEmail
};
