'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Loader2 } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator"
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter, usePathname } from 'next/navigation';
import { useTronLink } from '@/hooks/TronHooks';
import EditProfile from '@/components/EditProfile';
import { useUser } from '@/components/UserContext';
import AnimateOnRouteChange from '@/components/AnimateOnRouteChange';

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
}

export default function MyProfilePage() {
  const { address: myAddress } = useTronLink();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const { user, setUser, isUserLoading, setUserLoading } = useUser();
  const [memecoins, setMemecoins] = useState<Memecoin[]>([]);

  const closeDialog = () => setIsDialogOpen(false);

  const handleClickOutside = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      closeDialog();
    }
  };

  useEffect(() => {
    if (isDialogOpen) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isDialogOpen]);

  useEffect(() => {
    console.log("Address changed: ", myAddress);
  }, [myAddress]);

  const fetchProfile = async () => {
    try {
      if (!myAddress) return;
      setUserLoading(true);

      const userResponse = await fetch(`/api/user/${myAddress}`);
      const userData = await userResponse.json();
      setUser(userData);

    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setUserLoading(false);
    }
  };

  const fetchMemecoins = async () => {
    try {
      const response = await fetch(`/api/memecoin/user/${myAddress}`);
      const data = await response.json();
      console.log("Memecoins: ", data);
      setMemecoins(data);
    } catch (error) {
      console.error("Failed to fetch memecoins: ", error);
    }
  };

  useEffect(() => {
    if (!myAddress) return;
    fetchMemecoins();
  }, [myAddress]);

  return (
    <AnimateOnRouteChange>
    <div className="sm:border-t sm:border-r sm:border-b rounded-tr rounded-br flex flex-1 pb-1">
      {user && (
      <div className="w-full relative">
        <div className="bg-gradient-to-r from-purple-950 to-black h-40 flex items-center justify-between px-12">
          <div className="flex items-center pt-40">
            <Avatar className="rounded-xl overflow-hidden w-40 h-40 border-4 border-black">
              <AvatarImage
                className="object-cover w-full h-full"
                src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${user.profilePicture}`}
              />
            </Avatar>
            <h2 className="text-2xl font-bold ml-6 pt-16">{user.username}</h2>
          </div>
          <div className="pt-56">
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className='rounded-md' type="button" onClick={(e) => e.stopPropagation()}>
                  Edit Profile
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent ref={dialogRef}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Edit Profile</AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="mt-4">
                      <EditProfile setIsDialogOpen={setIsDialogOpen} onProfileUpdate={fetchProfile}/>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        {(memecoins.length > 0 || isUserLoading) && <Separator className='mt-28'/>}

        <div className="flex flex-1 flex-wrap p-4">
          {
            isUserLoading && (
              <div className="
                flex flex-1 justify-center items-center
              ">
                <Loader2 className="h-12 w-12 animate-spin" />
              </div>
            )
          }
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {memecoins.map(memecoin => (
              <div key={memecoin.memecoin_address} className="bg-white shadow rounded-lg p-4 cursor-pointer" onClick={() => router.push(`/${memecoin.memecoin_address}`)}>
                <div className="flex items-start justify-between">
                  <div className="flex-shrink-0">
                    <img 
                      src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin.logo}`} 
                      alt={`${memecoin.name} logo`}
                      className="h-28 w-28 object-cover rounded-md transition-all hover:scale-105"
                    />
                  </div>
                  <div className="ml-4  mt-7 flex-1">
                    <span className="text-md text-zinc-600 font-bold">
                      ${memecoin.ticker} <br /> {memecoin.name}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-zinc-600">{memecoin.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
      )}
    </div>
    </AnimateOnRouteChange>
  );  
}
