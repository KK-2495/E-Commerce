import express from "express";
import morgan from "morgan";
import router from "./Routes/AllRoutes.js";
import mongoose from "mongoose";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v2',router);

mongoose.connect('mongodb+srv://Krish24:Krish%402495@cluster0.s8xz5ha.mongodb.net/e-Commerce?retryWrites=true&w=majority')
.then(()=>console.log("DB Connected")).catch((error)=>console.log(error));

app.listen(3000, ()=>console.log("Working on Port 3000!"));