import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  // console.log("🔎 Auth Header:", authHeader);
  // console.log("🔎 Received Auth Header:", req.headers.authorization);

  
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  
  const token = authHeader.split(" ")[1];
  // console.log("🔎 Extracted Token:", token);
  
  

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT Verify Error:", err.message);
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
  
    console.log("✅ Decoded JWT:", decoded);
    req.user = { id: decoded.id };
    next();
  });
};

export default verifyJWT;
