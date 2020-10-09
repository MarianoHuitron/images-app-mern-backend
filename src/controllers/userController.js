const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { genJWT } = require('../services/generateJWT');



const createUser = async (req, res) => {
    
    const { email, password } = req.body;
    console.log(req.body)
    try {
        
        // Verify if email exists
        let user = await User.findOne({email});

        if(!!user) {
            return res.status(400).json({
                ok: false,
                msg: 'The email is already used'
            });
        }


        user = new User(req.body);

        // encript password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await genJWT(user.id, user.name);

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact administrator'
        });
    }

};

const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({email});
   
        if(!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Email or password icorrect'
            });
        }

        // Validate password
        const verifyPassword = bcrypt.compareSync(password, user.password);

        if(!verifyPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Email or password icorrect'
            });
        }

        // Generate JWT
        const token = await genJWT(user.id, user.name);

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact administrator'
        });
    }

}


const renewToken = async (req, res = response) => {
    
    const uid = req.uid;
    const name = req.name;

    const token = await genJWT(uid, name);

    res.status(200).json({
        ok: true,
        uid,
        name,
        token
    }); 
}



module.exports = {
    createUser,
    login,
    renewToken
}