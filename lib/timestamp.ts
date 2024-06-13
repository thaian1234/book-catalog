import { Timestamp } from "firebase/firestore";
import { z } from "zod";

const MIN_DATE = new Date("1800-01-01");

export const TimestampType = z.custom<Timestamp>((value) => {
  if (value instanceof Timestamp) {
    const timestamp = value.toDate();
    return value;
  }

  // // Convert Date to Timestamp
  // const timestamp = Timestamp.fromDate(value);

  // return timestamp.toDate();
  return false;
}, "Timestamp must be after January 1st, 1800");
