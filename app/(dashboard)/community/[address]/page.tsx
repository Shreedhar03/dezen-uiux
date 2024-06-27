"use client";

import { useState, ChangeEvent, useRef } from "react";
import Image from "next/image";

interface Post {
  user: string;
  profilePicture: string;
  message: string;
  image?: string;
  likes: number;
  dislikes: number;
  bookmarks: number;
  replies?: Post[];
}

interface CoinHolder {
  user: string;
  profilePicture: string;
  online: boolean;
}

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      user: "Alice",
      profilePicture: "https://robohash.org/asna",
      message: "Hey, how are you doing?",
      likes: 10,
      dislikes: 2,
      bookmarks: 5,
    },
    {
      user: "Bob",
      profilePicture: "https://robohash.org/asacsa",
      message: "I am doing great! How about you?",
      likes: 5,
      dislikes: 1,
      bookmarks: 2,
    },
    {
      user: "Charlie",
      profilePicture: "https://robohash.org/sacs",
      message: "Just finished a project, feeling good.",
      image: "https://picsum.photos/600/400",
      likes: 20,
      dislikes: 3,
      bookmarks: 10,
    },
    {
      user: "David",
      profilePicture: "https://robohash.org/acneoiq",
      message: "Congrats, Charlie!",
      likes: 7,
      dislikes: 0,
      bookmarks: 3,
    },
    {
      user: "Eve",
      profilePicture: "https://robohash.org/snjc",
      message: "Anyone up for a game tonight?",
      image: "https://picsum.photos/600/400",
      likes: 15,
      dislikes: 2,
      bookmarks: 6,
    },
    {
      user: "Frank",
      profilePicture: "https://robohash.org/frank",
      message: "Count me in!",
      likes: 8,
      dislikes: 1,
      bookmarks: 4,
    },
    {
      user: "Grace",
      profilePicture: "https://robohash.org/grace",
      message: "I might join later.",
      likes: 6,
      dislikes: 1,
      bookmarks: 2,
    },
    {
      user: "Heidi",
      profilePicture: "https://robohash.org/heidi",
      message: "Let’s plan it out.",
      likes: 9,
      dislikes: 2,
      bookmarks: 3,
    },
    {
      user: "Ivan",
      profilePicture: "https://robohash.org/ivan",
      message: "Can’t wait for the weekend.",
      likes: 12,
      dislikes: 1,
      bookmarks: 5,
    },
    {
      user: "Judy",
      profilePicture: "https://robohash.org/judy",
      message: "Me too!",
      likes: 11,
      dislikes: 0,
      bookmarks: 4,
    },
  ]);
  const [coinHolders, setCoinHolders] = useState<CoinHolder[]>([
    {
      user: "Alice",
      profilePicture: "https://robohash.org/asna",
      online: true,
    },
    {
      user: "Bob",
      profilePicture: "https://robohash.org/asacsa",
      online: false,
    },
    {
      user: "Charlie",
      profilePicture: "https://robohash.org/sacs",
      online: true,
    },
    {
      user: "David",
      profilePicture: "https://robohash.org/acneoiq",
      online: false,
    },
    { user: "Eve", profilePicture: "https://robohash.org/snjc", online: true },
    {
      user: "Frank",
      profilePicture: "https://robohash.org/frank",
      online: false,
    },
    {
      user: "Grace",
      profilePicture: "https://robohash.org/grace",
      online: true,
    },
    {
      user: "Heidi",
      profilePicture: "https://robohash.org/heidi",
      online: false,
    },
    { user: "Ivan", profilePicture: "https://robohash.org/ivan", online: true },
    {
      user: "Judy",
      profilePicture: "https://robohash.org/judy",
      online: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [newImage, setNewImage] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyMessage, setReplyMessage] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sortedCoinHolders = [...coinHolders].sort(
    (a, b) => b.online - a.online
  );

  const handleSendPost = () => {
    if (newMessage.trim() === "" && !newImage) return;
    setPosts([
      ...posts,
      {
        user: "You",
        profilePicture: "https://robohash.org/you",
        message: newMessage,
        image: newImage || undefined,
        likes: 0,
        dislikes: 0,
        bookmarks: 0,
      },
    ]);
    setNewMessage("");
    setNewImage(null);
  };

  const handleReplyPost = (index: number) => {
    if (replyMessage.trim() === "") return;
    const updatedPosts = [...posts];
    if (!updatedPosts[index].replies) {
      updatedPosts[index].replies = [];
    }
    updatedPosts[index].replies!.push({
      user: "You",
      profilePicture: "https://robohash.org/you",
      message: replyMessage,
      likes: 0,
      dislikes: 0,
      bookmarks: 0,
    });
    setPosts(updatedPosts);
    setReplyingTo(null);
    setReplyMessage("");
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLike = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts[index].likes += 1;
    setPosts(updatedPosts);
  };

  const handleDislike = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts[index].dislikes += 1;
    setPosts(updatedPosts);
  };

  const handleBookmark = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts[index].bookmarks += 1;
    setPosts(updatedPosts);
  };
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans bg-gray-900 text-gray-200 mt-[1900px] sm:mt-0">
      <div className="chat-box flex-1 p-5 overflow-y-auto">
        <div className="text-3xl mb-4 font-extrabold text-purple-400">
          Posts
        </div>
        <div className="space-y-8">
          {posts.map((post, index) => (
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
                  {post.image && (
                    <Image
                      src={post.image}
                      alt="Post image"
                      width={600}
                      height={400}
                      className="mt-2 rounded-lg"
                    />
                  )}
                  {post.replies &&
                    post.replies.map((reply, replyIndex) => (
                      <div
                        key={replyIndex}
                        className="ml-4 mt-2 flex bg-gray-700 p-2 rounded-lg"
                      >
                        <div className="flex-shrink-0">
                          <Image
                            src={reply.profilePicture}
                            alt={`${reply.user} profile`}
                            width={32}
                            height={32}
                            className="rounded-full mr-2 border-2 border-purple-400"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-purple-300">
                            {reply.user}
                          </p>
                          <p className="text-gray-300">{reply.message}</p>
                        </div>
                      </div>
                    ))}
                  <div className="mt-4 flex flex-wrap gap-6 text-purple-400">
                    <button
                      className="flex items-center hover:text-purple-300 transition-colors duration-200"
                      onClick={() => handleLike(index)}
                    >
                      <span className="text-lg">🎵</span>
                      <span>{post.likes}</span>
                    </button>
                    <button
                      className="flex items-center hover:text-purple-300 transition-colors duration-200"
                      onClick={() => handleDislike(index)}
                    >
                      <span className="text-lg">🎸</span>
                      <span>{post.dislikes}</span>
                    </button>
                    <button
                      className="flex items-center hover:text-purple-300 transition-colors duration-200"
                      onClick={() => setReplyingTo(index)}
                    >
                      <span className="text-lg">🎤</span>
                      <span>{post.replies ? post.replies.length : 0}</span>
                    </button>
                    <button
                      className="flex items-center hover:text-purple-300 transition-colors duration-200"
                      onClick={() => handleBookmark(index)}
                    >
                      <span className="text-lg">💿</span>
                      <span>{post.bookmarks}</span>
                    </button>
                  </div>
                  {replyingTo === index && (
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Drop a funky reply..."
                        className="w-full p-3 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                      />
                      <button
                        className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-colors duration-200"
                        onClick={() => handleReplyPost(index)}
                      >
                        Groove It
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 relative">
          <div className="flex items-center bg-gray-800 rounded-lg">
            <input
              type="text"
              placeholder="What's the buzz?"
              className="flex-grow p-3 bg-transparent text-gray-200 focus:outline-none"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              onClick={triggerFileInput}
              className="p-3 text-purple-400 hover:text-purple-300 transition-colors duration-200"
            >
              📎
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
          <button
            className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-colors duration-200"
            onClick={handleSendPost}
          >
            Drop the Beat
          </button>
        </div>
      </div>
      <div
        className={`coin-holder-box w-full md:w-1/3 p-5 border-l border-gray-700 ${
          isMenuOpen ? "block" : "hidden"
        } md:block bg-gray-800`}
      >
        <div className="text-3xl mb-4 font-extrabold text-purple-400">Crew</div>
        <div className="space-y-4">
          {sortedCoinHolders.map((holder, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-2 bg-gray-700 rounded-lg"
            >
              <Image
                src={holder.profilePicture}
                alt={`${holder.user} profile`}
                width={40}
                height={40}
                className="rounded-full border-2 border-purple-400"
              />
              <div className="flex-1">
                <p
                  className={`font-bold ${
                    holder.online ? "text-purple-300" : "text-gray-400"
                  }`}
                >
                  {holder.user}
                </p>
                <div
                  className={`w-3 h-3 rounded-full ${
                    holder.online ? "bg-green-400" : "bg-gray-500"
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* scroll to top button */}
      <button
        className="md:hidden fixed bottom-32 right-14 bg-purple-600 text-white p-3 rounded-full hover:bg-purple-500 transition-colors duration-200"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        🎧
      </button>
    </div>
  );
};

export default Page;
