module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      status: String,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      slug: String,
      title: String,
      content: String, 
      categories: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "category",
        },
      ],
      thumbnail: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  }); 

  return mongoose.model("post", schema);
};
