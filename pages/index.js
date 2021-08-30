import { useSession } from "next-auth/client";
import Dashboard from "./components/dashboard/Dashboard";
import Landing from "./components/Landing";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
      {!session && <Landing />}
      {session && <Dashboard />}
    </>
  );
}
