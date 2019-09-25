const Grid = require('gridfs-stream');
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const fileSchema = new Schema({
        doc_id: {
            type: String
        },
        length: {
            type: Number
        },
        name: {
            type: String
        },
        type: {
            type: String
        }
    });

    return mongoose.model('File', fileSchema, 'files');
}

