import { Button, Flex, Spacer, HStack, Text, Image } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/client";

export default function NavBar() {
  const [session, loading] = useSession();

  return (
    <Flex
      as="nav"
      justify="space-between"
      pos="fixed"
      p="10px"
      left="0px"
      top="0px"
      width="100%"
      backgroundColor={session && "gray.800"}
      zIndex="100"
    >
      {session && (
        <HStack>
          <Image h="35" w="auto" borderRadius="lg" alt="user-image" src={session.user.image} />
          <Text fontWeight="bold">{session.user.name}</Text>
        </HStack>
      )}
      <Spacer />
      {!session && (
        <Button colorScheme="pink" onClick={() => signIn()}>
          Sign in
        </Button>
      )}
      {session && (
        <Button colorScheme="pink" onClick={() => signOut()}>
          Sign out
        </Button>
      )}
    </Flex>
  );
}
