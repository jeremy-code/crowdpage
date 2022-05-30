import { Heading, Button } from "@chakra-ui/react";

import { Link } from "components/Misc";

const NotFound = () => {
  return (
    <>
      <Heading>That page does not seem to exist...</Heading>
      <Link href="/">
        <Button mt={4}>Go home</Button>
      </Link>
    </>
  );
};

export default NotFound;
