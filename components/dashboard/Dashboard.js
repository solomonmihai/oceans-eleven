import { Box, Flex } from "@chakra-ui/react";

import NavBar from "../Navbar";
import ControlCenter from "./ControlCenter";
import Wallet from "./Wallet";

export default function Dashboard() {
  return (
    <>
      <NavBar />

      <Flex p="5" m="5">
        <ControlCenter />
      </Flex>
    </>
  );
}
