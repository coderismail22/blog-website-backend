import { Request, Response } from "express";
import { QuoteServices } from "./quote.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createQuote = catchAsync(async (req: Request, res: Response) => {
  const result = await QuoteServices.createQuoteInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Quote created successfully!",
    data: result,
  });
});

const getQuote = catchAsync(async (req: Request, res: Response) => {
  const result = await QuoteServices.getQuoteFromDB(req.params.quoteId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Quote retrieved successfully!",
    data: result,
  });
});

const getAllQuotes = catchAsync(async (_req: Request, res: Response) => {
  const result = await QuoteServices.getAllQuotesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All quotes retrieved successfully!",
    data: result,
  });
});

const updateQuote = catchAsync(async (req: Request, res: Response) => {
  const result = await QuoteServices.updateQuoteInDB(
    req.params.quoteId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Quote updated successfully!",
    data: result,
  });
});

const deleteQuote = catchAsync(async (req: Request, res: Response) => {
  await QuoteServices.deleteQuoteFromDB(req.params.quoteId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Quote deleted successfully!",
  });
});

export const QuoteControllers = {
  createQuote,
  getQuote,
  getAllQuotes,
  updateQuote,
  deleteQuote,
};
