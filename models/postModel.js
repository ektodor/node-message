const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "標題不能為空"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: [true, "用戶不能為空"],
    },
    content: {
      type: String,
      required: [true, "內容不能為空"],
    },
    images: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    id: false,
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
postSchema.virtual("comments", {
  ref: "comment",
  foreignField: "post",
  localField: "_id",
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
