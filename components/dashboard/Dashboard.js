import { Box, Flex, GridItem, SimpleGrid, Spinner } from "@chakra-ui/react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!needsUpdate) {
      return;
    }

    setLoading(true);

    axios.get("/api/user").then((res) => {
      UserStore.update((state) => {
        state.user = res.data.user;
        state.needsUpdate = false;
      });
      setUser(res.data.user);
      setLoading(false);
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

      {loading && (
        <Box
          width="100vw"
          height="100vw"
          backgroundColor="rgba(0, 0, 0, 0.3)"
          position="fixed"
          zIndex="1000"
          top="0"
          left="0"
        >
          <Spinner position="fixed" top="25%" left="48%" size="xl" />
        </Box>
      )}
    </>
  );
}
