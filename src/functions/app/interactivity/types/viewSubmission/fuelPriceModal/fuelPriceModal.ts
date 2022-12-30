import { ViewSubmissionHandler } from "@functions/app/interactivity/types/viewSubmission/viewSubmission";
import { enqueue, Queue } from "@libs/queue";

export const fuelPriceModalHandler: ViewSubmissionHandler = async (payload) => {
  if (payload.response_urls.length === 0) {
    throw new Error("No response url found");
  }

  const message = {
    destination: {
      url: payload.response_urls[0].response_url,
      method: "post",
    },
  };

  await enqueue(Queue.FUEL_PRICE, JSON.stringify(message));
};
