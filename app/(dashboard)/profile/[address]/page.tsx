"use client";

import React, { use, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useRouter, usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { set } from "mongoose";
import profileBg from "../../../../public/profileBg.svg";
import MemeCoinCard from "@/components/MemeCoinCard";
import Loading from "../../launch/loading";
import localFont from "next/font/local";
import ButtonWC from "@/components/ButtonWC";
import Image from "next/image";
import community from "@/public/pepe-council.gif";
import work from "@/public/pepe-working.gif";
// import Community from "@/components/Community";
import coinsHeld from "@/public/crypto-coin.gif";
import UserBio from "@/components/UserBio";
// import coinsCreated from "@/public/doge-ban-hammer.gif";

const myFont = localFont({
  src: "../../../../public/fonts/Kavoon-Regular.ttf",
  display: "swap",
});

interface Post {
  id: number;
  user: string;
  content: string;
  time: string;
  upvotes: number;
  downvotes: number;
  comments: string[];
  image?: string;
}

interface User {
  address: string;
  username: string;
  profilePicture?: string;
  bio?: string;
}

interface Memecoin {
  memecoin_address: string;
  creator_address: string;
  logo: string;
  name: string;
  ticker: string;
  description: string;
  twitter?: string;
  telegram?: string;
  website?: string;
  timestamp: Date;
  creator: User;
}

export default function UserProfilePage({ params }) {
  const [user, setUser] = useState<User | null>(null);
  const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
  const [loading, setLoading] = useState(true);
  const address = params.address;
  const router = useRouter();
  const [iscommunityActive, setCommunityActive] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: "John Doe",
      content: "This is my first tweet!",
      time: "2m",
      upvotes: 10,
      downvotes: 2,
      comments: ["Great post!", "Welcome to Twitter!"],
    },
    {
      id: 2,
      user: "Jane Smith",
      content: "Hello world!",
      time: "10m",
      upvotes: 20,
      downvotes: 5,
      comments: ["Hello Jane!", "Nice to see you here."],
    },
    {
      id: 3,
      user: "Alice Johnson",
      content: "Loving this new Twitter UI!",
      time: "30m",
      upvotes: 15,
      downvotes: 3,
      comments: ["Me too!", "It’s really cool!"],
    },
  ]);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState<File | null>(null);

  const handleUpvote = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  const handleDownvote = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, downvotes: post.downvotes + 1 } : post
      )
    );
  };

  const addComment = (id: number, comment: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  const handleNewPost = () => {
    if (newPostContent.trim() === "") return;

    const newPost: Post = {
      id: posts.length + 1,
      user: "New User", // This should be replaced with the actual user's name
      content: newPostContent,
      time: "just now",
      upvotes: 0,
      downvotes: 0,
      comments: [],
      image: newPostImage ? URL.createObjectURL(newPostImage) : undefined,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setNewPostImage(null);
  };

  useEffect(() => {
    if (!address) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);

        const userResponse = await fetch(`/api/user/${address}`);
        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [address]);

  useEffect(() => {
    if (!address) return;

    const fetchMemecoins = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/memecoin/user/${address}`);
        const data = await response.json();
        console.log("Memecoins: ", data);
        setMemecoins(data);
      } catch (error) {
        console.error("Failed to fetch memecoins: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemecoins();
  }, [address]);

  return (
    <div className="flex flex-1 pb-1 rounded-3xl mx-6 mt-[1000px] sm:mt-0 ">
      {user && (
        <div className="w-full rounded-3xl">
          <div
            className="relative flex items-center justify-between rounded-[6.5rem] py-36"
            style={{
              backgroundImage: `url(${profileBg.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex items-center gap-6 pt-40 absolute -bottom-24 left-12">
              <Avatar className="rounded-full overflow-hidden w-56 h-56 border-4 border-black">
                <AvatarImage
                  className="object-cover w-full h-full"
                  src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${user.profilePicture}`}
                />
              </Avatar>
              <h2 className={`text-3xl font-bold ml-6 pt-24`}>
                {user.username}
              </h2>
            </div>
          </div>
          <div className="mt-32">
            <UserBio />
          </div>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 -mb-[7rem]">
            <div className="flex gap-[5rem]">
              <span onClick={() => setCommunityActive(false)}>
                {" "}
                <ButtonWC type={"Created"} insideImg={coinsHeld} width={50} />
              </span>
              <span onClick={() => setCommunityActive(false)}>
                {" "}
                <ButtonWC type={"Held"} insideImg={coinsHeld} width={50} />
              </span>
              <span onClick={() => setCommunityActive(true)}>
                {" "}
                <ButtonWC type={"Posts"} insideImg={work} width={50} />
              </span>
              <span onClick={() => setCommunityActive(true)}>
                {" "}
                <ButtonWC type={"Replies"} insideImg={work} width={50} />
              </span>
            </div>
            <div></div>
            <div></div>
            {/* <Image src={community} alt=";t"></Image> */}
          </div>

          {!iscommunityActive ? (
            <div>
              {loading && (
                <div
                  className="
                flex flex-1 justify-center items-center
              "
                >
                  <Loading />
                </div>
              )}
              <div className="mt-36 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-12">
                {memecoins.map((memecoin) => (
                  <MemeCoinCard
                    key={memecoin.memecoin_address}
                    memecoin={memecoin}
                  />
                ))}
              </div>
            </div>
          ) : (
            // <Community />
            <div>
              <div className="flex flex-col w-full max-w-xl mt-36 space-y-4 ">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="post bg-[#232121] shadow-md rounded-lg p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gray-300 rounded-full" />
                      <div>
                        <div className="font-bold text-white ">{post.user}</div>
                        <div className="text-xs text-white">{post.time}</div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-white">
                      {post.content}
                    </div>
                    {post.image && (
                      <div className="mt-3">
                        <img
                          src={post.image}
                          alt="Post"
                          className="w-full rounded-lg"
                        />
                      </div>
                    )}
                    <div className="mt-3 flex space-x-4">
                      <button
                        onClick={() => handleUpvote(post.id)}
                        className="flex items-center space-x-1 text-white hover:text-green-500"
                      >
                        <span>▲</span>
                        <span>{post.upvotes}</span>
                      </button>
                      <button
                        onClick={() => handleDownvote(post.id)}
                        className="flex items-center space-x-1 text-white hover:text-red-500"
                      >
                        <span>▼</span>
                        <span>{post.downvotes}</span>
                      </button>
                    </div>
                    <div className="mt-4">
                      <div className="font-semibold text-white">Comments:</div>
                      {post.comments.map((comment, index) => (
                        <div key={index} className="mt-2 text-sm text-white">
                          {comment}
                        </div>
                      ))}
                      <input
                        className="mt-2 w-full rounded-full px-4 py-2 text-sm border border-gray-300"
                        type="text"
                        placeholder="Add a comment..."
                        onKeyDown={(e) => {
                          if (
                            e.key === "Enter" &&
                            (e.target as HTMLInputElement).value.trim() !== ""
                          ) {
                            addComment(
                              post.id,
                              (e.target as HTMLInputElement).value.trim()
                            );
                            (e.target as HTMLInputElement).value = "";
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
