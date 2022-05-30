import React from "react";
import { Heading, Text } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

import { Card, Link } from "components/Misc";

const PostContent = ({ post }) => {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <Card>
      <Heading as="h3" size="md">
        {post.title}
      </Heading>
      <Text>Written by</Text>
      <Link href={`/${post.username}`}>@{post.username}</Link>
      <Text>on {createdAt.toLocaleDateString()}</Text>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </Card>
  );
};

export default PostContent;
