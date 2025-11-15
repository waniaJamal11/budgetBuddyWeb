import mongoose from "mongoose";

const dataType = {
    type: String,
    required: true
}
const userSchema = new mongoose.Schema({
    name: dataType,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: dataType,
}, { timestamps: true });
const userModel = mongoose.model("user", userSchema);
export default userModel;