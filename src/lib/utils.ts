import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const COUNTRY_CODES : Record<string, string> = {
  "Argentina": "AR",
  "Bolivia": "BO",
  "Brazil": "BR",
  "Chile": "CL",
  "Colombia": "CO",
  "Ecuador": "EC",
  "Guyana": "GY",
  "Paraguay": "PY",
  "Peru": "PE",
  "Suriname": "SR",
  "Uruguay": "UY",
  "Venezuela": "VE"
}