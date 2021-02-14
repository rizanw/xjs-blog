const db = require("../models");
const Post = db.post;
const Category = db.category;

exports.getAll = (req, res) => {
  Post.find({})
    .populate({
      path: "categories",
      select: { slug: 1, name: 1, description: 1 },
    })
    .populate({ path: "author", select: { name: 1, email: 1 } })
    .exec((err, posts) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err,
        });
        return;
      }
      res.status(200).send({
        success: true,
        message: "succeed!",
        data: posts,
      });
    });
};

exports.getById = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .populate({
      path: "categories",
      select: { slug: 1, name: 1, description: 1 },
    })
    .populate({ path: "author", select: { name: 1, email: 1 } })
    .exec((err, post) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err,
        });
        return;
      }
      res.status(200).send({
        success: true,
        message: "succeed!",
        data: post,
      });
    });
};

exports.create = (req, res) => {
  const post = new Post({
    status: req.body.status,
    author: req.userId,
    slug: req.body.title.replace(/\s+/g, "-").toLowerCase(),
    title: req.body.title,
    content: req.body.content,
    thumbnail: req.body.thumbnail,
  });
  post.save((err, post) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
      return;
    }

    if (req.body.categories) {
      Category.find(
        {
          name: { $in: req.body.categories },
        },
        (err, categories) => {
          if (err) {
            res.status(500).send({
              success: false,
              message: err,
            });
            return;
          }

          post.categories = categories.map((category) => category._id);
          post.save((err, post) => {
            if (err) {
              res.status(500).send({
                success: false,
                message: err,
              });
              return;
            }

            res.status(200).send({
              success: true,
              message: "succeed!",
              data: post,
            });
          });
        }
      );
    } else {
      Category.findOne({ slug: "uncatagorized" }, (err, category) => {
        if (err) {
          res.status(500).send({
            success: false,
            message: err,
          });
          return;
        }

        post.categories = [category._id];
        post.save((err, post) => {
          if (err) {
            res.status(500).send({
              success: false,
              message: err,
            });
            return;
          }

          res.status(200).send({
            success: true,
            message: "succeed!",
            data: post,
          });
        });
      });
    }
  });
};

exports.update = (req, res) => {
  Post.findOne({ _id: req.params.id }, (err, post) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
      return;
    }

    if (req.body.title) {
      post.title = req.body.title;
    }
    if (req.body.content) {
      post.content = req.body.content;
    }

    post.save((err) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err,
        });
        return;
      }
    });

    res.status(200).send({
      success: true,
      message: "succeed!",
      data: {
        _id: post._id,
        title: req.body.title,
        content: req.body.content,
      },
    });
  });
};

exports.delete = (req, res) => {
  Post.deleteOne({ _id: req.params.id }, (err, post) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: "succeed!",
      data: post,
    });
  });
};
