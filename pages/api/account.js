import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    console.log(session);
  }

  if (req.method == "POST") {
    res.status(200).send({ message: "success" });
  } else {
    res.status(400).send({ message: "must be a post request" });
  }
}
