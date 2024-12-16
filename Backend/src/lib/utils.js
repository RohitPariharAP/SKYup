import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //for miliseconds.
    httpOnly: true, //client-side script can't access the cookie  , prevent XSS attacks cross-site scripting attacks
    secure: process.env.NODE_ENV !== "development", //only send the cookie over HTTPS when in production environment
    sameSite: "strict", //only send the cookie if the request is made from the same origin as the domain
  });

  return token;
};
