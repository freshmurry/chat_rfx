import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "react-toastify";

export function showToast(message: string) {
  toast(message);
}

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function getPDFFileNameFromURL(url: string) {
  //Use a regulare expression to etract the file na,e from the URL
  const matches = url.match(/\/([^/?#]+)[^/]*$/);
  
  if (matches && matches.length > 1) {
    const fileNameWithExtension = matches[1];
    const fileExtenstion = fileNameWithExtension.split(".").pop();

    if (fileExtenstion?.toLowerCase() === "pdf") {
      return fileNameWithExtension;
    }
  }

  // Return null if the URL doesn't point to a PDF file
  return null;
}