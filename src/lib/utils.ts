import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractApiErrors(
  error: unknown,
): Record<string, string> | null {
  const data = (
    error as { response?: { data?: { errors?: Record<string, string[]> } } }
  )?.response?.data?.errors;
  if (!data) return null;
  // Flatten first error per field
  return Object.fromEntries(
    Object.entries(data).map(([field, msgs]) => [field, msgs[0]]),
  );
}
