'use client'
import { useState, useEffect } from 'react'
import { Loader2 } from "lucide-react"
import { useRouter, usePathname } from 'next/navigation';

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

export default function Home() {
  const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchMemecoins = async () => {
      try {
        const response = await fetch('/api/memecoin/all/f');
        const data = await response.json();
        console.log("Memecoins: ", data)
        setMemecoins(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemecoins();
  }, []);

  return (
    <div className="sm:border-t sm:border-r sm:border-b rounded-tr rounded-br flex flex-1 pb-4">
      <div className="flex flex-1 flex-wrap p-4">
        {
          loading && (
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
                <div className="ml-4 flex-1">
                  <div className="flex items-center mb-1">
                    <span className="mr-2 text-sm font-semibold text-zinc-600">Created by</span>
                    {memecoin.creator.profilePicture && (
                      <img
                        src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin.creator.profilePicture}`}
                        alt={`${memecoin.creator.username}'s profile`}
                        className="h-6 w-6 rounded-md object-cover transition-all hover:scale-105"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/profile/${memecoin.creator_address}`)
                        }}
                      />
                    )}
                    <span className="ml-2 text-sm font-semibold text-gray-600 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/profile/${memecoin.creator_address}`)
                      }}
                    >
                      {memecoin.creator.username}
                    </span>
                  </div>
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
  )
}
