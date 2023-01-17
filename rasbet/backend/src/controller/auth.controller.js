const { User } = require('../model/db/model.db')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require("jsonwebtoken")
const { UserType } = require('../model/UserType')

const JWT_SECRET = "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu"

class AuthController {
    validateJWT = (req, res, next) => {
        if (req.headers['authorization']) {
            try {
                let authorization = req.headers['authorization'].split(' ')
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send()
                } else {
                    req.jwt = jsonwebtoken.verify(authorization[1], JWT_SECRET)
                    console.log(Date.now() - req.jwt.lastOnline >= 18000000)
                    if(Date.now() - req.jwt.lastOnline >= 18000000)
                        return res.status(401).send()
                    return next()
                }
            } catch (err) {
                console.log(err)
                return res.status(403).send()
            }
        } else {
            return res.status(401).send()
        }
    }

    validateToken = async (req, res) => {
        const userData = req.jwt
        console.log(userData)
        return res.status(200).json(userData)
    }

    login = async (req, res) => {
        const data = req.body
        const { email, password } = data

        const user = await User.findOne({
            where: {
                email: email,
            }
        })

        if(user && bcrypt.compareSync(password, user.dataValues.password)) {
            const userData = { ...user.dataValues }
            delete userData.password

            return res
                .status(200)
                .json({
                    status: true,
                    token: jsonwebtoken.sign({
                        ...userData,
                        lastLogin: Date.now()
                    }, JWT_SECRET),
                    user: userData,
                })
        }

        return res
            .status(200)
            .json({
                status: false,
                message: "The username and password your provided are invalid"
            })
    }

    registerUser = async (userData, userType, res) => {
        const newUserData = {
            ...userData,
            wallet: 0.0,
            password: bcrypt.hashSync(userData.password, 10),
            birthday: new Date(parseInt(userData.birthday)), // Should receive a timestamp
            type: userType
        }

        if(getAge(newUserData) < 18)
            return res
                .status(400)
                .json({
                    status: true,
                    message: "User should be 18 years old to register."
                })

        try {
            await User.create(newUserData)
        } catch(e) {
            console.error(e)
            switch(e.original.code) {
                case 'ER_DUP_ENTRY':
                    return res.status(500).json({
                        status: false,
                        message: `User already registered with same ${Object.keys(e.fields).join(', ')}.`
                    })
            }
        }

        return res
            .status(200)
            .json({
                status: true,
                message: "User registered successfully."
            })
    }


    register =  async (req, res) => {
        const { userData } = req.body
        console.log(userData)

        if(!userData) return res
            .status(400)
            .json({ message: "Missing fields" })

        if(userData.password.trim() !== userData.confPassword.trim())
            return res
                .status(400)
                .json({ message: "The passwords don't match" })

        delete userData.confPassword

        return await registerUser(userData, UserType.NORMAL, res)
    }

    registerAdmin = async (req, res) => {
        const { userData } = req.body
        console.log(userData)

        if(!userData) return res
            .status(500)
            .json({ message: "Missing fields" })

        if(userData.password.trim() !== userData.confPassword.trim())
            return res
                .status(400)
                .json({ message: "The passwords don't match" })

        console.log(process.env.ADMIN_REGISTER_CODE)
        if(userData.adminCode !== process.env.ADMIN_REGISTER_CODE)
            return res
                .status(400)
                .json({ message: "Wrong admin code" })

        delete userData.confPassword
        delete userData.adminCode
        
        return await registerUser(userData, UserType.ADMIN, res)
    }

    registerSpecialist = async (req, res) => {
        const { userData } = req.body
        const emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@rasbet.com$/
        console.log(userData)

        if(!userData) return res
            .status(500)
            .json({ message: "Missing fields" })

        if(userData.password.trim() !== userData.confPassword.trim())
            return res
                .status(400)
                .json({ message: "The passwords don't match" })

        if(!emailRegex.test(userData.email.trim()))
            return res
                .status(400)
                .json({ message: "Invalid specialist email" })

        delete userData.confPassword
        
        return await registerUser(userData, UserType.SPECIALIST, res)
    }

    getAge = (date) => {
        var today = new Date();
        var birthDate = new Date(date);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
}

exports.AuthController = AuthController
