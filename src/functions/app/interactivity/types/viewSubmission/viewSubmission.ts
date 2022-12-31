import { InteractivityHandler } from "@functions/app/interactivity/handler";
import { fuelPriceModalHandler } from "@functions/app/interactivity/types/viewSubmission/fuelPriceModal/fuelPriceModal";
import { KeyValueMap } from "../../../../../common/types";

export type ViewSubmissionPayload = {
  view: {
    callback_id: string;
    state: {
      values: KeyValueMap;
    };
  };
  response_urls: {
    response_url: string;
  }[];
};

export type ViewSubmissionHandler = (
  payload: ViewSubmissionPayload
) => Promise<void>;

const handlers: Record<string, ViewSubmissionHandler> = {
  fuel_price_modal: fuelPriceModalHandler,
};

export const viewSubmissionHandler: InteractivityHandler = async (
  payload
): Promise<void> => {
  const message = JSON.parse(payload) as ViewSubmissionPayload;

  const callbackId = message.view.callback_id;
  const handler = handlers[callbackId];

  if (!handler) {
    throw new Error(
      `No handler for this view_submission callback - "${callbackId}"`
    );
  }

  await handler(message);
};
