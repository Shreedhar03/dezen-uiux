"use client"
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

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

const Community: React.FC = () => {
  useEffect(() => {
    gsap.fromTo(
      '.post',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }
    );
  }, []);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: 'John Doe',
      content: 'This is my first tweet!',
      time: '2m',
      upvotes: 10,
      downvotes: 2,
      comments: ['Great post!', 'Welcome to Twitter!']
    },
    {
      id: 2,
      user: 'Jane Smith',
      content: 'Hello world!',
      time: '10m',
      upvotes: 20,
      downvotes: 5,
      comments: ['Hello Jane!', 'Nice to see you here.']
    },
    {
      id: 3,
      user: 'Alice Johnson',
      content: 'Loving this new Twitter UI!',
      time: '30m',
      upvotes: 15,
      downvotes: 3,
      comments: ['Me too!', 'It’s really cool!']
    }
  ]);

  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState<File | null>(null);

  const handleUpvote = (id: number) => {
    setPosts(posts.map(post => post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post));
  };

  const handleDownvote = (id: number) => {
    setPosts(posts.map(post => post.id === id ? { ...post, downvotes: post.downvotes + 1 } : post));
  };

  const addComment = (id: number, comment: string) => {
    setPosts(posts.map(post => post.id === id ? { ...post, comments: [...post.comments, comment] } : post));
  };

  const handleNewPost = () => {
    if (newPostContent.trim() === '') return;

    const newPost: Post = {
      id: posts.length + 1,
      user: 'New User', // This should be replaced with the actual user's name
      content: newPostContent,
      time: 'just now',
      upvotes: 0,
      downvotes: 0,
      comments: [],
      image: newPostImage ? URL.createObjectURL(newPostImage) : undefined
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setNewPostImage(null);
  };

  return (
    <div className="-mt-10 flex flex-col items-start w-screen min-h-screen text-gray-800 p-10 ">
      {/* Header Start */}
      <div className="flex flex-col w-full max-w-xl shadow-xl rounded-lg overflow-hidden">
        <div className="bg-cpurpledark p-4">
          <input
            className="flex items-center h-12 w-full rounded-full px-4 text-sm border border-gray-300"
            type="text"
            placeholder="What's happening?"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="mt-2 w-full text-sm text-gray-200"
            onChange={(e) => setNewPostImage(e.target.files ? e.target.files[0] : null)}
          />
          <button
            className="mt-2 w-full bg-purple-600 text-gray-200 rounded-full py-2"
            onClick={handleNewPost}
          >
            Post
          </button>
        </div>
      </div>
      {/* Header End */}
      
      {/* Posts Start */}
      <div className="flex flex-col w-full max-w-xl mt-6 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="post bg-[#232121] shadow-md rounded-lg p-4">
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
                <img src={post.image} alt="Post" className="w-full rounded-lg" />
              </div>
            )}
            <div className="mt-3 flex space-x-4">
              <button onClick={() => handleUpvote(post.id)} className="flex items-center space-x-1 text-white hover:text-green-500">
                <span>▲</span>
                <span>{post.upvotes}</span>
              </button>
              <button onClick={() => handleDownvote(post.id)} className="flex items-center space-x-1 text-white hover:text-red-500">
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
                  if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim() !== '') {
                    addComment(post.id, (e.target as HTMLInputElement).value.trim());
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Posts End */}
    </div>
  );
};

export default Community;
