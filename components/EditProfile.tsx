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
import { useTronLink } from "@/hooks/TronHooks"

const profileFormSchema = z.object({
  username: z.string()
    .min(1, "Username is required")
    .max(12, "Username must not be longer than 12 characters.")
    .regex(/^[a-zA-Z0-9_\-]+$/, "Username can only contain letters, numbers, underscores, and hyphens."),
  bio: z.string()
    .max(160, "Description must not exceed 160 characters."),
  profilePicture: z.string()
    .optional()
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function EditProfileForm({ setIsDialogOpen, onProfileUpdate }) {
  const { address } = useTronLink();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      bio: "",
      profilePicture: ""
    },
    mode: "onChange"
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

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let ipfsHash = "";
    
      const files = fileInputRef.current?.files;
      if (files && files.length > 0) {
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file);

        const uploadResponse = await fetch('/api/image/upload', {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadResponse.json();
        console.log('Upload data:', uploadData);
        ipfsHash = uploadData.hash;
      }
  
      const profileData = {
        ...data,
        address,
        profilePicture: ipfsHash || data.profilePicture
      };
  
      const updateResponse = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileData }),
      });
  
      if (!updateResponse.ok) throw new Error('Failed to update profile');

      setIsDialogOpen(false);
      onProfileUpdate();

    } catch (error) {
      console.error('Failed to submit profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!address) return;
      try {
        const response = await fetch(`/api/user/${address}`);
        const profileData = await response.json();
        if (response.ok) {
          form.reset({
            username: profileData.username || "",
            bio: profileData.bio || "",
            profilePicture: profileData.profilePicture || ""
          });
          const imageUrl = profileData.profilePicture ? `https://ivory-eligible-hamster-305.mypinata.cloud/ipfs/${profileData.profilePicture}` : "";
          setImagePreview(imageUrl);
        } else {
          throw new Error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };

    fetchProfileData();
  }, [address, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <div className="flex items-center space-x-2">
                    <Input type="file" accept="image/*" onChange={onFileChange} ref={fileInputRef} className="hidden" />
                    {imagePreview && (
                      <Avatar className="w-24 h-24">
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your bio here"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </Form>
  )
}
