import { ChakraProvider } from "@chakra-ui/react";

import { useUserData } from "lib/hooks";
import { UserContext } from "lib/context";
import React from "react";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <ChakraProvider>{children}</ChakraProvider>
    </UserContext.Provider>
  );
};

export default AppProvider;
