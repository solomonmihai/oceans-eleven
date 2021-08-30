import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "next-auth/client";

const config = {
  initialColorMode: "dark",
};

const theme = extendTheme({ config });

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
