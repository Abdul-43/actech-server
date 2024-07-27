import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token1 = authHeader && authHeader.split(' ')[1];
  const token = token1 === undefined ? authHeader : token1;

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error.message)
    res.status(401).json({ error: 'Token is not valid' });
  }
};

export default auth;
