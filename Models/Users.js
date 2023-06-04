import mongoose from "mongoose";

import { Schema } from "mongoose";
import { stringify } from "uuid";
import { object } from "webidl-conversions";

const product = new Schema({
    productName: String,
    productPrice: Number,
    productCategory: String,
    productImage: String
});
const user = new Schema ({
    name: String,
    email: String,
    number: Number,
    password: String,
    emailOtp: String,
    numberOtp: String,
    products: [product]
})

export default mongoose.model("user", user);