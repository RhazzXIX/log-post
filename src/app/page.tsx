"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import BlogPosts from "@/component/BlogPosts";
import headerImage from "../../public/images/simon-richardo-logpose2.jpg";
import Image from "next/image";

export default function Home() {
  const [blogPosts, setBlogPosts] = useState<IPost[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("http://localhost:3050/posts", {
          mode: "cors",
          credentials: 'include',
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
    <>
      <main className={styles.main}>
        <Image src={headerImage} alt="" />
        <p>Hello Up-skilling World!</p>
      </main>
      <aside>
        <h2>Popular posts</h2>
        <BlogPosts posts={blogPosts} sortBy={"popular"} isMain={false} />
      </aside>
      <section>
        <h2>Blog Posts</h2>
        <BlogPosts posts={blogPosts} sortBy={"latest"} isMain={false} />
      </section>
    </>
  );
}
