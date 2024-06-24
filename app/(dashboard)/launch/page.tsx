"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import launch from "../../../public/launch.png";
import diano from "../../../public/diano.png";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { Boxes } from "@/components/ui/bg-boxes";
import localFont from "next/font/local";
import Image from "next/image";
import penguinCoin from "../../../public/exploreMnky.jpeg";
import dogeCoin from "@/public/dogecoin-bitcoin.gif";
import dogeLaugh from "@/public/kek-dog.gif";

const myFont = localFont({
  src: "../../../public/fonts/kanit.ttf",
  display: "swap",
});

const memecoinFormSchema = z.object({
  logo: z.string().optional(),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(32, "Name must not be longer than 32 characters."),
  ticker: z
    .string()
    .min(1, "Ticker is required")
    .max(10, "Ticker must not be longer than 10 characters."),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must not exceed 500 characters."),
  twitter: z
    .string()
    .url("Please enter a valid URL.")
    .or(z.literal(""))
    .optional(),
  telegram: z
    .string()
    .url("Please enter a valid URL.")
    .or(z.literal(""))
    .optional(),
  website: z
    .string()
    .url("Please enter a valid URL.")
    .or(z.literal(""))
    .optional(),
});

type MemecoinFormValues = z.infer<typeof memecoinFormSchema>;

export default function MemecoinForm() {
  const [imagePreview, setImagePreview] = useState(
    "https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/QmYggqtqetqc8ZWmnrpoTe343tEnNuofWeuQAcDoXmqRot"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<MemecoinFormValues>({
    resolver: zodResolver(memecoinFormSchema),
    mode: "onChange",
    defaultValues: {
      logo: "",
      name: "",
      ticker: "",
      description: "",
      twitter: "",
      telegram: "",
      website: "",
    },
  });

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImagePreview(reader.result.toString());
        } else {
          console.error("Failed to load the image");
          setImagePreview("");
        }
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const handleClickIcon = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: MemecoinFormValues) => {};

  return (
    <section className="flex items-center justify-center">
      <div
        className="h-auto relative w-[95%] lg:w-10/12 overflow-hidden mt-[1100px] sm:mt-0 pb-24 mb-24 py-4 flex flex-col items-center justify-center rounded-[100px]"
        style={{
          backgroundImage: 'url("splashBackground.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <div className="absolute -bottom-6 right-0 z-30 w-80 h-80">
          <Image
            src={dogeCoin}
            alt="launch"
            // mirroring the image
            style={{ transform: "scaleX(-1)" }}
          />
        </div> */}
        <div className="hidden sm:block absolute top-12 right-8 z-30 w-52 h-52">
          <Image
            src={dogeCoin}
            alt="launch"
            className="rounded-full"
            // mirroring the image
            style={{ transform: "scaleX(-1)" }}
          />
        </div>

        {/* <div className="absolute inset-0 w-full h-full bg-[#212123] z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none"></div> */}
        {/* <Boxes /> */}
        <div className="xl:mx-48 z-20 relative w-9/12">
          <div className="space-y-6 mt-10 mb-10 w-11/12">
            <div className="flex flex-row">
              <h2
                className={`text-4xl text-cpurpledark`}
                style={{ textShadow: "4px 4px 0 #000" }}
              >
                <Image
                  src={penguinCoin}
                  alt="laugh"
                  className="w-40 h-40 mb-8 rounded-full"
                  style={{ transform: "scaleX(-1)" }}
                ></Image>{" "}
                Launch Memecoin
              </h2>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={`mx-6 w-full ${myFont.className} text-white`}
              >
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-xl">Logo</FormLabel>
                      <FormControl>
                        <div>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={onFileChange}
                              ref={fileInputRef}
                              className="hidden"
                            />
                            {imagePreview && (
                              <Avatar className="w-20 h-20">
                                <AvatarImage src={imagePreview} />
                                <AvatarFallback>TED</AvatarFallback>
                              </Avatar>
                            )}
                            <Button
                              onClick={handleClickIcon}
                              type="button"
                              variant="ghost"
                              className="rounded-full"
                            >
                              <PaperClipIcon width={24} />
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription className="text-slate-300 text-lg">
                        The logo for your memecoin.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <section className="grid grid-cols-1 lg:grid-cols-2 my-6 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-xl">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Memecoin Name"
                            className="bg-[#212123] border-2 border-cpurplelight"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-slate-300 text-lg">
                          This is the name of your memecoin.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ticker"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-xl">
                          Ticker
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ticker Symbol"
                            autoComplete="off"
                            className="bg-[#212123] border-2 border-cpurplelight"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-slate-300 text-lg">
                          The ticker symbol for your memecoin.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-xl">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Description of the memecoin"
                            autoComplete="off"
                            className="bg-[#212123] border-2 border-cpurplelight"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-slate-300 text-lg">
                          Describe what makes your memecoin unique.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>

                <Separator />
                <section className="grid grid-cols-1 lg:grid-cols-2 my-6 gap-8">
                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-xl">
                          Twitter Link
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(optional)"
                            autoComplete="off"
                            {...field}
                            className="bg-[#212123] border-2 border-cpurplelight"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="telegram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-xl">
                          Telegram Link
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(optional)"
                            autoComplete="off"
                            {...field}
                            className="bg-[#212123] border-2 border-cpurplelight"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-xl">
                          Website
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(optional)"
                            autoComplete="off"
                            {...field}
                            className="bg-[#212123] border-2 border-cpurplelight"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>

                <Button
                  type="submit"
                  className="bg-cpurpledark p-6 text-lg hover:bg-cpurpledark/85 -skew-x-3 flexx items-center gap-2"
                >
                  Launch Memecoin
                  <Image
                    src="rocket.svg"
                    alt="rocket"
                    className="w-8 h-8 -skew-x-6"
                    width={14}
                    height={14}
                  />
                </Button>

                <Image
                  src={"darth.svg"}
                  alt="darth"
                  className="w-40 h-40 absolute bottom-0 right-0 z-30 hidden lg:block"
                  width={40}
                  height={40}
                ></Image>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

/*

      


*/
