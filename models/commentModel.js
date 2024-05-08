const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, "user id is required"],
      ref: "User",
    },
    message: {
      type: String,
      required: [true, "message is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
