import { ViewSubmissionHandler } from "@functions/app/interactivity/types/viewSubmission/viewSubmission";
import { enqueue, Queue } from "@libs/queue";
import { FuelPriceMessage } from "../../../../../../common/types";

export const fuelPriceModalHandler: ViewSubmissionHandler = async (payload) => {
  if (payload.response_urls.length === 0) {
    throw new Error("No response url found");
  }

  const submittedValues = payload.view.state.values;

  const fuelType =
    submittedValues.block_fuel_type_select.fuel_type_select_fuel_price
      .selected_option.value ?? "U91";

  const message: FuelPriceMessage = {
    destination: {
      url: payload.response_urls[0].response_url,
      method: "post",
    },
    data: {
      fuelType: fuelType,
      publicMessage: true,
    },
  };

  await enqueue(Queue.FUEL_PRICE, JSON.stringify(message));
};
