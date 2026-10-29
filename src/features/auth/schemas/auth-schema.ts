import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Format email tidak valid").toLowerCase().trim(),
  password: z.string().min(1, "Password wajib diisi"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

const passwordSchema = z
  .string()
  .min(8, "Minimal 8 karakter")
  .regex(/[A-Z]/, "Harus ada minimal 1 huruf besar")
  .regex(/[a-z]/, "Harus ada minimal 1 huruf kecil")
  .regex(/[0-9]/, "Harus ada minimal 1 angka");

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter")
    .trim(),
  email: z.string().email("Format email tidak valid").toLowerCase().trim(),
  password: passwordSchema,
  phone: z
    .string()
    .regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, "Format nomor HP tidak valid"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
