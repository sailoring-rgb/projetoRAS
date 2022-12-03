const { Users } = require('../model/db/model.db')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require("jsonwebtoken");

const JWT_SECRET = "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await Users.findOne({
        where: {
            email: email,
        }
    })

    if(bcrypt.compareSync(password, user.dataValues.password))
        return res
            .status(200)
            .json({
                token: jsonwebtoken.sign({ user: "admin" }, JWT_SECRET)
            });

    return res
        .status(401)
        .json({ message: "The username and password your provided are invalid" });
}

exports.register = async (req, res) => {
    const userData = req.body;

    if(userData.password.trim() !== userData.confPassword.trim())
        return res
            .status(400)
            .json({ message: "The passwords don't match" });

    delete userData.confPassword

    const newUserData = {
        ...userData,
        password: bcrypt.hashSync(userData.password, 10),
        birthday: new Date(parseInt(userData.birthday)), // Should receive a timestamp
    }
    const newUser = await Users.create(newUserData);

    return res
        .status(200)
        .json({
            status: true,
            message: "User registered successfully."
        });
}