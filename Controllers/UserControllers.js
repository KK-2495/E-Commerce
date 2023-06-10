import Users from "../Models/Users.js";
import { v4 as uuidv4 } from "uuid";

import encrypt from "encryptjs";

export const register = async (req, res) => {
  try {
    const { name, email, number, plaintext } = req.body;
    if (!name) return res.send("Name is required.");
    if (!email) return res.send("Email is required.");
    if (!number) return res.send("Number is required.");
    if (!password) return res.send("Password is required.");

    const response = await Users.find({ email }).exec();
    if (response.length) return res.send("You are already registered");

    const emailCode = uuidv4();
    const numCode = uuidv4();
    const user = new Users({
      name,
      email,
      number,
      password,
      emailOtp: emailCode,
      numberOtp: numCode,
    });
    await user.save();
    return res.send("Check your email and phone for OTP");
  } catch (error) {
    return res.send(error);
  }
};

export const registerCheck = async (req, res) => {
  const { email, number, emailOTP, numberOTP } = req.body;
  if (!email) return res.send("email is red");
  if (!number) return res.send("Number is required");
  if (!emailOTP) return res.send("OTP is required");
  if (!numberOTP) return res.send("OTP is required");

  const response = await Users.find({ email, number }).exec();
  if (response[0].emailOtp == emailOTP && response[0].numberOtp == numberOTP) {
    return res.send("You are now Registered & OTP Verifed successfully");
  } else {
    return res.send("incorrect OTP");
  }
};

export const emailLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.send("email is required");
    if (!password) return res.send("Password is required");

    const response = await Users.find({ email }).exec();

    if (response[0].email == email && response[0].password == password) {
      return res.send("Youre are Logged In now.");
    } else {
      return res.send("check your credentials");
    }
  } catch (error) {
    return res.send(error);
  }
};

export const registerEncrypt = async (req, res) => {
  try {
    const { name, email, number, plaintext } = req.body;

    const response = await Users.find({ email }).exec();
    if (response.length) return res.send("You are already registered.");
    var secretkey = "ios";
    var cipherText = encrypt.encrypt(plaintext, secretkey, 256);
    console.log(cipherText);
    const user = new Users({
      name,
      email,
      number,
      password: cipherText,
    });
    await user.save();
    return res.send("registered succesfully.");
  } catch (error) {
    return res.send(error);
  }
};

export const encryptLogin = async (req,res) => {
    try {
        const {email, password} = req.body;
        const response = await Users.find({email}).exec();
        var cipherText = response[0].password;
        var secretkey = "ios";
        var decipher = encrypt.decrypt(cipherText,secretkey,256);
        console.log(decipher);
        if(decipher == password){
            return res.send("Youre Logged In.");
        }else{
            return res.send("credentials are incorrect.");
        }
    } catch (error) {
        return res.send(error);
    }
}