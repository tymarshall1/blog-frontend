import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function limitCharacters(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength) + "...";
  }
}

export function separateCommas(string: string) {
  const splitArray = string
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return [...new Set(splitArray)];
}

export function timeSince(date: string) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  const yearInterval = seconds / 31536000;
  const monthInterval = seconds / 2592000;
  const dayInterval = seconds / 86400;
  const hourInterval = seconds / 3600;
  const secondsInterval = seconds / 60;

  switch (true) {
    case yearInterval > 1:
      return (
        Math.floor(yearInterval) +
        `${yearInterval <= 2 ? " year" : " years"} ago`
      );
    case monthInterval > 1:
      return (
        Math.floor(monthInterval) +
        `${monthInterval <= 2 ? " month" : " months"} ago`
      );
    case dayInterval > 1:
      return (
        Math.floor(dayInterval) + `${dayInterval <= 2 ? " day" : " days"} ago`
      );
    case hourInterval > 1:
      return (
        Math.floor(hourInterval) +
        `${hourInterval <= 2 ? " hour" : " hours"} ago`
      );
    case secondsInterval > 1:
      return (
        Math.floor(secondsInterval) +
        `${secondsInterval <= 2 ? " minute" : " minutes"} ago`
      );
    default:
      return (
        Math.floor(seconds) + `${seconds <= 2 ? " second" : " seconds"} ago`
      );
  }
}
