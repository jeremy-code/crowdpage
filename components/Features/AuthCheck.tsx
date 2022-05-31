import { useContext } from "react";
import { UserContext } from "lib/context";
import Link from "next/link";

const AuthCheck = (props) => {
  const { username } = useContext(UserContext);

  return username
    ? props.children
    : props.fallback || (
        <Link href="/enter">
          <a>You must be signed in </a>
        </Link>
      );
};

export default AuthCheck;
