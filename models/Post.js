const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const userPost = mongoose.Schema({
  user: {
    type: String,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: String,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: String,
        ref: "users"
      },
      text: {
        type: String
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  data: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("posts", userPost);
