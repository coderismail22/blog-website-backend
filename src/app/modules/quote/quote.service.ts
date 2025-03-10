import { Quote } from "./quote.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createQuoteInDB = async (payload: { quote: string; author: string }) => {
  const newQuote = await Quote.create(payload);
  return newQuote;
};

const getQuoteFromDB = async (quoteId: string) => {
  const quote = await Quote.findById(quoteId);
  if (!quote) {
    throw new AppError(httpStatus.NOT_FOUND, "Quote not found");
  }
  return quote;
};

const getAllQuotesFromDB = async () => {
  return await Quote.find();
};

const updateQuoteInDB = async (
  quoteId: string,
  payload: Partial<{ quote: string; author: string }>,
) => {
  const updatedQuote = await Quote.findByIdAndUpdate(quoteId, payload, {
    new: true,
    runValidators: true,
  });
  if (!updatedQuote) {
    throw new AppError(httpStatus.NOT_FOUND, "Quote not found");
  }
  return updatedQuote;
};

const deleteQuoteFromDB = async (quoteId: string) => {
  const deletedQuote = await Quote.findByIdAndDelete(quoteId);
  if (!deletedQuote) {
    throw new AppError(httpStatus.NOT_FOUND, "Quote not found");
  }
  return deletedQuote;
};

export const QuoteServices = {
  createQuoteInDB,
  getQuoteFromDB,
  getAllQuotesFromDB,
  updateQuoteInDB,
  deleteQuoteFromDB,
};
