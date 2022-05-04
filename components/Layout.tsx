import { Container } from "@chakra-ui/react";

import Navbar from "components/Navbar";
import Footer from "components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container as="main" maxW="container.xl" flex="1 0 auto">
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
