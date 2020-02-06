const { app } = require('./server');

const PORT = 3012;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
