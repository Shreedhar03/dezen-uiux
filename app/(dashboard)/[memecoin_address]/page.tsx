"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useRouter, usePathname } from "next/navigation";
import { ColorType, createChart, Time } from "lightweight-charts";
import trade from "../../../public/TradeButton.svg";
import buy from "../../../public/BuyButton.svg";
import sell from "../../../public/SellButton.svg";
import ButtonWC from "@/components/ButtonWC";
import community from "@/public/pepe-council.gif";
import work from "@/public/ponke-ponkesol.gif";
import Image from "next/image";
import Community from "@/components/Community";
import Link from "next/link";
import MemeCoinCard from "@/components/MemeCoinCard";
import local from "next/font/local";
import '@/components/MemeCoinCard.css'

const myFont = local({
  src: "../../../public/fonts/kanit.ttf",
  display: "swap",
});

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
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const memecoin_address = params.memecoin_address;

  const [aggregationData, setAggregationData] = useState<AggregationData[]>([]);
  const [marketcap, setMarketcap] = useState<number>(0);
  const [iscommunityActive, setCommunityActive] = useState(false);

  const communityAddress = `/community/${memecoin_address}`;

  useEffect(() => {
    if (!memecoin_address) return;

    const fetchMemecoin = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/memecoin/${memecoin_address}`);
        const data = await response.json();
        console.log("Memecoin: ", data);
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
    const container = document.getElementById("chart-container");

    if (!container) return console.error("Container element not found");
    if (aggregationData.length === 0) return;

    const chartOptions = {
      layout: {
        textColor: "#d3e8a0",
        background: {
          type: "solid" as ColorType.Solid,
          color: "#1a202c",
        },
      },
    };

    const chart = createChart(container, chartOptions);

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    candlestickSeries.setData(aggregationData);

    chart.timeScale().applyOptions({ timeVisible: true });
    // chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [memecoin, aggregationData]);

  const fetchAggregationData = async () => {
    try {
      if (!memecoin) return;
      setLoading(true);
      const response = await fetch(
        `/api/transaction/aggregation/${memecoin._id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
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
    <>
      <section className="xl:pr-12 pr-6 flex flex-col lg:flex-row justify-between mt-8 gap-6">
        <div
          id="chart-container"
          className="md:h-[15rem] mt-[1200px] md:mt-0 lg:w-8/12 mb-64 md:mb-0 shrink-0"
        ></div>
        <div className="w-full xl:w-10/12 shrink lg:w-4/12 mt-56 lg:mt-0">
          {
            <div className="flex gap-4 md:mb-6">
              <button
                onClick={() => {
                  setTradeType("buy");
                }}
                className={`${
                  tradeType === "buy" ? "bg-[#82b455]" : ""
                } border-2 border-foreground rounded-xl px-8 py-3 md:px-16 md:py-6 relative`}
                style={{
                  textShadow: "0px 3px 3px #000",
                }}
              >
                <div
                  className={`z-10 ${
                    tradeType === "buy" ? "bg-[#d3e8a0]" : "bg-secondary/80"
                  } w-full h-3/5 rounded-xl absolute top-[2px] left-0`}
                ></div>
                <span className="z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg md:text-2xl">
                  BUY
                </span>
              </button>
              <button
                onClick={() => {
                  setTradeType("sell");
                }}
                className={`${
                  tradeType === "sell" ? "bg-[#82b455]" : ""
                } border-2 border-foreground rounded-xl px-8 py-3 md:px-16 md:py-6 relative`}
                style={{
                  textShadow: "0px 3px 3px #000",
                }}
              >
                <div
                  className={`z-10 ${
                    tradeType === "sell" ? "bg-[#d3e8a0]" : "bg-secondary/80"
                  } w-full h-3/5 rounded-xl absolute top-[2px] left-0`}
                ></div>
                <span className="z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg md:text-2xl">
                  SELL
                </span>
              </button>
            </div>
          }

          {
            <div className="mt-24 sm:mt-0">
              <section className="w-full">
                {tradeType === "buy" ? (
                  <>
                    <div className="p-6 rounded-lg border-2 border-cpurpledark w-full">
                      <div className="space-y-3">
                        <button
                          onClick={() => setIsTronQuantity(!isTronQuantity)}
                        >
                          <p className="rounded-md px-4 py-1 bg-cpurpledark -skew-x-6">
                            Switch to{" "}
                            {isTronQuantity
                              ? memecoin?.name || "Memecoin"
                              : "Ton"}
                          </p>
                        </button>
                        <div className="space-y-3">
                          <Label htmlFor="buy-amount">Amount</Label>
                          <div className="relative flex items-center">
                            <Input id="buy-amount" autoComplete="off" />
                            {isTronQuantity ? (
                              <div className="absolute right-2 flex items-center space-x-1">
                                <img
                                  src="https://s2.coinmarketcap.com/static/img/coins/64x64/11419.png"
                                  alt="TON Logo"
                                  className="h-6 w-6"
                                />
                                <span className="text-sm font-semibold">
                                  TON
                                </span>
                              </div>
                            ) : (
                              <div className="absolute right-2 flex items-center space-x-1">
                                <img
                                  src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin?.logo}`}
                                  alt="Memecoin Logo"
                                  className="h-6 w-6 rounded-full"
                                />
                                <span className="text-sm font-semibold">
                                  {memecoin?.ticker}
                                </span>
                              </div>
                            )}
                          </div>
                          <CardDescription className="pt-2">
                            {isTronQuantity
                              ? `${memecoinBuyAmount} ${memecoin?.ticker}`
                              : `${sunBuyAmount / 1_000_000} TON`}
                          </CardDescription>
                        </div>
                      </div>
                      <CardFooter className="mt-10">
                        <img src="TradeButton.svg" alt="trade" />
                      </CardFooter>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-6 rounded-lg border-2 border-cpurpledark w-full">
                      <div className="space-y-3">
                        <button
                          onClick={() => setIsTronQuantity(!isTronQuantity)}
                        >
                          <p className="rounded-md px-4 py-1 bg-cpurpledark -skew-x-6">
                            Switch to{" "}
                            {isTronQuantity
                              ? memecoin?.name || "Memecoin"
                              : "Ton"}
                          </p>
                        </button>
                        <div className="space-y-3">
                          <Label htmlFor="sell-amount">Amount</Label>
                          <div className="relative flex items-center">
                            <Input id="sell-amount" autoComplete="off" />
                            {isTronQuantity ? (
                              <div className="absolute right-2 flex items-center space-x-1">
                                <img
                                  src="https://s2.coinmarketcap.com/static/img/coins/64x64/11419.png"
                                  alt="TON Logo"
                                  className="h-6 w-6"
                                />
                                <span className="text-sm font-semibold">
                                  TON
                                </span>
                              </div>
                            ) : (
                              <div className="absolute right-2 flex items-center space-x-1">
                                <img
                                  src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin?.logo}`}
                                  alt="Memecoin Logo"
                                  className="h-6 w-6 rounded-full"
                                />
                                <span className="text-sm font-semibold">
                                  {memecoin?.ticker}
                                  
                                </span>
                              </div>
                            )}
                          </div>
                          <CardDescription className="pt-2">
                            {isTronQuantity
                              ? `${memecoinSellAmount} ${memecoin?.ticker}`
                              : `${sunSellAmount / 1_000_000} TON`}
                          </CardDescription>
                        </div>
                      </div>
                      <CardFooter className="mt-10">
                        <img src="TradeButton.svg" alt="trade" />
                      </CardFooter>
                    </div>
                  </>
                )}
              </section>
            </div>
          }
        </div>
      </section>
      

      <div className="mb-12">
        <Label className="text-zinc-400 text-xs">
          Note: the price displayed on the right side is represented in nanoTON
          (i.e. 1 billionth fraction of TON)
        </Label>
      </div>
      {/* card */}
      {memecoin && (
        <section className="flex justify-between flex-col-reverse lg:flex-row-reverse">
          <div className={`card bg-cpurpledark ${myFont.className}  text-white p-6 rounded-xl lg:w-1/2 mr-12`}>
            <div className="flex flex-col sm:flex-row items-start justify-between mb-2">
              <div className="card flex-shrink-0 bg-black rounded-xl">
                <img
                  src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin.logo}`}
                  alt={`${memecoin.name} logo`}
                  className="h-36 w-36 object-cover rounded-md"
                />
              </div>
              <div className="ml-4 flex-1">
                <Label className="text-xl text-white">
                  Ticker: ${memecoin.ticker}
                </Label>
                <br />
                <Label className="text-xl text-white">
                  Name: {memecoin.name}
                </Label>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full">
              {memecoin.twitter && (
                <a
                  href={memecoin.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="underline text-white">Twitter</span>
                </a>
              )}
              {memecoin.telegram && (
                <a
                  href={memecoin.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="underline text-white">Telegram</span>
                </a>
              )}
              {memecoin.website && (
                <a
                  href={memecoin.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="underline text-white">Website</span>
                </a>
              )}
            </div>

            <Label className="text-white/80">{memecoin.description}</Label>
          </div>
          <div className="mr-48 mb-24 lg:mb-0 sm:w-8/12 lg:w-auto">
            <Link href={communityAddress}>
              <ButtonWC type={"Community"} insideImg={community} width={100} />
            </Link>
          </div>
        </section>
      )}

      {
        <div className="my-24 w-10/12 mb-36">
          
          {/* <MemeCoinCard  memecoin={memecoin} /> */}
          {memecoin && (
            <>
              <div className="flex flex-col gap-4 mb-4" >
                <div className="text-sm">
                  <span className="">{memecoin.name}</span>
                  <span className="">Ticker: ${memecoin.ticker}</span>
                  <span>Marketcap: ${marketcap}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm ">Created by</span>
                  {memecoin.creator.profilePicture && (
                    <img
                      src={`https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${memecoin.creator.profilePicture}`}
                      alt={`${memecoin.creator.username}'s profile`}
                      className="h-6 w-6 rounded-md object-cover transition-all hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/profile/${memecoin.creator_address}`);
                      }}
                    />
                  )}
                  <span
                    className="text-sm font-semibold hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/profile/${memecoin.creator_address}`);
                    }}
                  >
                    {memecoin.creator.username}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      }
    </>
  );
}