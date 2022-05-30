import { Flex } from "@chakra-ui/react";

import { UserProfile, PostFeed } from "components/Features";
import { Metatags } from "components/Misc";
import { getUserWithUsername, postToJSON } from "lib/firebase";
getUserWithUsername;

export async function getServerSideProps({ query }) {
  const { username } = query;
  const userDoc = await getUserWithUsername(username);

  // If the user doesn't exist, redirect to 404
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializiable data
  let user = null;
  let posts = null;
  if (userDoc) {
    user = userDoc.data();
    const postQuery = userDoc.ref
      .collection("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(5);
    posts = (await postQuery.get()).docs.map(postToJSON);

    return {
      props: { user, posts },
    };
  }
}

const UserProfilePage = ({ user, posts }) => {
  return (
    <Flex gap={8} flexDir="column">
      <Metatags title={user.username} />
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </Flex>
  );
};

export default UserProfilePage;
