const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
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
    comments: {
      type: Number,
      default: 0,
    },
    rating: Number,
    description: {
      type: String,
      default: "No description",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Post = mongoose.model("Post", roomSchema);

module.exports = Post;
