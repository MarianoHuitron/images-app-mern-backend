const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { verifyToken } = require('../middlewares/validateJWT');
const { uploadImage, getImages, deleteImage } = require('../controllers/imageController');

const upload = multer({
    dest: path.join(__dirname, '../public/uploads')
})
router.post('/new', [
    verifyToken,
    upload.single('img')

],  uploadImage);

router.get('/', verifyToken, getImages);
router.delete('/:id', verifyToken, deleteImage)


module.exports = router;