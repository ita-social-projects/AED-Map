const { server } = require('./server');
const { dbInit } = require('./db');

dbInit();

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
