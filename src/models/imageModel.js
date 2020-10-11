const { model, Schema } = require('mongoose');

const imageSchema = new Schema({
    name: {
        type: String,
        req: true
    },
    img_path: {
        type: String,
        required: true
    },
    public_id: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


module.exports = model('Image', imageSchema);