import { z } from "zod";

const createQuoteValidationSchema = z.object({
  body: z.object({
    quote: z.string().min(1, "Quote is required"),
    author: z.string().min(1, "Author is required"),
  }),
});

const updateQuoteValidationSchema = z.object({
  body: z.object({
    quote: z.string().optional(),
    author: z.string().optional(),
  }),
});

export const QuoteValidations = {
  createQuoteValidationSchema,
  updateQuoteValidationSchema,
};
