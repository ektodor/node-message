const statusSchema = {
  successSchema: {
    status: true,
    message: "Success Message !!",
  },
  errorSchema: {
    status: false,
    message: "Error Message !!",
  },
};

module.exports = statusSchema;
