import { Container } from "@chakra-ui/react";

import { Navbar, Footer } from "components/Layout";

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
