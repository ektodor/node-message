const userSchema = {
  signUp: {
    $nickname: "美女",
    $email: "abc@gmail.com",
    $password: "",
  },
  signIn: {
    $email: "abc@gmail.com",
    $password: "",
  },
  updatePassword: {
    $newPassword: "12345678",
    $checkNewPassword: "12345678",
  },
  updateProfile: {
    nickname: "美女",
    image: "url",
    sex: {
      "@enum": ["male", "female"],
    },
  },
};

module.exports = userSchema;
