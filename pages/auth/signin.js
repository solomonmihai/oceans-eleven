import { getProviders, signIn } from "next-auth/client";
import { Button, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function SignIn({ providers }) {
  const {
    query: { callbackUrl },
  } = useRouter();

  return (
    <Container display="flex" justifyContent="center" mt="25%">
      {Object.values(providers).map((provider) => (
        <Button
          key={provider.name}
          colorScheme="pink"
          onClick={() => signIn(provider.id, { callbackUrl })}
        >
          Sign in with {provider.name}
        </Button>
      ))}
    </Container>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
