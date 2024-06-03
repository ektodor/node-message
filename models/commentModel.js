const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "評論不能為空"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      require: ["true", "用戶不能為空"],
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "post",
      require: ["true", "文章不能空白"],
    },
  },
  {
    timestamps: true,
  }
);

// 在抓取留言時，會把 user 資料一起抓來
commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name id createdAt",
  });
  next();
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
