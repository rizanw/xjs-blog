const db = require("../models");
const Category = db.category;

exports.getAll = (req, res) => {
  Category.find({}, (err, categories) => {
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
      data: categories,
    });
  });
};

exports.create = (req, res) => {
  const category = new Category({
    slug: req.body.name.replace(/\s+/g, "-").toLowerCase(),
    name: req.body.name,
    description: req.body.description,
  });
  category.save((err, category) => {
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
      data: category,
    });
  });
};

exports.delete = (req, res) => {
  Category.deleteOne({ _id: req.params.id }, (err, category) => {
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
      data: category,
    });
  });
};
