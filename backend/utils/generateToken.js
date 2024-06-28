import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, name: user.name, id: user._id },
    "secretKey"
  );
};

export default generateToken;
