import jwt from "jsonwebtoken";

//cretaing Authendiacation Middleware for Authendicate
const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    //check token is provided are not
    if (!token) {
      return res
        .status(400)
        .send({ Message: "Access Denied,No token Provided" });
    }

    //if token is provided verify and then pass
    jwt.verify(token, process.env.SECRET_KEY, (error, validToken) => {
      if (error) {
        return res.status(400).send({ Message: "Invalid Token" });
      } else {
        next();
      }
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export { auth };
