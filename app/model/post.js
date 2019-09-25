module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const PostSchema = new Schema({
        pid: { type: String },
        text: { type: String },
        uid: { type: String },
        img: { type: String }
    });

    return mongoose.model('Post', PostSchema, 'post');
}