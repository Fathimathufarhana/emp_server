import { check } from "express-validator";
import express from "express";
import { login } from "../controllers/userController.js";
import authCheck from "../middlewares/authCheck.js";

const router = express.Router()

router.post( '/login',
[
    check('email').not().isEmpty(),
    check('password').not().isEmpty()
], login);

router.use(authCheck);


export default router
