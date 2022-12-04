import User from "../../../models/User";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { email } = req.body;
    if (email) {
      const user = await User.findOne({ email });
      user.refreshToken = "";
      await user.save();
      res
        .status(204)
        .json({ message: "successfully deleted the refresh token" });
    }
  }
};

export default handler;
