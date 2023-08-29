import Loading from "./Loading";
import Link from "next/link";

export default function BlogPosts({
  posts,
  sortBy,
  isMain,
}: {
  posts: IPost[];
  sortBy: string;
  isMain: boolean;
}) {
  let sortedPosts: IPost[] | undefined;
  let limit = isMain ? posts.length : 5 ;
  if (sortBy === "latest") {
    sortedPosts = [...posts]
      .sort((a, b) => {
        if (a.publishedDate && b.publishedDate) {
          if (a.publishedDate > b.publishedDate) return -1;
          if (a.publishedDate < b.publishedDate) return 1;
          if (a.publishedDate === b.publishedDate) return 0;
        }
        if (a.publishedDate && b.publishedDate === undefined) return -1;
        if (a.publishedDate === undefined && b.publishedDate) return 1;
        return 0;
      })
      .slice(0, limit);
  } else if (sortBy === "popular") {
    sortedPosts = [...posts]
      .sort((a, b) => {
        if (a.totalComments > b.totalComments) return -1;
        if (a.totalComments < b.totalComments) return 1;
        return 0;
      })
      .slice(0, limit);
  }

  return (
    <ul>
      {sortedPosts && sortedPosts.length > 0 ? (
        sortedPosts.map((post) =>
          post.content.length > 0 ? (
            <li key={post._id}>
              <Link href={`/posts/${post._id}`}>{post.content[0].title}</Link>
            </li>
          ) : null
        )
      ) : (
        <Loading />
      )}
      {isMain === false && (
        <li>
          <Link href={"/posts"}>View all posts</Link>
        </li>
      )}
    </ul>
  );
}
