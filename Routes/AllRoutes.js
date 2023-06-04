import express from "express";
import { emailLogin, register, registerCheck } from "../Controllers/UserControllers.js";
import { addProduct, emptyList } from "../Controllers/ProductControllers.js";

const router = express.Router();

router.post('/register', register);
router.post('/register-check', registerCheck);
router.post('/email-login', emailLogin);
router.post('/add-product', addProduct);
router.post('/empty-list', emptyList);


export default router;