import { ChakraProvider, Container } from "@chakra-ui/react";

import "../styles/globals.css";
import { useUserData } from "../lib/hooks";
import { UserContext } from "../lib/context";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <ChakraProvider>
        <Navbar />
        <Container as="main" maxW="container.xl">
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
