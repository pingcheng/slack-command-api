import { ShortcutHandler } from "@functions/app/interactivity/types/shortcut/shortcut";
import axios from "axios";

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
        callback_id: "fuel_price_modal",
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
            type: "input",
            block_id: "block_channel_select",
            element: {
              type: "channels_select",
              placeholder: {
                type: "plain_text",
                text: "Select an channel",
                emoji: true,
              },
              action_id: "channel_select_fuel_price",
              response_url_enabled: true,
              initial_channel: "C8P5XJ8FL",
            },
            label: {
              type: "plain_text",
              text: "Post the result in",
              emoji: true,
            },
          },
          {
            type: "input",
            block_id: "block_fuel_type_select",
            element: {
              type: "static_select",
              action_id: "fuel_type_select_fuel_price",
              placeholder: {
                type: "plain_text",
                text: "Select a fuel type",
              },
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "E10",
                  },
                  value: "E10",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "U91",
                  },
                  value: "U91",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "U95",
                  },
                  value: "U95",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "U98",
                  },
                  value: "U98",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Diesel",
                  },
                  value: "Diesel",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "LPG",
                  },
                  value: "LPG",
                },
              ],
              initial_option: {
                text: {
                  type: "plain_text",
                  text: "U91",
                },
                value: "U91",
              },
            },
            label: {
              type: "plain_text",
              text: "Fuel type",
              emoji: true,
            },
          },
          {
            type: "input",
            block_id: "block_fuel_state_select",
            element: {
              type: "static_select",
              action_id: "fuel_state_select_fuel_state",
              placeholder: {
                type: "plain_text",
                text: "Select a state",
              },
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "All",
                  },
                  value: "all",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "VIC",
                  },
                  value: "vic",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "NSW",
                  },
                  value: "nsw",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "SA",
                  },
                  value: "sa",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "ACT",
                  },
                  value: "act",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "WA",
                  },
                  value: "wa",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "NT",
                  },
                  value: "nt",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "TAS",
                  },
                  value: "tas",
                },
              ],
              initial_option: {
                text: {
                  type: "plain_text",
                  text: "All",
                },
                value: "all",
              },
            },
            label: {
              type: "plain_text",
              text: "State",
              emoji: true,
            },
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
