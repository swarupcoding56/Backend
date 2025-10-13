import jwt from "jsonwebtoken"

export const jwtMiddleware = (req, res, next) => {
  const authorization = req.headers['authorization'];
  if (!authorization) {
    return res.status(403).json({ message: "Not authorized" });
  }

  // Expected format: "Bearer <token>"
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token not valid" });
  }

  try {
    const decoded = jwt.verify(token, "secret_key");
    req.user = decoded; // attach user info to request
    next(); // ✅ important
  } catch (err) {
    return res.status(401).json({ message: "Token verification failed", error: err.message });
  }
};

export const generatetoken=(userdata)=>{
  return   jwt.sign(userdata,"secret_key",{expiresIn:"2000m"})
}