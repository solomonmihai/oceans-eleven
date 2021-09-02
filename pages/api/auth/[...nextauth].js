import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import User from "../../../database/models/User";
import mongoose from "mongoose";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  database: process.env.DATABASE_AUTH_URL,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    session: async (session, user) => {
      session.id = user.id;

      if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.DATABASE_DATA_URL, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        });
      }

      return Promise.resolve(session);
    },
    signIn: async (user, account, profile) => {
      await mongoose.connect(process.env.DATABASE_DATA_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });

      const existingUser = await User.findOne({ id: user.id });
      if (!existingUser) {
        const newUser = new User({ id: user.id, accounts: [] });
        await newUser.save();
      }
    },
  },
});
