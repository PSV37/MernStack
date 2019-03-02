const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
//Load Post Model
const Post = require("../../models/Post");
//Load Profile Model
const Profile = require("../../models/Profile");

//@route  GET api/posts/test
//@desc   Test post route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Posts work" }));

//@route  POST api/posts/
//@desc   Create post route
//@access Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.body.id
    });
    //Save Post
    newPost.save().then(post => res.json(post));
  }
);

//@route  GET api/posts/
//@desc   Get all posts route
//@access Public
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.find()
      .sort({ data: -1 })
      .then(posts => {
        res.json(posts).catch(err => res.status(404).json(err));
      });
  }
);

//@route  GET api/posts/:id
//@desc   Get all posts route by id
//@access Public
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(posts => {
        res.json(posts);
      })
      .catch(err => res.status(404).json({ nopostfound: "NO Post Found" }));
  }
);

//@route  DELETE api/posts/:id
//@desc   Delete post route by id
//@access Public
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Remove From Post
          post.remove().then(() => res.json({ post }));
        })
        .catch(err => res.status(404).json({ nopostfound: "NO Post Found" }));
    });
  }
);

//@route  POST api/posts/like/:id
//@desc   Like post route by id
//@access Public
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          console.log(post);
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyLiked: "User Already liked this post" });
          } //End if

          post.likes.unshift({ user: req.user.id });
          post.save().then(postLike => res.json(postLike));
        })
        .catch(err => res.status(404).json({ nopostfound: "NO Post Found" }));
    });
  }
);

//@route  POST api/posts/unlike/:id
//@desc   Unlike post route by id
//@access Public
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ unLiked: "You have not yet liked this post" });
          } //End if

          //Remove Index From Array
          const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);

          //Remove From Post
          post.likes.splice(removeIndex);
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ nopostfound: "NO Post Found" }));
    });
  }
);

//@route  POST api/posts/comments
//@desc   Create post Comment route
//@access Public
router.post(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        //Save Comments of Posts
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ nopostfound: "No post found for this user" })
      );
  }
);

//@route  DELETE api/posts/comments/:id/:comment_id
//@desc   Delete post Comment route
//@access Public
router.delete(
  "/comments/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        console.log({ post });
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(400)
            .json({ commentsnotexists: "Comments dose not exist" });
        } //End if-else

        //Map Post COmments Index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        //Splice Comment out of array
        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ nopostfound: "No post found for this user" })
      );
  }
);
module.exports = router;
