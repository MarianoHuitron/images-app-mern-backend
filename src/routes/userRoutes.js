// /api/user
const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const { createUser, login, renewToken } = require('../controllers/userController');
const { validFields } = require('../middlewares/validateFields');
const { verifyToken } = require('../middlewares/validateJWT');

router.post('/new', [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('password', 'Password must contain at least 6 characters').isLength({min: 6}),
    validFields
], createUser);

router.post('/login', [
    check('email', 'The email is required').isEmail(),
    check('password', 'Password is required').isLength({min: 6}),
    validFields
], login);

router.get('/renew', verifyToken, renewToken);


module.exports = router;