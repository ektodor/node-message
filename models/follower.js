const mongoose = require("mongoose");

const followerSchema = mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.ObjectId,
      required: [true, "follower id is required"],
      ref: "User",
    },
    follow_time: {
      type: Date().now,
      required: [true, "follow time id is required"],
    },
  },
  {
    versionKey: false,
  }
);

const Follower = mongoose.model("Follower", followerSchema);

module.exports = Follower;
