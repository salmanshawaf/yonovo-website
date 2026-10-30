import type { ComponentType } from "react";
import AverageCollectionPeriod from "./AverageCollectionPeriod";
import AgingReport from "./AgingReport";
import CollectionLetter from "./CollectionLetter";
import DaysSalesOutstanding from "./DaysSalesOutstanding";
import DunningLetter from "./DunningLetter";
import PastDueInvoiceEmail from "./PastDueInvoiceEmail";
import ReceivableTurnover from "./ReceivableTurnover";

export const glossaryContent: Record<string, ComponentType> = {
  "days-sales-outstanding": DaysSalesOutstanding,
  "average-collection-period": AverageCollectionPeriod,
  "accounts-receivable-turnover": ReceivableTurnover,
  "accounts-receivable-aging-report": AgingReport,
  "dunning-letter": DunningLetter,
  "collection-letter": CollectionLetter,
  "past-due-invoice-email": PastDueInvoiceEmail,
};
