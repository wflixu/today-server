module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
  
    const UserSchema = new Schema({
      uname: { type: String  },
      pass: { type: String  },
    });
  
    return mongoose.model('User', UserSchema);
}
  
 