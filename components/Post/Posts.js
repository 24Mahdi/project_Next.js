"use client";
import { Flex, Spin, Typography } from "antd";
import React, { useEffect } from "react";
import Post from "./Post";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyPostsFeed, getPosts } from "@/actions/post";
import { useInView } from "react-intersection-observer";

const Posts = ({ id = "all" }) => {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["posts", id],
    queryFn: ({ pageParam = "" }) =>
      id === "all" ? getMyPostsFeed(pageParam) : getPosts(pageParam, id),
    getNextPageParam: (lastPage) => {
      return lastPage?.metaData?.lastCursor;
    },
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  const checkLastViewRef = (index, page) => {
    if (index === page.data.length - 1) {
      return true;
    } else return false;
  };

  if (error) {
    return <Typography>لقد حدث خطأ ما</Typography>;
  }

  if (isLoading) {
    return (
      <Flex vertical align="center" gap={"large"}>
        <Spin />
        <Typography>انتظر...</Typography>
      </Flex>
    );
  }

  if (isSuccess) {
    return (
      <Flex vertical gap={"1rem"}>
        {data?.pages?.map((page) =>
          page?.data?.map((post, index) =>
            checkLastViewRef(index, page) ? (
              <div ref={ref} key={post?.id}>
                <Post data={post} queryId={id} />
              </div>
            ) : (
              <div key={post?.id}>
                <Post data={post} queryId={id} />
              </div>
            )
          )
        )}

        {(isLoading || isFetchingNextPage || isFetching) && (
          <Flex vertical align="center" gap={"large"}>
            <Spin />
            <Typography>انتظر...</Typography>
          </Flex>
        )}
      </Flex>
    );
  }
};

export default Posts;