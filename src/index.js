const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { dbConnection } = require('./db');

const app = express();

// DB
dbConnection();


// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());



// Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/img', require('./routes/imageRoutes'));



app.listen(process.env.PORT || 4000, () => {
    console.log('Server on port 4000');
});