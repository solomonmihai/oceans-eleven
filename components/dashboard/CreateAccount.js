import {
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
import { useRef, useState } from "react";
import CurrencyStore from "../../stores/CurrencyStore";
import UserStore from "../../stores/UserStore";

export default function CreateAccount() {
  const rates = CurrencyStore.useState((state) => Object.keys(state.rates));

  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [sum, setSum] = useState(0);
  const [currency, setCurrency] = useState("USD");

  const initialFocusRef = useRef();

  const createAccount = () => {
    const account = {
      name,
      sum: sum,
      currency,
    };
    axios
      .post("/api/account/new", account)
      .then(() => {
        closeModal();
        UserStore.update((state) => {
          state.needsUpdate = true;
        });
      })
      .catch((err) => console.log(err));
  };

  const closeModal = () => {
    setName("");
    setSum(0);
    setModalOpen(false);
  };

  return (
    <>
      <Button variant="outline" colorScheme="pink" w="100%" onClick={() => setModalOpen(true)}>
        Create account
      </Button>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        motionPreset="slideInBottom"
        initialFocusRef={initialFocusRef}
      >
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
                  ref={initialFocusRef}
                />
              </GridItem>
              <GridItem colSpan="3">
                <Input
                  type="number"
                  placeholder="initial sum, defaults to 0"
                  onChange={(ev) => setSum(ev.target.value)}
                  value={sum}
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
            <Button variant="outline" mr={3} onClick={closeModal}>
              Cancel
            </Button>
            <Button colorScheme="pink" onClick={createAccount}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
