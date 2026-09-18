import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Shared class merger — previously duplicated inside Navbar.tsx. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
