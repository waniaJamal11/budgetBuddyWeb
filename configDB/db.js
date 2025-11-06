import mongoose from "mongoose";

async function connectDB(url) {
    try{
        await mongoose.connect(url);
        console.log("DB connected successfully!");
    }
    catch(error){
        console.log(`error:${error.message}`);
    }
}
export default connectDB;