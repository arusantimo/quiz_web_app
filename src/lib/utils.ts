import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function replaceSpecialChars(str: string) {
  return str.replace(/&#(\d+);/g, (_, charCode) => {
    return String.fromCharCode(charCode);
  });
}

export const convertMillisecondsToSeconds = (milliseconds: number) => {
  return Math.floor(milliseconds / 1000);
};
