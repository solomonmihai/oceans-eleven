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
} from "@chakra-ui/react";

export default function DeletePopover({ deleteAcc, trigger }) {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Popover onOpen={onOpen} onClose={onClose} isOpen={isOpen}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="bold">Delete account?</PopoverHeader>
        <PopoverBody>
          <Text>Are you sure you want to delete this account?</Text>
        </PopoverBody>
        <PopoverFooter>
          <HStack>
            <Button w="100%" onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              w="100%"
              colorScheme="red"
              onClick={() => {
                deleteAcc();
                onClose();
              }}
            >
              Delete
            </Button>
          </HStack>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
