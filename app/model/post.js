module.exports = (app) => {
  const mongoose = app.mongoose;
  const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
  });
  return mongoose.model("Post", PostSchema);
};