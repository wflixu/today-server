module.exports = (app) => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    password: { type: String, required: true },
    username: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    mobile: { type: String, required: false, default: "" },
    avatar: {
      type: String,
      default:
        "https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm",
    },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
  });
  return mongoose.model("User", UserSchema);
};
