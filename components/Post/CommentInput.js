import { Avatar, Button, Flex, Input } from "antd";
import React, { useEffect, useState } from "react";
import Iconify from "../Iconify";
import { addComment } from "@/actions/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

const CommentInput = ({ postId, setExpanded, queryId }) => {
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { isPending, mutate } = useMutation({
    mutationFn: (postId) => addComment(postId, value),
    onMutate: async () => {
      setExpanded(true);
      await queryClient.cancelQueries(["posts", queryId]);
      const previousPosts = queryClient.getQueryData(["posts", queryId]);
      queryClient.setQueryData(["posts", queryId], (old) => {
        return {
          ...old,
          pages: old.pages.map((page) => {
            return {
              ...page,
              data: page.data.map((post) => {
                if (post.id === postId) {
                  return {
                    ...post,
                    comments: [
                      ...post.comments,
                      {
                        comment: value,
                        authorId: user?.id,
                        author: {
                          first_name: user?.firstName,
                          last_name: user?.lastName,
                          image_url: user?.imageUrl,
                        },
                      },
                    ],
                  };
                } else {
                  return post;
                }
              }),
            };
          }),
        };
      });

      return { previousPosts };
    },
    onError: (err, variables, context) => {
      toast.error("Something wrong happened. Try again!");
      queryClient.setQueryData(["posts"], context.previousPosts);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
      setValue("");
    },
  });

  return (
    <Flex gap={"1rem"} align="center">
      <Avatar src={user?.imageUrl} size={40} style={{ minWidth: "40px" }} />
      <Input.TextArea
        disabled={isPending}
        placeholder={"اكتب التعليق..."}
        style={{ resize: "none" }}
        autoSize={{ minRows: 1, maxRows: 5 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <Button
        type="primary"
        onClick={() => mutate(postId)}
        disabled={isPending}
      >
        <Iconify icon="iconamoon:send-fill" width="1.2rem" />
      </Button>
    </Flex>
  );
};

export default CommentInput;
