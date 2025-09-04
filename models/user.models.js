import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String },
    website: { type: String },
    bio: { type: String, maxlength: 200 },
    gender: { type: String, enum: ["male", "female", "other", ""] },
    profileimage: { type: String, default: "/profile_image.svg" }
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;