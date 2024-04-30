const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Author is required"],
      ref: "User",
    },
    tags: [
      {
        type: String,
      },
    ],
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      },
    ],
    images: [
      {
        type: String,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
