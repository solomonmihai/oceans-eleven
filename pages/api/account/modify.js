import { getSession } from "next-auth/client";
import User from "../../../database/models/User";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(400).send({ message: "not logged in" });
  }

  if (req.method != "POST") {
    return res.status(400).send({ message: "must be a post request" });
  }

  const { id } = session;

  const accountId = req.body.id;
  const newSum = req.body.newSum;

  await User.findOneAndUpdate(
    { id, accounts: { $elemMatch: { _id: accountId } } },
    {
      $set: {
        "accounts.$.sum": newSum,
      },
    }
  );

  res.status(200).send({ message: "success" });
}
