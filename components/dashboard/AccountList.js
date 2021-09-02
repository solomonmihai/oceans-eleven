import { Box, Text, Heading, GridItem, Grid } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Account from "./Account";
import UserStore from "../../stores/UserStore";

export default function AccountList() {
  const accounts = UserStore.useState((state) => state.user.accounts);

  return (
    <Box>
      {accounts.map((account, index) => (
        <Account key={index} account={account} />
      ))}
    </Box>
  );
}
