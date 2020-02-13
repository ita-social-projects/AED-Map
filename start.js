const { server } = require('./server');

const PORT = 3012;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
