module.exports = (res, error) => {
  // Send response with 500 status and error with message
  res.status(500).json({
    success: false,
    message: error.message ? error.message : error
  });
};
