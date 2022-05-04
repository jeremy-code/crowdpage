import { Divider, Flex, Box } from "@chakra-ui/react";

const Card = ({ children }: { children: React.ReactNode }) => {
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

const CardBody = ({ children }: { children: React.ReactNode }) => {
  return <Box flexGrow={1}>{children}</Box>;
};

const CardFooter = ({ children }: { children: React.ReactNode }) => {
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
