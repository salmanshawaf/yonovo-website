import type { ComponentType } from "react";
import AverageCollectionPeriod from "./AverageCollectionPeriod";
import AgingReport from "./AgingReport";
import CollectionLetter from "./CollectionLetter";
import DaysSalesOutstanding from "./DaysSalesOutstanding";
import ReceivableTurnover from "./ReceivableTurnover";

export const glossaryContent: Record<string, ComponentType> = {
  "days-sales-outstanding": DaysSalesOutstanding,
  "average-collection-period": AverageCollectionPeriod,
  "accounts-receivable-turnover": ReceivableTurnover,
  "accounts-receivable-aging-report": AgingReport,
  "collection-letter": CollectionLetter,
};
