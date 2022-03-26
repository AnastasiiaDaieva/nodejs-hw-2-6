const status = {
  UNATHORIZED: {
    code: 401,
    message: 'Unauthorized',
  },
  NOT_FOUND: {
    code: 404,
    message: 'Not Found',
  },
  VERIFICATION_SENT: {
    code: 200,
    message: 'Verification email sent',
  },
  VERIFIED_ERROR: {
    code: 400,
    message: 'Verification has already been passed',
  },
};

module.exports = status;
