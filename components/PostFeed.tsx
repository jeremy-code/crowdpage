import Link from "next/link";
import { Link as CLink, Text, Flex, Box } from "@chakra-ui/react";

import Loader from "./Loader";
import Card from "./Card";

const PostItem = ({ post, admin = false }) => {
  const wordCount = post?.content?.trim().split(/\+/g).length;
  const minutesToRead = (wordCount / 200).toFixed(0);

  return (
    <Card>
      <Card.Body>
        <Box>
          <Link href={`/${post.username}/${post.slug}`} passHref>
            <CLink fontSize="2xl">{post.title}</CLink>
          </Link>
        </Box>
        <Box>
          <Text>
            Submitted by @
            <Link href={`/${post.username}`} passHref>
              <CLink fontSize="sm">{post.username}</CLink>
            </Link>
          </Text>
        </Box>
      </Card.Body>
      <Card.Footer>
        <Flex justify="space-between">
          <Flex gap={2}>
            <Text>{wordCount} words</Text>
            <Text>•</Text>
            <Text>
              {minutesToRead} {minutesToRead === "1" ? "minute" : "minutes"} to
              read
            </Text>
          </Flex>
          <Text>❤️️ {post.heartCount} hearts</Text>
        </Flex>
      </Card.Footer>
    </Card>
  );
};

const PostFeed = ({ posts, admin = false }) => {
  return posts ? (
    <Flex gap={4} flexDir="column">
      {posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))}
    </Flex>
  ) : (
    <Loader show={true} />
  );
};

export default PostFeed;
