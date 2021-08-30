import { Button, HStack, Spacer } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/client";

export default function NavBar() {
  const [session, loading] = useSession();

  return (
    <HStack p="2">
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
