import bcrypt from "bcrypt";
import UserModal from "../db/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    console.log("📦 Incoming body:", req.body);

    const { email, phoneno, password } = req.body;

    if ((!email && !phoneno) || !password) {
      return res.status(400).json({
        message: "Password and either email or phone number are required",
        success: false,
      });
    }


    const userexist = await UserModal.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phoneno ? [{ phoneno }] : []),
      ],
    });

    if (userexist) {
      return res.status(409).json({
        message: "User already exists, please login",
        success: false,
        redirectToLogin: true,
      });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newuser = new UserModal({
      email: email || null,
      phoneno: phoneno || null,
      password: hashedPassword,
    });

    await newuser.save();

    const token = jwt.sign(
      { id: newuser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User created successfully",
      success: true,
      token, 
      user: {
        id: newuser._id,
        email: newuser.email,
        phoneno: newuser.phoneno,
      },
    });

  } catch (error) {
    console.error("[REGISTER ERROR]", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};


export const login = async (req, res) => {
  try {
    const { phonenoOremail, password } = req.body;
    const errorMessage = "Invalid Email/Phoneno. or password";
    console.log('[LOGIN ATTEMPT]', { phonenoOremail });

    const user = await UserModal.findOne({
      $or: [
        { email: phonenoOremail },
        { phoneno: phonenoOremail }   
      ]
    });

    if (!user) {
      console.log("[LOGIN ERROR] User not found:", phonenoOremail);
      return res.status(403).json({ message: errorMessage, success: false });
    }

    const isPassValid = await bcrypt.compare(password, user.password);
    console.log("[LOGIN DEBUG] Password match:", isPassValid);

    if (!isPassValid) {
      console.log("[LOGIN ERROR] Incorrect password for user:", phonenoOremail);
      return res.status(403).json({ message: errorMessage, success: false });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        phoneno: user.phoneno,
      },
    });

  } catch (error) {
    console.error('[LOGIN EXCEPTION]', error);
    res.status(500).json({ message: "Internal server error" });
  }
};
