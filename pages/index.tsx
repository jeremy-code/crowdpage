import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button, useToast, Text } from "@chakra-ui/react";

import { firestore, fromMillis, postToJSON } from "lib/firebase";
import { PostFeed } from "components/Features";
import { Metatags } from "components/Misc";

const LIMIT = 4;

export async function getServerSideProps() {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);
  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

const Home = (props) => {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (postsEnd == true) {
      toast({
        title: "No more posts",
        description: "You have reached the end of the posts",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [postsEnd, toast]);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];
    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;
    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);
    const newPosts = (await query.get()).docs.map((doc) => doc.data());
    setPosts(posts.concat(newPosts));
    setLoading(false);
    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <>
      <Metatags title="Home" />
      <PostFeed posts={posts} />
      {!postsEnd && (
        <Button
          onClick={getMorePosts}
          isLoading={loading}
          loadingText="Loading"
          mt={4}
        >
          Load More
        </Button>
      )}
      {postsEnd && <Text mt={4}>You have reached the end of the posts</Text>}
    </>
  );
};

export default Home;
