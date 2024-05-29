const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    nickname: {
      type: String,
      required: [true, "nickname is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      select: false,
    },
    password: {
      type: String,
      // mongoose 認證
      minlength: 8,
      select: false,
      required: [true, "password is required"],
    },
    sex: {
      type: String,
      enum: ["male", "female"],
    },
    image: String,
    followers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Follower",
      },
    ],
    like_posts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
