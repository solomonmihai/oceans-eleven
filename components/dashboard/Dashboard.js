import { Box, Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

import NavBar from "../Navbar";
import AccountList from "./AccountList";
import CreateAccount from "./CreateAccount";
import Wallet from "./Wallet";
import UserStore from "../../stores/UserStore";

export default function Dashboard() {
  const needsUpdate = UserStore.useState((state) => state.needsUpdate);

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!needsUpdate) {
      return;
    }

    console.log("updated user");
    axios.get("/api/user").then((res) => {
      UserStore.update((state) => {
        state.user = res.data.user;
        state.needsUpdate = false;
      });
      setUser(res.data.user);
    });
  }, [needsUpdate]);

  if (!user) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
      <NavBar />

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} p="3" spacing="10" mt="55px">
        <GridItem>
          <CreateAccount />
          <AccountList />
        </GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
      </SimpleGrid>
    </>
  );
}
