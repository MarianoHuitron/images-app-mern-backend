const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./db');

const app = express();

// DB
dbConnection();


// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());



// Routes
app.use('/api/user', require('./routes/userRoutes'));



app.listen(4000, () => {
    console.log('Server on port 4000');
});