import z from "zod";

export const createFoodSchema = z.object({
  storeId: z.string().uuid({ message: "storeId harus UUID valid" }),

  name: z
    .string()
    .trim()
    .min(1, { message: "Nama wajib diisi" })
    .max(255, { message: "Nama maksimal 255 karakter" }),

  description: z
    .string()
    .trim()
    .max(1000, { message: "Deskripsi maksimal 1000 karakter" }),

  price: z.coerce
    .number()
    .int({ message: "Harga harus bilangan bulat" })
    .positive({ message: "Harga harus lebih dari 0" })
    .max(1_000_000_000, { message: "Harga terlalu besar" }),

  imgUrl: z
    .array(z.string().url({ message: "Format URL gambar tidak valid" }))
    .max(8, { message: "Maksimal 8 gambar" })
    .optional(),
});

export type CreateFoodInput = z.infer<typeof createFoodSchema>;
