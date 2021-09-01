import { getSession } from "next-auth/client";
import User from "../../database/models/User";
import connectDB from "../../middleware/mongodb";

const handler = async (req, res) => {
  if (req.method == "POST") {
    await handlePostReq(req, res);
  } else {
    res.status(400).send({ message: "must be a post request" });
  }
};

async function handlePostReq(req, res) {
  const session = await getSession({ req });

  if (!session) {
    // TODO: need to check this
    return res.status(400).send({ message: "not logged in" });
  }

  const { id } = session;

  const account = req.body;

  const user = await User.findOne({ id });

  if (user) {
    await user.update({
      $push: { accounts: account },
    });
  } else {
    const newUser = new User({ id, accounts: [] });

    await newUser.save();

    await newUser.update({
      $push: { accounts: account },
    });

    console.log("saved user");
  }

  res.status(200).send({ message: "success" });
}

export default connectDB(handler);
