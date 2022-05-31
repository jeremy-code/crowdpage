import { useContext } from "react";
import NextLink from "next/link";
import {
  Container,
  Button,
  Heading,
  Circle,
  Icon,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import { AiOutlineShareAlt } from "react-icons/ai";

import { UserContext } from "lib/context";
import { Link } from "components/Misc";

const Navbar = () => {
  const { user, username } = useContext(UserContext);

  return (
    <Container
      maxW="container.xl"
      d="flex"
      justifyContent="space-between"
      py={8}
    >
      <Flex align="center" gap={[2, 4]}>
        <Link href="/" _hover={{ textDecor: "none" }}>
          <Circle size="40px" bg="purple.500" color="white">
            <Icon as={AiOutlineShareAlt} boxSize="25px" />
          </Circle>
        </Link>
        <Link href="/" _hover={{ textDecor: "none" }}>
          <Heading as="h4" size="md">
            crowdpage
          </Heading>
        </Link>
      </Flex>

      {/* if user is signed in and has username */}
      {username && user && (
        <Flex as="nav" align="center" gap={[2, 8]}>
          <NextLink href="/admin" passHref>
            <Button colorScheme="purple">Write Posts</Button>
          </NextLink>
          <Link href={`/${username}`}>
            <Avatar src={user.photoURL} size="sm" />
          </Link>
        </Flex>
      )}

      {/* if user is not signed OR has no created username */}
      {!username && (
        <Flex as="nav" align="center" gap={[2, 8]}>
          <NextLink href="/enter" passHref>
            <Button colorScheme="purple">Login</Button>
          </NextLink>
        </Flex>
      )}
    </Container>
  );
};

export default Navbar;
