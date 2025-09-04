import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import { getMyProfile, editProfile, getProfileByUsername } from "../controller/Profile.controller.js"
import multer from "multer";
import path from "path";

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) =>
      cb(null, Date.now() + path.extname(file.originalname)),
  });
  const upload = multer({ storage });

// Private routes
router.get("/me", verifyJWT, getMyProfile);
router.post("/editprofile", verifyJWT, upload.single("profileimage"), editProfile);

// Public route
router.get("/:username", getProfileByUsername);

export default router;
