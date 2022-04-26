import React from "react";
import Link from "next/link";
import {
  Container,
  Button,
  Heading,
  Circle,
  Icon,
  Flex,
  Avatar,
  Link as CLink,
} from "@chakra-ui/react";
import { AiOutlineShareAlt } from "react-icons/ai";

const Navbar = () => {
  const user = null;
  const username = null;

  return (
    <Container
      maxW="container.xl"
      d="flex"
      justifyContent="space-between"
      py={8}
    >
      <Flex align="center" gap={4}>
        <Circle size="40px" bg="purple.500" color="white">
          <Icon as={AiOutlineShareAlt} boxSize="25px" />
        </Circle>
        <Link href="/" passHref>
          <CLink _hover={{ textDecor: "none" }}>
            <Heading as="h4" size="md">
              Social Media App
            </Heading>
          </CLink>
        </Link>
      </Flex>

      {/* if user is signed in and has username */}
      {username && (
        <Flex align="center" gap={8}>
          <Link href="/admin" passHref>
            <Button as={CLink} colorScheme="purple">
              Write Posts
            </Button>
          </Link>
          <Link href={`/${username}`} passHref>
            <Avatar as={CLink} />
          </Link>
        </Flex>
      )}

      {/* if user is not signed OR has no created username */}
      {!username && (
        <Flex align="center" gap={8}>
          <Link href="enter" passHref>
            <Button as={CLink} colorScheme="purple">
              Login
            </Button>
          </Link>
        </Flex>
      )}
    </Container>
  );
};

export default Navbar;
