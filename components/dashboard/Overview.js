import {
  Box,
  SimpleGrid,
  Grid,
  GridItem,
  Spinner,
  Text,
  Flex,
  Spacer,
  Link,
} from "@chakra-ui/react";
import WalletPie from "./charts/WalletPie";

import CurrencyStore from "../../stores/CurrencyStore";
import UserStore from "../../stores/UserStore";

export default function Overview({ setTabIndex }) {
  const accounts = UserStore.useState((state) => state.user.accounts);
  const rates = CurrencyStore.useState((state) => state.rates);

  const data = accounts.map((acc) => acc.sum / rates[acc.currency.toUpperCase()]);
  const labels = accounts.map((acc) => acc.name);

  if (!accounts) {
    return <Spinner />;
  }

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 2 }}
      p="7"
      m="2"
      columnGap="10"
      borderWidth="1px"
      borderRadius="lg"
    >
      <Flex flexDir="column" mr="7">
        <Text fontSize="4xl" fontWeight="bold" color="pink.200" mb="5">
          Accounts overview
        </Text>
        {accounts.map((acc, index) => (
          <Grid templateColumns="repeat(4, auto)" fontSize="1.3em" fontWeight="bold" key={index}>
            <GridItem colSpan="3">{acc.name}</GridItem>
            <GridItem textAlign="right">
              <Text as="span" color="green.200">
                {acc.sum}
              </Text>{" "}
              <Text as="span" color="gray.500" fontWeight="normal">
                {acc.currency}
              </Text>
            </GridItem>
          </Grid>
        ))}
        <Spacer />
        <Link color="gray.500" onClick={() => setTabIndex(1)}>View accounts</Link>
      </Flex>
      <Box position="relative">
        <WalletPie data={data} labels={labels} total={100} />
      </Box>
    </SimpleGrid>
  );
}
