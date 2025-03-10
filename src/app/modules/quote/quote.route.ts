import express from "express";
import { QuoteControllers } from "./quote.controller";
import validateRequest from "../../middlewares/validateRequest";
import { QuoteValidations } from "./quote.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-quote",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(QuoteValidations.createQuoteValidationSchema),
  QuoteControllers.createQuote,
);

router.get("/:quoteId", QuoteControllers.getQuote);
router.get("/", QuoteControllers.getAllQuotes);

router.patch(
  "/update-quote/:quoteId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(QuoteValidations.updateQuoteValidationSchema),
  QuoteControllers.updateQuote,
);

router.delete(
  "/:quoteId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  QuoteControllers.deleteQuote,
);

export const QuoteRoutes = router;
