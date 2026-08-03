const sendError = (res, statusCode, message, details = null) => {
  const response = {
    success: false,
    message: message || "An unexpected error occurred",
  };
  
  if (details) {
    response.details = details;
  }
  
  return res.status(statusCode).json(response);
};

const sendSuccess = (res, statusCode, data = {}, message = null) => {
  const response = {
    success: true,
    ...data,
  };
  
  if (message) {
    response.message = message;
  }
  
  return res.status(statusCode).json(response);
};

module.exports = { sendError, sendSuccess };
