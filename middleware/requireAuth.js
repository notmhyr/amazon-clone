import Jwt from "jsonwebtoken";
import User from "../models/User";
import db from "../utils/db";
const requireAuth = (handler) => {
  return async (req, res) => {
    //verify authentication

    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: "Authorization is required" });
    }

    const token = authorization.split(" ")[1];

    try {
      const { _id } = Jwt.verify(token, process.env.JWT_SECRET);
      await db.connect();
      const user = await User.findOne({ _id }).select("_id");
      if (!user) {
        return res
          .status(401)
          .json({ error: "the user belonging to this token no longer exist" });
      }

      req.user = user;

      return handler(req, res);
    } catch (error) {
      console.log(error.message);
      res
        .status(403)
        .json({ message: "Request is not authorized", error: error.message });
    }
  };
};

export default requireAuth;
