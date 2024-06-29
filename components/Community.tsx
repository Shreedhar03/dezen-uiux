import { useState } from "react";
import Image from "next/image";

interface Post {
  user: string;
  profilePicture: string;
  message: string;
  likes: number;
  dislikes: number;
  bookmarks: number;
}

const Community = ({ posts, user }: { posts: Post[]; user: string }) => {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const userPosts = posts.filter((post) => post.user === user);

  const handleReplyToggle = (index: number) => {
    if (replyingTo === index) {
      setReplyingTo(null); // Hide reply bar if already open
    } else {
      setReplyingTo(index); // Show reply bar for selected post
    }
  };

  const handleReplyPost = (index: number, replyMessage: string) => {
    // Handle reply submission logic here
    console.log(`Replying to post ${index} with message: ${replyMessage}`);
    // Example: Implement your reply submission logic here
    setReplyingTo(null); // Close reply bar after submission
  };

  const handleLike = (index: number) => {
    // Handle like button click
    console.log(`Liked post ${index}`);
    // Example: Implement your like button logic here
  };

  const handleDislike = (index: number) => {
    // Handle dislike button click
    console.log(`Disliked post ${index}`);
    // Example: Implement your dislike button logic here
  };

  return (
    <div className="min-h-screen mt-36 flex flex-col md:flex-row font-sans text-gray-200">
      <div className="flex-1 p-5 overflow-y-auto">
        <div className="text-3xl mb-4 font-extrabold text-purple-400">
          Your Posts
        </div>
        <div className="space-y-8">
          {userPosts.map((post, index) => (
            <div
              key={index}
              className="relative p-4 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <Image
                    src={post.profilePicture}
                    alt={`${post.user} profile`}
                    width={48}
                    height={48}
                    className="rounded-full mr-4 border-2 border-purple-400"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg text-purple-300">
                    {post.user}
                  </p>
                  <p className="text-gray-300">{post.message}</p>
                  <div className="mt-4 flex flex-wrap space-x-2 text-purple-400">
                    <button
                      className="flex items-center space-x-1 text-sm hover:text-purple-300 transition-colors duration-200"
                      onClick={() => handleReplyToggle(index)}
                    >
                      <span className="text-lg">🎤</span>
                      <span>Reply</span>
                    </button>
                    <button
                      className="flex items-center space-x-1 text-sm hover:text-purple-300 transition-colors duration-200"
                      onClick={() => handleLike(index)}
                    >
                      <span className="text-lg">👍</span>
                      <span>{post.likes}</span>
                    </button>
                    <button
                      className="flex items-center space-x-1 text-sm hover:text-purple-300 transition-colors duration-200"
                      onClick={() => handleDislike(index)}
                    >
                      <span className="text-lg">👎</span>
                      <span>{post.dislikes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm hover:text-purple-300 transition-colors duration-200">
                      <span className="text-lg">💿</span>
                      <span>{post.bookmarks}</span>
                    </button>
                  </div>
                  {replyingTo === index && (
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Reply..."
                        className="w-36 p-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                      <button
                        className="mt-2 bg-purple-600 text-white px-2 py-1 rounded-lg text-sm hover:bg-purple-500 transition-colors duration-200"
                        onClick={() =>
                          handleReplyPost(index, "Sample reply message")
                        }
                      >
                        Send
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
