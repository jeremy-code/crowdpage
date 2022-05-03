import { Divider, Flex, Box } from "@chakra-ui/react";

type BodyComponent = React.FunctionComponent;
type CardComponent = React.FunctionComponent & { body: BodyComponent };

const Card = ({ children }) => {
  return (
    <Flex
      flexDir="column"
      borderRadius="md"
      border="1px"
      borderColor="gray.200"
      p={8}
      gap={4}
      w="full"
    >
      {children}
    </Flex>
  );
};

const CardBody = ({ children }) => {
  return <Box flexGrow={1}>{children}</Box>;
};

const CardFooter = ({ children }) => {
  return (
    <>
      <Divider />
      {children}
    </>
  );
};

export default Card;
Card.Body = CardBody;
Card.Footer = CardFooter;
