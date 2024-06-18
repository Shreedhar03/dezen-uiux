'use client';

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useRouter, usePathname } from 'next/navigation';
import { ColorType, createChart, Time } from 'lightweight-charts';

interface User {
  address: string;
  username: string;
  profilePicture?: string;
  bio?: string;
}

interface Memecoin {
  _id: string;
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

interface AggregationData {
  open: number;
  close: number;
  high: number;
  low: number;
  time: Time;
}

export default function MemecoinPage({ params }) {
  const router = useRouter();
  const [memecoin, setMemecoin] = useState<Memecoin | null>(null);
  const [loading, setLoading] = useState(true);
  const [memecoinBuyAmount, setMemecoinBuyAmount] = useState<number>(0);
  const [memecoinSellAmount, setMemecoinSellAmount] = useState<number>(0);
  const [sunBuyAmount, setSunBuyAmount] = useState<number>(0);
  const [sunSellAmount, setSunSellAmount] = useState<number>(0);
  const [isTronQuantity, setIsTronQuantity] = useState(true);
  const memecoin_address = params.memecoin_address;

  const [aggregationData, setAggregationData] = useState<AggregationData[]>([]);
  const [marketcap, setMarketcap] = useState<number>(0);

  useEffect(() => {
    if (!memecoin_address) return;

    const fetchMemecoin = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/memecoin/${memecoin_address}`);
        const data = await response.json();
        console.log("Memecoin: ", data)
        setMemecoin(data);

      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemecoin();
  }, [memecoin_address]);

  useEffect(() => {
    const container = document.getElementById('chart-container');

    if (!container) return console.error('Container element not found');
    if (aggregationData.length === 0) return;

    const chartOptions = { 
      layout: { 
        textColor: 'black', 
        background: { 
          type: 'solid' as ColorType.Solid, 
          color: 'white' 
        } 
      } 
    };

    const chart = createChart(container, chartOptions);

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
      wickUpColor: '#26a69a', wickDownColor: '#ef5350',
    });
    candlestickSeries.setData(aggregationData);

    chart.timeScale().applyOptions({ timeVisible: true })
    // chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [memecoin, aggregationData]);

  const fetchAggregationData = async () => {
    try {
      if (!memecoin) return;
      setLoading(true);
      const response = await fetch(`/api/transaction/aggregation/${memecoin._id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("Aggregation data: ", data.results);
      setAggregationData(data.results);
    } catch (err) {
      console.error("Failed to fetch aggregation data:", err);
    }
  };

  useEffect(() => {
    if (!memecoin) return;

    fetchAggregationData();

    return () => {
      setAggregationData([]);
    };

  }, [memecoin]);

  return (
    <div className="sm:border-t sm:border-r sm:border-b rounded-tr rounded-br flex flex-1 pb-12 pt-12 pl-12 md:space-x-8">
      <div className="flex-1">

        { memecoin && (
          <div className="flex justify-between items-center mb-4">
            <div className='text-sm'>
                <span className="mr-4">{memecoin.name}</span>
                <span className="mr-4">Ticker: ${memecoin.ticker}</span>
                <span>Marketcap: ${marketcap}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-sm ">Created by</span>
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
              <span className="ml-2 text-sm font-semibold hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/profile/${memecoin.creator_address}`)
                }}
              >
                {memecoin.creator.username}
              </span>
            </div>
          </div>
        )}

        <div id="chart-container" className="w-full h-[320px]"></div>

        <div className="mt-2">
          <Label className="text-zinc-400 text-xs">Note: the price displayed on the right side is represented in nanoTON (i.e. 1 billionth fraction of TON)</Label>
        </div>
      </div>

      <div className="w-1/3 flex flex-col space-y-4">
        <Tabs defaultValue="buy" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>
          <TabsContent value="buy">
            <Card>
              <CardHeader>
              </CardHeader>
              <CardContent className="space-y-2">
                <button onClick={() => setIsTronQuantity(!isTronQuantity)}>
                  <Badge variant="secondary" className='rounded-md'>
                    Switch to {isTronQuantity ? memecoin?.name || "Memecoin" : "Ton"}
                  </Badge>
                </button>
                <div className="space-y-1">
                  <Label htmlFor="buy-amount">Amount</Label>
                  <div className="relative flex items-center">
                    <Input
                      id="buy-amount"
                      autoComplete="off"
                    />
                    { isTronQuantity ? (
                      <div className="absolute right-2 flex items-center space-x-1">
                        <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/11419.png" alt="TON Logo" className="h-6 w-6" />
                        <span className="text-sm font-semibold">TON</span>
                      </div>
                    ):(
                      <div className="absolute right-2 flex items-center space-x-1">
                        <img src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin?.logo}`} alt="Memecoin Logo" className="h-6 w-6 rounded-full" />
                        <span className="text-sm font-semibold">{memecoin?.ticker}</span>
                      </div>
                    )}
                  </div>
                  <CardDescription className='pt-2'>
                    {isTronQuantity ? `${memecoinBuyAmount} ${memecoin?.ticker}` : `${sunBuyAmount / 1_000_000} TON`}
                  </CardDescription>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => {}} className='w-full'>
                  place trade
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="sell">
            <Card>
              <CardHeader>
              </CardHeader>
              <CardContent className="space-y-2">
                <button onClick={() => setIsTronQuantity(!isTronQuantity)}>
                  <Badge variant="secondary" className='rounded-md'>
                    Switch to {isTronQuantity ? memecoin?.name || "Memecoin" : "Ton"}
                  </Badge>
                </button>
                <div className="space-y-1">
                  <Label htmlFor="sell-amount">Amount</Label>
                  <div className="relative flex items-center">
                    <Input
                      id="sell-amount" 
                      autoComplete='off' 
                    />
                    { isTronQuantity ? (
                      <div className="absolute right-2 flex items-center space-x-1">
                        <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/11419.png" alt="TON Logo" className="h-6 w-6" />
                        <span className="text-sm font-semibold">TON</span>
                      </div>
                    ):(
                      <div className="absolute right-2 flex items-center space-x-1">
                        <img src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin?.logo}`} alt="Memecoin Logo" className="h-6 w-6 rounded-full" />
                        <span className="text-sm font-semibold">{memecoin?.ticker}</span>
                      </div>
                    )}
                  </div>
                  <CardDescription className='pt-2'>
                    {isTronQuantity ? `${memecoinSellAmount} ${memecoin?.ticker}` : `${sunSellAmount / 1_000_000} TON`}
                  </CardDescription>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => {}} className='w-full'>
                  place trade
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        { memecoin && (
          <div className="pr-14 pt-2">
            <div className="flex items-center justify-center space-x-24 mb-4 w-full">
              {memecoin.twitter && (
                <a href={memecoin.twitter} target="_blank" rel="noopener noreferrer">
                  <Badge variant="secondary" className="rounded-md">
                    Twitter 
                  </Badge>
                </a>
              )}
              {memecoin.telegram && (
                <a href={memecoin.telegram} target="_blank" rel="noopener noreferrer">
                  <Badge variant="secondary" className="rounded-md">
                    Telegram
                  </Badge>
                </a>
              )}
              {memecoin.website && (
                <a href={memecoin.website} target="_blank" rel="noopener noreferrer">
                  <Badge variant="secondary" className="rounded-md">
                    Website
                  </Badge>
                </a>
              )}
            </div>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-shrink-0">
                <img 
                  src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin.logo}`} 
                  alt={`${memecoin.name} logo`}
                  className="h-36 w-36 object-cover rounded-md"
                />
              </div>
              <div className="ml-4 flex-1">
                <Label className="text-lg">Ticker: ${memecoin.ticker}</Label><br />
                <Label className="text-lg">Name: {memecoin.name}</Label>
              </div>
            </div>
            <Label className="text-sm text-zinc-400">{memecoin.description}</Label>
          </div>
        )}
      </div>
    </div>
  );
}
