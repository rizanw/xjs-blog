module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      slug: String,
      name: String,
      description: String,
    },
    { timestamps: true }
  );

  return mongoose.model("category", schema);
};
