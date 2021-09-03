import {
  Text,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Input,
  Button,
  PopoverHeader,
  PopoverFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

export default function SumPopover({ sum, modifySum, trigger }) {
  const focusRef = useRef();
  const [val, setVal] = useState(0);

  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Popover initialFocusRef={focusRef} onOpen={onOpen} onClose={onClose} isOpen={isOpen}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="bold">Modify sum</PopoverHeader>
        <PopoverBody>
          <Input
            ref={focusRef}
            placeholder="amount"
            onChange={(ev) => setVal(ev.target.value)}
            value={val}
            type="number"
          />
          {val != 0 && (
            <Text my="2" color="gray.400">
              Account's sum after modification will be {+sum + +val}
            </Text>
          )}
        </PopoverBody>
        <PopoverFooter>
          <HStack>
            <Button w="100%" onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              w="100%"
              colorScheme="pink"
              onClick={() => {
                modifySum(val);
                onClose();
              }}
            >
              Confirm
            </Button>
          </HStack>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
