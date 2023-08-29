import { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: { postId: string } },
): Promise<Metadata> {
  // read route params
  const { postId } = params;

  // fetch data
  const post = await fetch(`http://localhost:3050/posts/${postId}`,{
    mode: "cors",
    credentials: "include",
  }).then((res) => res.json())
  .then(post => {
    console.log(post, 'test')
    return post
  });

  const title = post.content? post.content[0].title : 'Log Post';

  return {
    title,
  };
}

export default function BlogPostLayout ({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    {children}
    </>
  );
}