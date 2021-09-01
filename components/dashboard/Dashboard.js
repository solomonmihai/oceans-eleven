import { Box, Flex } from "@chakra-ui/react";

import NavBar from "../Navbar";
import AccountList from "./AccountList";
import ControlCenter from "./ControlCenter";
import Wallet from "./Wallet";

export default function Dashboard() {
  return (
    <>
      <NavBar />

      <Flex p="5" m="5" flexDir="column">
        <ControlCenter />
        <AccountList />
      </Flex>
    </>
  );
}
