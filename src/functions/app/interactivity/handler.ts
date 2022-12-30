import { shortcutHandler } from "@functions/app/interactivity/types/shortcut/shortcut";

export type InteractivityHandler = (payload: string) => Promise<void>;

const handlers: Record<string, InteractivityHandler> = {
  shortcut: shortcutHandler,
};

export const handle = async (type: string, payload: string) => {
  const handler = handlers[type];

  if (!handler) {
    throw new Error(`${type} is not supported yet`);
  }

  await handler(payload);
};
