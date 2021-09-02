import {
  Box,
  Text,
  Heading,
  GridItem,
  Grid,
  HStack,
  Icon,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import { MdDelete, MdAdd, MdRemove, MdSwapHoriz } from "react-icons/md";
import UserStore from "../../stores/UserStore";

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
                <IconButton
                  backgroundColor="transparent"
                  borderWidth="1px"
                  icon={<MdAdd />}
                  onClick={() => {
                    axios
                      .post("/api/account/change", { id: account._id, newSum: sum - 100 })
                      .then(() =>
                        UserStore.update((state) => {
                          state.needsUpdate = true;
                        })
                      );
                  }}
                />
                <IconButton backgroundColor="transparent" borderWidth="1px" icon={<MdRemove />} />
                <IconButton
                  backgroundColor="transparent"
                  borderWidth="1px"
                  icon={<MdSwapHoriz />}
                />
                <IconButton
                  backgroundColor="transparent"
                  borderWidth="1px"
                  icon={<MdDelete />}
                  onClick={() => {
                    axios.delete(`/api/account/delete/${account._id}`).then(() =>
                      UserStore.update((state) => {
                        state.needsUpdate = true;
                      })
                    );
                  }}
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
