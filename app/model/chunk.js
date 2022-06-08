'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ChunkSchema = new Schema({
    extname: { type: String },
    filename: { type: String },
    mime: { type: String },
    data: { type: Buffer },
    extra: { type: String },
    createdAt: { type: Date, default: Date.now },
  });

  return mongoose.model('Chunk', ChunkSchema);
};
