const jwt = require('jsonwebtoken');

const genJWT = (uid, name) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid,
            name
        };

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {

            if(err) {
                console.error(err)
                reject('Token no genereted');
            }

            resolve(token);
        })

    })

}


module.exports = {
    genJWT
}