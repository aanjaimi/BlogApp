import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetters(string: string) {
  // split the string with space and take the first letter of each word and join them
  return string
    .split(' ')
    .map((word) => word.substring(0, 1).toUpperCase())
    .join('')
}