"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { PaperClipIcon } from '@heroicons/react/24/outline';

const memecoinFormSchema = z.object({
  logo: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters.").max(32, "Name must not be longer than 32 characters."),
  ticker: z.string().min(1, "Ticker is required").max(10, "Ticker must not be longer than 10 characters."),
  description: z.string().min(1, "Description is required").max(500, "Description must not exceed 500 characters."),
  twitter: z.string().url("Please enter a valid URL.").or(z.literal("")).optional(),
  telegram: z.string().url("Please enter a valid URL.").or(z.literal("")).optional(),
  website: z.string().url("Please enter a valid URL.").or(z.literal("")).optional(),
})

type MemecoinFormValues = z.infer<typeof memecoinFormSchema>

export default function MemecoinForm() {
  const [imagePreview, setImagePreview] = useState("https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/QmYggqtqetqc8ZWmnrpoTe343tEnNuofWeuQAcDoXmqRot");
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
      website: ""
    }
  })

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImagePreview(reader.result.toString());
        } else {
          console.error('Failed to load the image');
          setImagePreview('');
        }
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };

  const handleClickIcon = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: MemecoinFormValues) => {
    
  };

  return (
    <div className="sm:border-t sm:border-r sm:border-b rounded-tr rounded-br flex flex-1 pb-1 custom-scroll flex flex-col items-center justify-center pr-72">
      <div className="space-y-6 ml-16 mt-10 mb-10">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-medium">Launch Memecoin</h2>
          <p className="text-sm text-muted-foreground">Fill in the details for your memecoin.</p>
        </div>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Input type="file" accept="image/*" onChange={onFileChange} ref={fileInputRef} className="hidden" />
                        {imagePreview && (
                          <Avatar className="w-20 h-20">
                            <AvatarImage src={imagePreview} />
                            <AvatarFallback>TED</AvatarFallback>
                          </Avatar>
                        )}
                        <Button onClick={handleClickIcon} type="button" variant="ghost" className="rounded-full">
                          <PaperClipIcon width={24}/>
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>The logo for your memecoin.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Memecoin Name" className="w-[720px]" autoComplete="off" {...field} />
                  </FormControl>
                  <FormDescription>This is the name of your memecoin.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ticker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticker</FormLabel>
                  <FormControl>
                    <Input placeholder="Ticker Symbol" autoComplete="off" {...field} />
                  </FormControl>
                  <FormDescription>The ticker symbol for your memecoin.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description of the memecoin"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Describe what makes your memecoin unique.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter Link</FormLabel>
                  <FormControl>
                    <Input placeholder="(optional)" autoComplete="off" {...field} />
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
                  <FormLabel>Telegram Link</FormLabel>
                  <FormControl>
                    <Input placeholder="(optional)" autoComplete="off" {...field} />
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
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="(optional)" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              Launch Memecoin
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
