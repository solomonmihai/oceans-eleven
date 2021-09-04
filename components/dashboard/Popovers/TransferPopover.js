import {
  Text,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  PopoverHeader,
  PopoverFooter,
  useDisclosure,
  Box,
  Input,
} from "@chakra-ui/react";

import { useRef, useState } from "react";

import UserStore from "../../../stores/UserStore";

export default function TransferPopover({ currency, account, transfer, trigger }) {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const initialFocusRef = useRef();

  const accounts = UserStore.useState((state) => state.user.accounts).filter(
    (acc) => acc.currency.toLowerCase() == currency.toLowerCase() && acc._id != account._id
  );

  const [amount, setAmount] = useState(0);
  const [selected, setSelected] = useState(null);

  const closePopover = () => {
    onClose();
    setSelected(null);
    setAmount(0);
  };

  return (
    <Popover
      onOpen={onOpen}
      onClose={closePopover}
      isOpen={isOpen}
      initialFocusRef={initialFocusRef}
    >
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="bold">Transfer</PopoverHeader>
        <PopoverBody>
          <Text my="2">Amount: </Text>
          <Input
            ref={initialFocusRef}
            placeholder="amount"
            type="number"
            value={amount}
            onChange={(ev) => setAmount(ev.target.value)}
          />
          <Text my="2">Transfer to: </Text>
          {accounts.map((acc, index) => (
            <Box
              key={index}
              p="2"
              borderWidth="1px"
              borderRadius="lg"
              backgroundColor={selected == index ? "gray.600" : null}
              my="2"
              transition="0.3s ease all"
              _hover={{
                cursor: "pointer",
                backgroundColor: "gray.600",
              }}
              onClick={() => {
                if (index == selected) {
                  setSelected(null);
                } else {
                  setSelected(index);
                }
              }}
            >
              {acc.name}{" "}
              <Text display="inline" color="green.200" fontWeight="bold">
                {acc.sum}
              </Text>{" "}
              <b>{currency.toUpperCase()}</b>
            </Box>
          ))}
          <Text color="gray.500">you can only transfer to accounts with the same currency</Text>
        </PopoverBody>
        <PopoverFooter>
          <HStack>
            <Button w="100%" onClick={closePopover} variant="outline">
              Cancel
            </Button>
            <Button
              w="100%"
              colorScheme="red"
              disabled={selected == null || amount <= 0}
              onClick={() => {
                transfer(accounts[selected], amount);
                closePopover();
              }}
            >
              Transfer
            </Button>
          </HStack>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
