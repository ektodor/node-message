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
      required: [true, "password is required"],
    },
    sex: {
      type: Number,
      default: 0,
    },
    image: String,
    posts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
      },
    ],
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
