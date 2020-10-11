const Image = require('../models/imageModel');
const { cloudinary } = require('../utils/cloudinary');
const fs = require('fs-extra');


const uploadImage = async (req, res) => {
    try {
        const file = req.file.path;
        console.log(req.file)
        const uploadResponse = await cloudinary.v2.uploader.upload(file, {
            folder: 'img_usplash'
        });

        console.log(uploadResponse);
        res.json({mdg: 'yey'})
    } catch (error) {
        console.log(error)
        res.json({err: 'ups'})
    }
}

module.exports = {
    uploadImage
}