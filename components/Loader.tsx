import { Spinner } from "@chakra-ui/react";

const Loader = ({ show }: { show: boolean }) => {
  return show ? <Spinner emptyColor="gray.200" /> : null;
};

export default Loader;
