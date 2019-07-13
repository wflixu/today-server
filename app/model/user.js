module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        uname: { type: String },
        pass: { type: String },
        uid: { type: String },
        age: { type: Number }
    });

    return mongoose.model('User', UserSchema,'user');
}

