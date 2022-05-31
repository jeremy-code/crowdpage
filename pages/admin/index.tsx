import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import kebabCase from "lodash.kebabCase";
import {
  useToast,
  Box,
  Heading,
  Input,
  FormControl,
  FormHelperText,
  Button,
  FormLabel,
} from "@chakra-ui/react";

import { Metatags } from "components/Misc";
import { AuthCheck, PostFeed } from "components/Features";
import { UserContext } from "lib/context";
import { firestore, auth, serverTimestamp } from "lib/firebase";

const PostList = () => {
  const ref = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts");
  const query = ref.orderBy("createdAt");
  const [querySnapshot] = useCollection(query as any);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <Heading as="h2" size="xl" mb={8}>
        Manage your Posts
      </Heading>
      <PostFeed posts={posts} admin />
    </>
  );
};

const CreateNewPost = () => {
  const router = useRouter();
  const toast = useToast();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const slug = encodeURI(kebabCase(title));
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("posts")
      .doc(slug);

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# hello world!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await ref.set(data);
    toast({
      title: "Post created",
      description: "You can now edit your post",
    });
    router.push(`/admin/${slug}`);
  };

  return (
    <Box mt={8}>
      <form onSubmit={createPost}>
        <FormControl>
          <FormLabel>Create a new post</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            maxW="lg"
          />
          <FormHelperText>Slug: {slug}</FormHelperText>
        </FormControl>
        <Button colorScheme="purple" type="submit" disabled={!isValid} mt={4}>
          Create New Post
        </Button>
      </form>
    </Box>
  );
};

const AdminPostsPage = () => {
  return (
    <AuthCheck>
      <Metatags title="Admin Posts" />
      <PostList />
      <CreateNewPost />
    </AuthCheck>
  );
};

export default AdminPostsPage;
