import verifyToken from "../utils/verifyToken.js";

export const checkLoggedIn = async (req, res, next) => {
  const token = await req.cookies.accessToken;
  if (!token) {
    res.status(401).json({ message: "token not found" });
  } else {
    const verifyTokenResult = await verifyToken(token);
    if (verifyTokenResult) {
      req.email = verifyTokenResult.email;
      next();
    } else {
      res.status(401).json({ message: "Token not matched" });
    }
  }
};
