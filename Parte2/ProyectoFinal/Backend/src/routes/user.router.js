import { Router } from "express";
import * as controller from "../controllers/user.controller.js";
import passport from "passport";
import {authenticateCurrent, authenticateJWT} from "../middlewares/auth.js";
import { validate } from "../middlewares/validation.js";
import { authDto } from "../dtos/auth.dto.js";
import { createUserDTO } from "../dtos/createUserDto.js";



const router=Router()

router.post('/registerUser',controller.createUser)

router.post('/loginUser',validate(authDto),controller.loginUser)

router.post('/logout', controller.logout);

router.get('/current', authenticateCurrent, (req, res) => {
  try {
      const userDTO = createUserDTO(req.user);
      res.status(200).json(userDTO);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

router.get('/user',authenticateJWT,(req,res)=>{
    res.json(req.user)
})
export default router