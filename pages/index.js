import { useSession } from "next-auth/client";
import Dashboard from "../components/dashboard/Dashboard";
import Landing from "../components/Landing";
import Head from "next/head";
import axios from "axios";
import { useEffect } from "react";
import CurrencyStore from "../stores/CurrencyStore";
import UserStore from "../stores/UserStore";

export default function Home() {
  const [session, loading] = useSession();

  const rates = CurrencyStore.useState((state) => state.rates);

  useEffect(() => {
    axios.get("https://api.exchangerate.host/latest?base=usd").then((res) => {
      CurrencyStore.update((state) => {
        state.rates = res.data.rates;
      });
    });
  }, []);

  if (!rates) {
    return <h1>loading</h1>;
  }

  return (
    <>
      <Head>
        <title>{session ? "Dashboard" : "Ocean's Eleven"}</title>
      </Head>
      {!session && <Landing />}
      {session && <Dashboard />}
    </>
  );
}
