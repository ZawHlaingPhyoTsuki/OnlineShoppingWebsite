"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { categoryApi, cloudinaryApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CldImage, CldUploadWidget } from "next-cloudinary";

// Form schema
const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  image: z.string().min(1, "Image is required"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function CreateCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string>("");
  const router = useRouter();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  const handleRemoveImage = async (publicId: string) => {
    try {
      const response = await cloudinaryApi.delete(publicId);
      if (response.statusText !== "OK") {
        throw new Error("Failed to delete image");
      }
      setImage("");
      form.setValue("image", "");
      toast.success("Image removed successfully");
    } catch (error) {
      console.error("Failed to delete image:", error);
      toast.error("Failed to remove image");
    }
  };

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setIsLoading(true);
      const categoryData = {
        name: data.name,
        description: data.description || undefined,
        image: image || data.image, // Use uploaded image if available
      };

      await categoryApi.create(categoryData);
      toast.success("Category created successfully");
      form.reset();
      setImage("");
      router.push("/admin/view-all-categories");
    } catch (error) {
      toast.error("Failed to create category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow border border-muted/50 pb-10">
      <h1 className="text-2xl font-bold mb-6">Create New Category</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter category description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IMAGE FIELD */}
          <div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Image</FormLabel>
                  <FormControl>
                    <Button type="button" variant="outline" className="w-full">
                      <CldUploadWidget
                        uploadPreset="preset_for_onlineshop" // Use your Cloudinary upload preset
                        onSuccess={(result: any) => {
                          if (
                            result?.event === "success" &&
                            result?.info?.public_id
                          ) {
                            setImage(result.info.public_id);
                            field.onChange(result.info.public_id);
                          }
                        }}
                      >
                        {({ open }) => (
                          <span
                            onClick={() => open()}
                            className="w-full h-full flex items-center justify-center"
                          >
                            Upload Image
                          </span>
                        )}
                      </CldUploadWidget>
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {image && (
              <div className="mt-4 flex flex-col gap-5 items-center">
                <CldImage
                  width="100"
                  height="100"
                  src={image}
                  alt="Category preview"
                  className="w-20 h-20 object-cover"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  type="button"
                  onClick={() => handleRemoveImage(image)}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating..." : "Create Category"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
