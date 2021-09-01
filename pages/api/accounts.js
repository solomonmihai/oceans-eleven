import { getSession } from "next-auth/client";
import User from "../../database/models/User";
import connectDB from "../../middleware/mongodb";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(400).send({ message: "not logged in" });
  }

  const { id } = session;

  const user = await User.findOne({ id });

  if (!user) {
    return res.status(200).send({ message: "first time using app" });
  }

  const accounts = user.accounts;

  return res.status(200).send({ accounts });
};

export default connectDB(handler);
