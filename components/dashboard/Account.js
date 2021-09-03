import { Box, Text, GridItem, Grid, HStack, IconButton } from "@chakra-ui/react";
import axios from "axios";
import { MdDelete, MdAdd, MdRemove, MdSwapHoriz } from "react-icons/md";
import UserStore from "../../stores/UserStore";
import DeletePopover from "./Popovers/DeletePopover";
import SumPopover from "./Popovers/SumPopover";

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
                <IconButton variant="outline" icon={<MdSwapHoriz />} />
                <DeletePopover
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
              {sum}
            </Text>
            <Text color="gray.500">{currency}</Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
