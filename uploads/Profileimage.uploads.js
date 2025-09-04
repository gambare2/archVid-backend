import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

app.post("/api/profile/upload", upload.single("profileimage"), (req, res) => {
  const fileUrl = `${import.meta.env.VITE_API_URL}/uploads/${req.file.filename}`
  // `http://localhost:3000/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});
