import {
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Select,
  Text,
  ModalContent,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import CurrencyStore from "../../stores/CurrencyStore";

export default function ControlCenter() {
  const rates = CurrencyStore.useState((state) => Object.keys(state.rates));

  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [initialSum, setInitialSum] = useState(0);
  const [currency, setCurrency] = useState("USD");

  const createAccount = () => {
    const account = {
      name,
      initialSum,
      currency,
    };
    axios
      .post("/api/account", account)
      .then(() => closeModal())
      .catch((err) => console.log(err));
  };

  const closeModal = () => {
    setName("");
    setInitialSum(0);
    setModalOpen(false);
  };

  return (
    <>
      <Button colorScheme="pink" onClick={() => setModalOpen(true)}>
        Add new account
      </Button>
      <Modal isOpen={modalOpen} onClose={closeModal} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(4, auto)" gap="2">
              <GridItem colSpan="4">
                <Input
                  placeholder="name, ex: cash, savings, bank"
                  onChange={(ev) => setName(ev.target.value)}
                  value={name}
                />
              </GridItem>
              <GridItem colSpan="3">
                <Input
                  type="number"
                  placeholder="initial sum, defaults to 0"
                  onChange={(ev) => setInitialSum(ev.target.value)}
                  value={initialSum}
                />
              </GridItem>
              <GridItem colSpan="1">
                <Select
                  placeholder="currency"
                  value={currency}
                  onChange={(ev) => setCurrency(ev.target.value)}
                >
                  {rates.map((rate) => (
                    <option key={rate} value={rate}>
                      {rate}
                    </option>
                  ))}
                </Select>
              </GridItem>
              <GridItem colSpan="4">
                <Text color="gray.600">
                  it will be used to store money, after you create it you can add and remove money
                  from it etc..
                </Text>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={closeModal}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={createAccount}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
