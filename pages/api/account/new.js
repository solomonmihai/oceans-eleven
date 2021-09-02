import { getSession } from "next-auth/client";
import User from "../../../database/models/User";

export default async function (req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(400).send({ message: "not logged in" });
  }

  if (req.method != "POST") {
    return res.status(400).send({ message: "must be a post request" });
  }

  const { id } = session;

  const account = req.body;

  await User.findOneAndUpdate(
    { id },
    {
      $push: { accounts: account },
    }
  );

  res.status(200).send({ message: "success" });
}
