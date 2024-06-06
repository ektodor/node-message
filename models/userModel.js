const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    nickname: {
      type: String,
      required: [true, "nickname 不能為空"],
    },
    email: {
      type: String,
      required: [true, "email 不能為空"],
      unique: true,
      select: false,
    },
    password: {
      type: String,
      // mongoose 認證
      minlength: 8,
      select: false,
      required: [true, "password 不能為空"],
    },
    sex: {
      type: String,
      enum: ["male", "female"],
    },
    image: String,
    followers: [
      {
        user: { type: mongoose.Schema.ObjectId, ref: "User" },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    following: [
      {
        user: { type: mongoose.Schema.ObjectId, ref: "User" },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    id: false,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const User = mongoose.model("user", userSchema);

module.exports = User;
