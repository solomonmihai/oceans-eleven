import { Button, HStack, Spacer, Text, Image } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/client";

export default function NavBar() {
  const [session, loading] = useSession();

  return (
    <HStack p="2">
      {session && (
        <>
          <Image h="35" w="auto" borderRadius="lg" alt="user-image" src={session.user.image} />
          <Text fontWeight="bold">{session.user.name}</Text>
        </>
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
    </HStack>
  );
}
