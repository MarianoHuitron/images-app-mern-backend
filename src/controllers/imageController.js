const Image = require('../models/imageModel');
const { cloudinary } = require('../utils/cloudinary');
const fs = require('fs-extra');
const { use } = require('../routes/imageRoutes');


const uploadImage = async (req, res) => {
    const user = req.uid;
    const { title, description } = req.body;
    try {
        const file = req.file.path;
        const uploadResponse = await cloudinary.v2.uploader.upload(file, {
            folder: 'img_usplash'
        });

        const newImage = new Image({
            title,
            description,
            user,
            img_path: uploadResponse.secure_url,
            asset_id: uploadResponse.asset_id,
            public_id: uploadResponse.public_id,
            width: uploadResponse.width,
            hight: uploadResponse.height
        });

        await fs.unlink(file);
        const imageSaved = await newImage.save();

        res.status(200).json({
            ok: true,
            image: imageSaved
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contact the admin'
        });
    }
}

const getImages = async (req, res) => {
    const user = req.uid;

    try {
        const images = await Image.find({user});
        console.log(images);
        res.status(200).json({
            ok: true,
            images
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contact you admin'
        });
    }

}


const deleteImage = async (req, res) => {

    const user = req.uid;
    const imageId = req.params.id;

    try {
        
        const image = await Image.findById(imageId);

        if(!image) return res.status(404).json({
            ok: false,
            msg: 'Image not found'
        });

        if(image.user.toString() !== user) return res.status(401).json({
            ok: false,
            msg: 'you cannot delete this image'
        });

        await cloudinary.v2.api.delete_resources([image.public_id]);
        await Image.findByIdAndDelete(imageId);

        return res.status(200).json({
            ok: true,
            msg: 'Image deleted!'
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });
    }

}

const updateImage = (req, res) => {

    const uid = req.uid;
    const imageId = req.params.id;

    try {
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });
    }

}


module.exports = {
    uploadImage,
    getImages,
    deleteImage
}