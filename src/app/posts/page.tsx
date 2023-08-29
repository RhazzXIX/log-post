"use client";
import { useState, useEffect } from "react";
import Loading from "@/component/Loading";
import BlogPosts from "@/component/BlogPosts";

export default function AllPosts() {
  const [blogPosts, setBlogPosts] = useState<IPost[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("http://localhost:3050/posts", {
          mode: "cors",
          credentials: "include",
        });
        if (response.ok) {
          const posts = await response.json();
          console.log(posts);
          setBlogPosts(posts);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <main>
      <BlogPosts posts={blogPosts} sortBy="latest" isMain={true} />
    </main>
  );
}
