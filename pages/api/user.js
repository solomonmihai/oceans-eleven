import { getSession } from "next-auth/client";
import User from "../../database/models/User";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(400).send({ message: "not logged in" });
  }

  const { id } = session;

  const user = await User.findOne({ id });

  return res.status(200).send({ user });
}
