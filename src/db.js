const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        
        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB conected...');

    } catch (error) {
        console.log(error)
        throw new Error('Conection failed');
    }

}



module.exports = {
    dbConnection
}