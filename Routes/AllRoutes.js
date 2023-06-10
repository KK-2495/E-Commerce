import express from "express";
import { emailLogin, encryptLogin, register, registerCheck, registerEncrypt } from "../Controllers/UserControllers.js";
import { addProduct, emptyList } from "../Controllers/ProductControllers.js";

const router = express.Router();

router.post('/register', register);
router.post('/register-check', registerCheck);
router.post('/email-login', emailLogin);
router.post('/add-product', addProduct);
router.post('/empty-list', emptyList);
router.post('/register-encrypt', registerEncrypt);
router.post('/login-encrypt', encryptLogin);


export default router;