module.exports = (app) => {
  const mongoose = app.mongoose;
  const MotionSchema = new mongoose.Schema({
    // 训练名称
    name: { type: String, required: true },
    countType: { type: String, Require: true, default: "time" },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
  });
  return mongoose.model("Motion", MotionSchema);
};
