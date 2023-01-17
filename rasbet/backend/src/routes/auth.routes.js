const express = require('express')
const { AuthController } = require('../controller/auth.controller')

class AuthRouter {
    constructor() {
        this.router = express.Router()
        this.authController = new AuthController()

        this.router.post("/login", this.authController.login);
        this.router.post("/register", this.authController.register);
        this.router.post("/admin/register", this.authController.registerAdmin);
        this.router.post("/specialist/register", this.authController.registerSpecialist);
        this.router.get("/validateToken", [
            this.authController.validateJWT,
            this.authController.validateToken
        ]);
    }
}

exports.AuthRouter = AuthRouter