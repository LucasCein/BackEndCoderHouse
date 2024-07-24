import { Router } from "express";
import * as controller from "../controllers/user.controller.js";
import passport from "passport";
import {authenticateCurrent} from "../middlewares/auth.js";
const router=Router()
router.get('/registerUser',controller.getRegister)
router.post('/registerUser',controller.createUser)

router.post('/loginUser',controller.loginUser)

router.get('/login',controller.getLogin)


router.post('/logout', controller.logout);


router.get('/current', authenticateCurrent , (req, res) => {
    res.status(200).json(req.user);
  });

export default router