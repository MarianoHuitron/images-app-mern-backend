const { model, Schema } = require('mongoose');

const notesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})


