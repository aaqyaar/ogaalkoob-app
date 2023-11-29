// Note the syntax of these imports from the date-fns library.
// If you import with the syntax: import { format } from "date-fns" the ENTIRE library
// will be included in your production bundle (even if you only use one function).
// This is because react-native does not support tree-shaking.
import type { Locale } from "date-fns"
import format from "date-fns/format"
import parseISO from "date-fns/parseISO"
import en from "date-fns/locale/en-US"

type Options = Parameters<typeof format>[2]

const getLocale = (): Locale => {
  return en
}

export const formatDate = (date: string, dateFormat?: string, options?: Options) => {
  const locale = getLocale()
  const dateOptions = {
    ...options,
    locale,
  }
  return format(
    parseISO(date || new Date().toLocaleDateString()),
    dateFormat ?? "MMM dd, yyyy",
    dateOptions,
  )
}

// convert date in like 25 years ago
export const fDate = (date: string) => {
  const locale = getLocale()
  const dateOptions = {
    locale,
  }
  // Check if the date is valid and in ISO format
  if (date) {
    return format(parseISO(date), "PP", dateOptions)
  } else {
    // Handle invalid date by returning a default value or current date
    return format(new Date(), "PPP", dateOptions)
  }
}
