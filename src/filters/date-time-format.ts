import { format, formatRelative } from "date-fns";

export default (value: string | Date, fmt?: string): string => {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.valueOf())) {
    // invalid date
    return "";
  }

  if (fmt === "human") {
    return formatRelative(date, new Date());
  }

  if (!fmt) {
    fmt = "DD MMM YYYY";
  }

  return format(date, fmt);
};