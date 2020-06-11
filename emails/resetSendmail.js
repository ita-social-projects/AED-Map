const resetSendmailEmail = (email, token) => ({
  from: process.env.EMAIL_FROM,
  to: email,
  subject: 'Відновлення пароля',
  html: `
      <h1>Вітаємо, вас!</h1>
      <p>Для успішного завершення відновлення потрібно змінити пароль.</p>
      <p>Посилання для зміни пароля - <a href="${process.env.BASE_URL}/reset/${email}/${token}">Відновити пароль</a>.</p>
      <p>Посилання дійсне протягом години.</p>
      <hr />
      <a href="${process.env.BASE_URL}">Головна сторінка</a>
    `
});

module.exports = {
  resetSendmailEmail
};
