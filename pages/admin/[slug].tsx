import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { useDocumentData } from "react-firebase-hooks/firestore";
import {
  Flex,
  Box,
  useToast,
  Button,
  Heading,
  Checkbox,
  Textarea,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { Metatags, Card, Link } from "components/Misc";
import { firestore, auth, serverTimestamp } from "lib/firebase";
import { AuthCheck, ImageUploader } from "components/Features";

const PostManager = () => {
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  const postRef = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts")
    .doc(slug as string);
  const [post] = useDocumentData(postRef as any);

  return (
    <>
      {post && (
        <Flex gap={8}>
          <Metatags title={post.title} />
          <Card flex="2">
            <Box>
              <Heading as="h4" size="md">
                {post.title}
              </Heading>
              <Link href={`/${post.username}/${post.slug}`}>/{post.slug}</Link>
            </Box>
            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </Card>
          <Card flex="1" h="fit-content">
            <Heading as="h4" size="md">
              Tools
            </Heading>
            <Button onClick={() => setPreview(!preview)} colorScheme="purple">
              {preview ? "Edit" : "Preview"}
            </Button>
            <NextLink href={`/${post.username}/${post.slug}`} passHref>
              <Button>Live view</Button>
            </NextLink>
          </Card>
        </Flex>
      )}
    </>
  );
};

type FormValues = {
  defaultValues: any;
  postRef: any;
  preview: boolean;
};

const PostForm = ({ defaultValues, postRef, preview }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<any>({
    defaultValues,
    mode: "onChange",
  });
  const toast = useToast();

  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    });
    reset({ content, published });
    toast({
      title: "Post updated",
      description: "Your post has been updated",
      status: "success",
    });
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <>
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </>
      )}
      <Box d={preview ? "none" : "flex"} flexDir="column" gap={8}>
        <ImageUploader />
        <Textarea
          {...register("content", {
            maxLength: { value: 20000, message: "Post is too long" },
            minLength: { value: 10, message: "Post is too short" },
            required: { value: true, message: "Post is required" },
          })}
        />
        {errors.content && <p>{errors.content.message}</p>}
        <Checkbox {...register("published")}>Publish</Checkbox>
        <Button type="submit" disabled={!isDirty || !isValid}>
          Save Changes
        </Button>
      </Box>
    </form>
  );
};

const AdminPostEdit = () => {
  return (
    <>
      <AuthCheck>
        <PostManager />
      </AuthCheck>
    </>
  );
};

export default AdminPostEdit;
