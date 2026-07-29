import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const phoneRegex = /^01[0125][0-9]{8}$/;

export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;