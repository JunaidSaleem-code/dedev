import PostCard from './PostCard';

export default function PostList({ posts }) {
  if (!posts.length) return <div>No posts yet.</div>;
  return (
    <ul className="list-none p-0 mt-8 max-w-2xl w-full">
      {posts.map(post => <PostCard key={post._id} post={post} />)}
    </ul>
  );
} 