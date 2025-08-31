import mongoose from "mongoose";
import { Schema } from "mongoose";


const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const UserModal = mongoose.model('User', UserSchema);

export default UserModal;