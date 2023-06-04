import Users from "../Models/Users.js";

export const addProduct = async (req,res) => {
    try {
        const { email,productName, productPrice,productCategory, productImage} = req.body;
        if(!email) return res.send("Email is required");
        if(!productName) return res.send("Product Name is required");
        if(!productPrice) return res.send("Product price is required");
        if(!productCategory) return res.send("Product category is required");
        if(!productImage) return res.send("Product Image is required");

        const response = await Users.findOne({email}).exec();

        // const userId = response[0]?._id;
        const addProduct = {
            productName,productPrice, productCategory, productImage
        };
        response.products.push(addProduct);
        // await Users.findOneAndUpdate({_id:userId},{products}).exec();
        await response.save();
        return res.send("Products added successfully");
    } catch (error) {
        return res.send(error);
    }
}


export const emptyList = async (req,res) => {
    try {
        const {email} = req.body;
        if(!email) return res.send("Email is required");

        const response = await Users.findOne({email}).exec();
        if(response){
            response.products = undefined;
            await response.save();
            return res.send("products Cleared");
        }else{
            return res.send("user not found");
        }
    } catch (error) {
        return res.send(error);
    }
}