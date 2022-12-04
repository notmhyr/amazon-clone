import User from "../../../models/User";
import jwt from "jsonwebtoken";

const createAccessToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const createRefreshToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: "1y" });
};

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create token
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();
    res.status(200).json({ name: user.name, email, accessToken, refreshToken });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export default handler;
