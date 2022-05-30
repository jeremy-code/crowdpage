import { useDocumentData } from "react-firebase-hooks/firestore";
import { Text } from "@chakra-ui/react";

import { PostContent } from "../../components/Features";
import { firestore, getUserWithUsername, postToJSON } from "../../lib/firebase";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

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
      <PostContent post={post} />
      <Text>{post.heartCount || 0} hearts</Text>
    </>
  );
};

export default PostPage;
