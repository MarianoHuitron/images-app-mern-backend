const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/imageController');
const multer = require('multer');
const path = require('path');
const upload = multer({
    dest: path.join(__dirname, '../public/uploads')
})
router.post('/new', upload.single('img'),  uploadImage);

module.exports = router;