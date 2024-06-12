import { Timestamp } from "firebase/firestore";
import { z } from "zod";

const MIN_DATE = new Date("1800-01-01");

export const TimestampType = z.custom<Timestamp>((value) => {
  if (!(value instanceof Date)) {
    return false;
  }

  // Convert Date to Timestamp
  const timestamp = Timestamp.fromDate(value);

  return timestamp.toDate() >= MIN_DATE;
}, "Timestamp must be after January 1st, 1800");
