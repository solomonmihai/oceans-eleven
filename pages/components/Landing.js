import { Container, Heading, Text } from "@chakra-ui/react";
import NavBar from "./Navbar";

export default function Landing() {
  return (
    <>
      <NavBar />
      <Container h="90vh">
        <Heading fontSize="9xl" color="pink.500">
          Ocean's Eleven
        </Heading>
        <Heading fontSize="4xl" color="pink.200">
          money management tool
        </Heading>

        <Text position="absolute" bottom="5" color="gray">
          Built with ❤️ by @mihaiSolomon
        </Text>
      </Container>
    </>
  );
}
