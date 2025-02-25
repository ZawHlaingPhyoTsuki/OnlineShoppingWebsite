"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useState, useEffect } from "react";
import { productApi, categoryApi, cloudinaryApi } from "@/lib/api";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ProductType } from "@/types/myProduct";
import { useRouter } from "next/navigation";

// Form schema
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  categoryId: z.string().min(1, "Category is required"),
  size: z.array(z.string()).min(1, "At least one size is required"),
  color: z.array(z.string()).min(1, "At least one color is required"),
  images: z.array(z.string()).optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
const colorOptions = ["Red", "Blue", "Green", "Black", "White", "Yellow"];

export default function CreateProduct() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      color: [],
      size: [],
      images: [],
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAll();
        setCategories(response.data);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleRemoveImage = async (index: number, publicId: string) => {
    try {
      const response = await cloudinaryApi.delete(publicId);
      console.log(response);
      if (response.statusText !== "OK") {
        throw new Error("Failed to delete image");
      }
      setImages((prev) => prev.filter((_, i) => i !== index));
      toast.success("Image removed successfully", {
        className: "bg-green-500 text-white border-none",
      });
    } catch (error) {
      console.error("Failed to delete image:", error);
      toast.error("Failed to remove image");
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setIsLoading(true);
      const productData: Omit<ProductType, "id" | "category"> = {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        categoryId: data.categoryId,
        images: images,
        color: data.color,
        size: data.size,
      };

      await productApi.create(productData);
      toast.success("Product created successfully", {
        className: "bg-green-500 text-white border-none",
      });
      form.reset();
      setImages([]);
      router.push("/admin/view-all-products")
    } catch (error) {
      toast.error("Failed to create product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow border border-muted/50">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Enter price"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numValue = value === "" ? 0 : parseFloat(value);
                      if (numValue >= 0 || value === "") {
                        field.onChange(numValue);
                      }
                    }}
                    onBlur={() => {
                      // Ensure value is never negative on blur
                      if (field.value < 0) {
                        field.onChange(0);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* COLOR FIELD */}
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <div className="flex gap-2 flex-wrap">
                  {colorOptions.map((color) => (
                    <Button
                      key={color}
                      type="button"
                      variant={
                        field.value.includes(color) ? "default" : "outline"
                      }
                      onClick={() => {
                        const currentColors = field.value;
                        if (currentColors.includes(color)) {
                          field.onChange(
                            currentColors.filter((c) => c !== color)
                          );
                        } else {
                          field.onChange([...currentColors, color]);
                        }
                      }}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SIZE FIELD */}
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <div className="flex gap-2 flex-wrap">
                  {sizeOptions.map((size) => (
                    <Button
                      key={size}
                      type="button"
                      variant={
                        field.value.includes(size) ? "default" : "outline"
                      }
                      onClick={() => {
                        const currentSizes = field.value;
                        if (currentSizes.includes(size)) {
                          field.onChange(
                            currentSizes.filter((s) => s !== size)
                          );
                        } else {
                          field.onChange([...currentSizes, size]);
                        }
                      }}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IMAGES FIELD */}
          <div>
            <FormLabel>Product Images</FormLabel>
            <Button type="button" variant="outline" className="w-full">
              <CldUploadWidget
                uploadPreset="preset_for_onlineshop"
                onSuccess={(result: any) => {
                  if (result?.event === "success" && result?.info?.public_id) {
                    setImages((prev) => [...prev, result.info.public_id]);
                    form.setValue("images", [...images, result.info.public_id]);
                  }
                }}
              >
                {({ open }) => (
                  <span
                    onClick={() => open()}
                    className="w-full h-full flex items-center justify-center"
                  >
                    Upload Images
                  </span>
                )}
              </CldUploadWidget>
            </Button>
            {images.length > 0 && (
              <div className="mt-4 space-y-2 flex flex-wrap gap-5 max-w-[450px]">
                {images.map((publicId, index) => (
                  <div
                    key={publicId}
                    className="flex flex-col gap-5 items-center space-x-2"
                  >
                    <CldImage
                      width="100"
                      height="100"
                      src={publicId}
                      alt={`Upload ${index}`}
                      className="w-20 h-20 object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      type="button"
                      onClick={() => handleRemoveImage(index, publicId)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating..." : "Create Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
