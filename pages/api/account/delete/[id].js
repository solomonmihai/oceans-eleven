import { getSession } from "next-auth/client";
import User from "../../../../database/models/User";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(400).send({ message: "not logged in" });
  }

  if (req.method != "DELETE") {
    return res.status(400).send({ message: "must be a delete request" });
  }

  const { id } = session;

  await User.findOneAndUpdate(
    { id },
    {
      $pull: { accounts: { _id: req.query.id } },
    }
  );

  return res.status(200).send({ message: "success" });
}
