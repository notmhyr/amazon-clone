import jwt from "jsonwebtoken";
import User from "../../../models/User";
import db from "../../../utils/db";
const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).json({ error: "request is not post" });
    return;
  }

  if (!req.body.token && !req.body.email)
    res.status(400).json({ error: "token and email is required" });
  try {
    const { token, email } = req.body;
    await db.connect();
    const user = await User.findOne({ email });
    if (user.refreshToken !== token)
      res
        .status(400)
        .json({ error: "UnAuthorized", message: "not match to db" });
    const { _id } = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
    const accessToken = jwt.sign({ _id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    await db.disconnect();
    res.status(200).json({ accessToken });
  } catch (error) {
    console.log("error in the refresh token: " + error);
    res.status(403).json({ error: "UnAuthorized" });
  }
};

export default handler;
