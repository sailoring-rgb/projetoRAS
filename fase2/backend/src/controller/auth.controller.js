const { User } = require('../model/db/model.db')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require("jsonwebtoken");

const JWT_SECRET = "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

exports.validateJWT = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                console.log(authorization)
                req.jwt = jsonwebtoken.verify(authorization[1], JWT_SECRET);
                return next();
            }
        } catch (err) {
            console.log(err)
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({
        where: {
            email: email,
        }
    })

    if(bcrypt.compareSync(password, user.dataValues.password))
        return res
            .status(200)
            .json({
                token: jsonwebtoken.sign(user.dataValues, JWT_SECRET)
            });

    return res
        .status(401)
        .json({ message: "The username and password your provided are invalid" });
}

exports.register = async (req, res) => {
    const userData = req.body;
    console.log(userData)

    if(userData.password.trim() !== userData.confPassword.trim())
        return res
            .status(400)
            .json({ message: "The passwords don't match" });

    delete userData.confPassword

    const newUserData = {
        ...userData,
        wallet: 0.0,
        password: bcrypt.hashSync(userData.password, 10),
        birthday: new Date(parseInt(userData.birthday)), // Should receive a timestamp
    }
    const newUser = await User.create(newUserData);

    return res
        .status(200)
        .json({
            status: true,
            message: "User registered successfully."
        });
}