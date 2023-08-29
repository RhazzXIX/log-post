"use client";
import Loading from "@/component/Loading";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Post({ params }: { params: { postId: string } }) {
  const [blogPost, setBlogPosts] = useState<IPost>();
  const { postId } = params;
  useEffect(() => {
    (async function () {
      const response = await fetch(`http://localhost:3050/posts/${postId}`, {
        mode: "cors",
        credentials: "include",
      });
      if (response.ok) {
        const post = await response.json();
        setBlogPosts(post);
      }
    })();
  }, [postId]);
  console.log(blogPost?.content[0].text);
  return (
    <main>
      {blogPost ? (
        <article>
          {blogPost.content[0].headerImg && (
            <Image
              alt=""
              src={`data:${
                blogPost.content[0].headerImg.contentType
              };base64,${Buffer.from(
                blogPost.content[0].headerImg.data
              ).toString("base64")}`}
              width={0}
              height={0}
              style={{ width: "500px", height: "auto" }}
            />
          )}
          <h1>{blogPost.content[0].title}</h1>
          <p>{JSON.stringify(blogPost.content[0].text).slice(1, -1)}</p>
        </article>
      ) : (
        <Loading />
      )}
    </main>
  );
}
