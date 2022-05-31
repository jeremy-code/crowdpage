import { useDocumentData } from "react-firebase-hooks/firestore";
import { Text, Flex, Button } from "@chakra-ui/react";

import Link from "next/link";
import { PostContent, AuthCheck, HeartButton } from "components/Features";
import { firestore, getUserWithUsername, postToJSON } from "lib/firebase";
import { Metatags, Card } from "components/Misc";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;
  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);
    post = postToJSON(await postRef.get());
    path = postRef.path;
  }
  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  const snapshot = await firestore.collectionGroup("posts").get();
  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

const PostPage = (props) => {
  const postRef = firestore.doc(props.path);
  const [realTimePost] = useDocumentData(postRef);

  const post = realTimePost || props.post;

  return (
    <>
      <Metatags title={post.title} />
      <Flex gap={8}>
        <PostContent post={post} />
        <Card h="fit-content" flexShrink={4}>
          <Text>{post.heartCount + " hearts" || "0 hearts"}</Text>
          <AuthCheck
            fallback={
              <Link href="/enter" passHref>
                <Button>💗 Sign Up</Button>
              </Link>
            }
          >
            <HeartButton postRef={postRef} />
          </AuthCheck>
        </Card>
      </Flex>
    </>
  );
};

export default PostPage;
