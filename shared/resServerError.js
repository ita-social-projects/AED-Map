const resServerError = (res, error) => {
  // Response [Internal Server Error] - error message
  res.status(500).json({
    success: false,
    message: error.message ? error.message : error
  });
};

module.exports = {
  resServerError
};
