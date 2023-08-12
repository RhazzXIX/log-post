import Loading from "./Loading";
import Link from "next/link";

export default function BlogPosts({
  posts,
  sortBy,
}: {
  posts: IPost[];
  sortBy: string;
}) {
  let sortedPosts: IPost[] | undefined;
  if (sortBy === "latest") {
    sortedPosts = [...posts].sort((a, b) => {
      if (a.publishedDate && b.publishedDate) {
        if (a.publishedDate > b.publishedDate) return -1;
        if (a.publishedDate < b.publishedDate) return 1;
        if (a.publishedDate === b.publishedDate) return 0;
      }
      if (a.publishedDate && b.publishedDate === undefined) return -1;
      if (a.publishedDate === undefined && b.publishedDate) return 1;
      return 0;
    });
  } else if (sortBy === "popular") {
    sortedPosts = [...posts]
      .sort((a, b) => {
        if (a.totalComments > b.totalComments) return -1;
        if (a.totalComments < b.totalComments) return 1;
        return 0;
      })
      .slice(0, 6);
  }

  console.log(sortedPosts);

  return (
    <ul>
      {sortedPosts && sortedPosts.length > 0 ? (
        sortedPosts.map((posts) =>
          posts.content.length > 0 ? (
            <li key={posts._id}>
              <Link href={`/post/${posts._id}`}>{posts.content[0].title}</Link>
            </li>
          ) : null
        )
      ) : (
        <Loading />
      )}
    </ul>
  );
}
