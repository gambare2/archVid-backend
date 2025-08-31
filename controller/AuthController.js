import bcrypt from "bcrypt";
import UserModal from "../db/user.js";
import jwt from "jsonwebtoken";

const register = async (req, res,) => {

    // check if user already exist or not 
    try {
        const userexist = await UserModal.findOne({ $or: [{ email }, { phoneno }] });
        if (userexist) {
            return res.status(409).json({
                message: "User already exist login",
                success: false,
                redirectToLogin: true
            })
        }
        // hash password
        const salt = await bcrypt.genSalt(10);

        // match hash password to the real password 
        const hashedpasssowrd= await bcrypt.hash(password, salt);


        // save new user in Database
        const newuser = new UserModal({
            email,
            phoneno,
            password: hashedpasssowrd,
        })

        await newuser.save();

        // send message 
        res.status(201).json({
            message: "User created successfully",
            success: true

        });


    } catch (error) {
        console.error("[REGISTER ERROR]", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}






export default register;