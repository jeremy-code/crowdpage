import { Heading, Button } from "@chakra-ui/react";

import { Link, Metatags } from "components/Misc";

const NotFound = () => {
  return (
    <>
      <Metatags title="404" />
      <Heading>That page does not seem to exist...</Heading>
      <Link href="/">
        <Button mt={4}>Go home</Button>
      </Link>
    </>
  );
};

export default NotFound;
