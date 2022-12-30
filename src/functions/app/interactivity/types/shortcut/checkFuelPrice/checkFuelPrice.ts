import { ShortcutHandler } from "@functions/app/interactivity/types/shortcut/shortcut";
import axios from "axios";
import * as process from "process";

export const checkFuelPrice: ShortcutHandler = async (triggerId) => {
  const response = await axios.request({
    method: "post",
    url: "https://slack.com/api/views.open",
    headers: {
      Authorization: `Bearer ${process.env.SLACK_ACCESS_TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    data: {
      trigger_id: triggerId,
      view: {
        title: {
          type: "plain_text",
          text: "Lowest fuel price",
        },
        submit: {
          type: "plain_text",
          text: "Submit",
        },
        blocks: [
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "Click submit to get info for the lowest fuel price",
              emoji: true,
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "conversations_select",
                response_url_enabled: true,
                default_to_current_conversation: true,
                placeholder: {
                  type: "plain_text",
                  text: "Select private conversation",
                  emoji: true,
                },
                filter: {
                  include: ["private"],
                },
                action_id: "conversations_select_fuel_price_modal",
              },
            ],
          },
        ],
        type: "modal",
      },
    },
  });

  if (response.status !== 200) {
    console.error("Failed to call slack to open a modal", response);
    throw new Error("Failed to make modal call");
  }

  return;
};
