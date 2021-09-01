import { Box, Text, Heading, GridItem, Grid } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AccountList() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios.get("/api/accounts").then((res) => {
      setAccounts(res.data.accounts);
    });
  }, []);

  if (accounts.length == 0) {
    return null;
  }

  return (
    <Box>
      {accounts.map(({ name, currency, sum }) => (
        <Box p="3" borderWidth="1px" m="2" borderRadius="lg">
          <Grid templateColumns="repeat(4, auto)">
            <GridItem colSpan="3">
              <Text fontWeight="bold" fontSize="2em">
                {name}
              </Text>
            </GridItem>
            <GridItem colSpan="1">
              <Grid templateRows="repeat(2, auto)" textAlign="right">
                <GridItem>
                  <Text fontWeight="bold" color="pink.200">
                    {sum}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text color="gray.500">{currency}</Text>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
