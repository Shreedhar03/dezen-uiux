"use client";

import React, { useEffect, useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import profileBg from "../../../public/profileBg.svg";
import ReactMarkdown from "react-markdown";
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
} from "@/components/ui/alert-dialog";
import { useRouter, usePathname } from "next/navigation";
import { useTronLink } from "@/hooks/TronHooks";
import EditProfile from "@/components/EditProfile";
import { useUser } from "@/components/UserContext";
import AnimateOnRouteChange from "@/components/AnimateOnRouteChange";
import localFont from "next/font/local";
import MemeCoinCard from "@/components/MemeCoinCard";

const myFont = localFont({
  src: "../../../public/fonts/Kavoon-Regular.ttf",
  display: "swap",
});

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
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
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
      <div className="flex flex-1 pb-1 rounded-3xl mx-6">
        {user && (
          <div className="w-full rounded-3xl">
            <div
              className="relative flex items-center justify-between rounded-[6.5rem] py-8"
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
                    src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${"user.profilePicture"}`}
                  />
                </Avatar>
                <h2
                  className={`${myFont.className} text-2xl font-bold ml-6 pt-24`}
                >
                  {"user.username"}
                </h2>
              </div>
              <div className="pt-56">
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-md absolute right-12 -bottom-5"
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Edit Profile
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent ref={dialogRef}>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Edit Profile</AlertDialogTitle>
                      <AlertDialogDescription>
                        <div className="mt-4">
                          <EditProfile
                            setIsDialogOpen={setIsDialogOpen}
                            onProfileUpdate={fetchProfile}
                          />
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            {(memecoins.length > 0 || isUserLoading) && (
              <Separator className="mt-28" />
            )}

            <div className="flex flex-1 flex-wrap p-4">
              {isUserLoading && (
                <div
                  className="
                flex flex-1 justify-center items-center
              "
                >
                  <Loader2 className="h-12 w-12 animate-spin" />
                </div>
              )}

              <div className="flex gap-4 mt-36">
                <button className="bg-purple-800 text-white -skew-x-3 p-4 rounded-sm">
                  WORK
                </button>
                <button className="bg-purple-800 text-white -skew-x-3 p-4 rounded-sm">
                  COMMUNITY
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mr-4">
                {memecoins.map((memecoin, key) => (
                  <MemeCoinCard
                    key={memecoin.creator_address}
                    memecoin={memecoin}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimateOnRouteChange>
  );
}
