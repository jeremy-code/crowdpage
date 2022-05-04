import { Center, Img, Text, Heading } from "@chakra-ui/react";

import Link from "./Link";

const UserProlife = ({ user }) => {
  return (
    <Center flexDir="column">
      <Img src={user.photoURL} alt={user.username} borderRadius="full" />
      <Text as="i">
        @<Link href={`/${user.username}`}>{user.username}</Link>
      </Text>
      <Heading as="h3" size="lg" mt={4}>
        {user.displayName}
      </Heading>
    </Center>
  );
};

export default UserProlife;
