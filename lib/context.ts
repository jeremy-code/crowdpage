import { createContext } from "react";

type userType = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
};

export const UserContext = createContext({ user: null, username: null } as {
  user: userType | null;
  username: string | null;
});
