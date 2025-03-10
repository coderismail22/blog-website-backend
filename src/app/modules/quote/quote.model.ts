import { Schema, model } from "mongoose";
import { IQuote } from "./quote.interface";

const QuoteSchema = new Schema<IQuote>(
  {
    quote: {
      type: String,
      required: [true, "Quote is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Quote = model<IQuote>("Quote", QuoteSchema);
