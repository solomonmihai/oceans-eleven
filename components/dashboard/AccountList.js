import { Box, Text } from "@chakra-ui/react";
import Account from "./Account";
import CreateAccount from "./CreateAccount";
import UserStore from "../../stores/UserStore";

export default function AccountList() {
  const accounts = UserStore.useState((state) => state.user.accounts);

  return (
    <Box>
      <CreateAccount />
      {accounts && accounts.length == 0 && (
        <Text textAlign="center" my="3" fontSize="1.5em" color="gray.500">
          You don't have any accounts yet, press the button above to create one
        </Text>
      )}
      {accounts.map((account, index) => (
        <Account key={index} account={account} />
      ))}
    </Box>
  );
}
