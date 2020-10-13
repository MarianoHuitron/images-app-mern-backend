const { model, Schema } = require('mongoose');

const imageSchema = new Schema({
    title: {
        type: String,
        req: true
    },
    description: {
        type: String
    },
    img_path: {
        type: String,
        required: true
    },
    asset_id: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    },
    width: {
        type: Number,
    },
    height: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


module.exports = model('Image', imageSchema);