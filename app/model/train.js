module.exports = (app) => {
  const mongoose = app.mongoose;
  const TrainSchema = new mongoose.Schema({
    // 训练名称
    name: { type: String, required: true },
    countType: { type: String, Require: true,default: 'time' },
    start: { type: Date, default: Date.now },
    end: { type: Date, default: Date.now },
    count: { type: Number, default: 0 },

    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
  });
  return mongoose.model("Train", TrainSchema);
};
