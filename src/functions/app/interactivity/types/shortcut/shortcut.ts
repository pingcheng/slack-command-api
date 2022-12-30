import { InteractivityHandler } from "@functions/app/interactivity/handler";
import { checkFuelPrice } from "@functions/app/interactivity/types/shortcut/checkFuelPrice/checkFuelPrice";

export type ShortcutHandler = (triggerId: string) => Promise<void>;

const shortcutHandlers: Record<string, ShortcutHandler> = {
  check_fuel_price: checkFuelPrice,
};

export const shortcutHandler: InteractivityHandler = async (
  payload
): Promise<void> => {
  const message = JSON.parse(payload);

  const triggerId = message.trigger_id;
  const callbackId = message.callback_id;

  const handler = shortcutHandlers[callbackId];
  if (!handler) {
    throw new Error(`No handler for this callback - "${callbackId}"`);
  }

  await handler(triggerId);

  return;
};
