import { Box, Text, GridItem, Grid, HStack, IconButton } from "@chakra-ui/react";
import axios from "axios";
import { MdDelete, MdAdd, MdSwapHoriz } from "react-icons/md";

import UserStore from "../../stores/UserStore";
import AnimatedNumber from "./AnimatedNumber";
import DeletePopover from "./Popovers/DeletePopover";
import SumPopover from "./Popovers/SumPopover";
import TransferPopover from "./Popovers/TransferPopover";

export default function Account({ account }) {
  const { name, currency, sum } = account;

  return (
    <Box p="3" borderWidth="1px" my="2" borderRadius="lg">
      <Grid templateColumns="repeat(3, auto)">
        <GridItem colSpan="2">
          <Grid templateRows="repeat(2, auto)">
            <GridItem colSpan="2">
              <Text fontWeight="bold" fontSize="1.6em">
                {name}
              </Text>
            </GridItem>
            <GridItem>
              <HStack>
                <SumPopover
                  sum={sum}
                  modifySum={(modifier) =>
                    axios
                      .post("/api/account/modify", {
                        // the + sign converts from string to number
                        newSum: Number(+sum + +modifier),
                        id: account._id,
                      })
                      .then(() => {
                        UserStore.update((state) => {
                          state.needsUpdate = true;
                        });
                      })
                  }
                  trigger={<IconButton variant="outline" icon={<MdAdd />} />}
                />
                <TransferPopover
                  account={account}
                  currency={account.currency}
                  transfer={(toAcc, amount) => {
                    axios
                      .post("/api/account/modify", {
                        newSum: Number(+sum - +amount),
                        id: account._id,
                      })
                      .then(() => {
                        axios.post("/api/account/modify", {
                          newSum: Number(+toAcc.sum + +amount),
                          id: toAcc._id,
                        });
                      })
                      .then(() => {
                        UserStore.update((state) => {
                          state.needsUpdate = true;
                        });
                      });
                  }}
                  trigger={
                    <IconButton variant="outline" icon={<MdSwapHoriz />} onClick={() => {}} />
                  }
                />
                <DeletePopover
                  currency={account.currency}
                  deleteAcc={() => {
                    axios.delete(`/api/account/delete/${account._id}`).then(() =>
                      UserStore.update((state) => {
                        state.needsUpdate = true;
                      })
                    );
                  }}
                  trigger={<IconButton variant="outline" icon={<MdDelete />} onClick={() => {}} />}
                />
              </HStack>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem colSpan="1">
          <Box textAlign="right" py="2">
            <Text fontWeight="bold" color="green.200" fontSize="1.5em">
              <AnimatedNumber value={sum} duration={3500} />
            </Text>
            <Text color="gray.500">{currency}</Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
