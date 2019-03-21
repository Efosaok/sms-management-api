export default (error) => {
  switch (error.code) {
    case '23505':
      return {
        errorMessage: 'phone number already exists',
        status: 409,
      };
    case '23503':
      return {
        errorMessage: 'an error occured, please check the specified sender or receiver',
        status: 404,
      };
    default: {
      return {
        errorMessage: error,
        status: 500,
      };
    }
  }
};
