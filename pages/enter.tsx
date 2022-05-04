import { useContext, useState, useEffect, useMemo } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import debounce from "lodash.debounce";

import { auth, firestore, googleAuthProvider } from "lib/firebase";
import { UserContext } from "lib/context";

const SignInButton = () => {
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button leftIcon={<FcGoogle />} onClick={signInWithGoogle}>
      Sign in with Google
    </Button>
  );
};

const SignOutButton = () => {
  return (
    <Button
      colorScheme="purple"
      onClick={() => {
        auth.signOut();
      }}
    >
      Sign Out
    </Button>
  );
};

const UsernameForm = () => {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, username } = useContext(UserContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }
    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  const checkUsername = useMemo(
    () =>
      debounce(async (username: string) => {
        if (username.length >= 3) {
          const ref = firestore.doc(`users/${username}`);
          const { exists } = await ref.get();
          console.log("Firestore read executed!");
          setIsValid(!exists);
          setLoading(false);
        }
      }, 500),
    []
  );

  useEffect(() => {
    checkUsername(formValue);
  }, [checkUsername, formValue]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    // Commit both docs to firestore as a batch write
    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });
    await batch.commit();
    console.log("Firestore write executed!");
  };

  return (
    !username && (
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={!isValid && formValue != ""}>
          <FormLabel>Select a username</FormLabel>
          <Input value={formValue} onChange={onChange} />
          <FormHelperText>
            {UsernameMessage({ username: formValue, isValid, loading })}
          </FormHelperText>
        </FormControl>

        <Button
          type="submit"
          colorScheme="purple"
          isLoading={loading}
          disabled={!isValid || loading}
          mt={4}
        >
          Submit
        </Button>
      </form>
    )
  );
};

type UsernameMessageProps = {
  username: string;
  isValid: boolean;
  loading: boolean;
};

const UsernameMessage = ({
  username,
  isValid,
  loading,
}: UsernameMessageProps) => {
  if (loading) {
    return "Loading...";
  } else if (isValid) {
    return "Username is available!";
  } else if (username && !isValid) {
    return "Username is taken!";
  } else {
    return "";
  }
};

const EnterPage = () => {
  const { user, username } = useContext(UserContext);

  return (
    <>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </>
  );
};

export default EnterPage;
