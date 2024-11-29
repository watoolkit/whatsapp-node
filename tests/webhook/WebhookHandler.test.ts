import { describe, it, expect, vi, beforeEach } from "vitest";
import { WebhookHandler } from "../../src/webhook/WebhookHandler";
import { WebhookMessage, WebhookMessageType } from "../../src/types/webhook";

describe("WebhookHandler", () => {
  let webhookHandler: WebhookHandler;

  beforeEach(() => {
    webhookHandler = new WebhookHandler();
  });

  describe("handleWebhook", () => {
    it("should handle text messages correctly", () => {
      const mockHandler = vi.fn();
      webhookHandler.onMessageType("text", mockHandler);

      const textMessage: WebhookMessage = {
        object: "whatsapp_business_account",
        entry: [
          {
            id: "WHATSAPP_BUSINESS_ACCOUNT_ID",
            changes: [
              {
                value: {
                  messaging_product: "whatsapp",
                  metadata: {
                    display_phone_number: "1234567890",
                    phone_number_id: "PHONE_NUMBER_ID",
                  },
                  contacts: [
                    {
                      profile: {
                        name: "Test User",
                      },
                      wa_id: "1234567890",
                    },
                  ],
                  messages: [
                    {
                      from: "1234567890",
                      id: "message_id",
                      timestamp: "1234567890",
                      text: {
                        body: "Hello, World!",
                      },
                      type: "text",
                    },
                  ],
                },
                field: "messages",
              },
            ],
          },
        ],
      };

      webhookHandler.handleWebhook(textMessage);

      expect(mockHandler).toHaveBeenCalledWith(
        textMessage.entry[0].changes[0].value.messages[0]
      );
    });

    it("should handle message status updates correctly", () => {
      const mockHandler = vi.fn();
      webhookHandler.onStatus(mockHandler);

      const statusUpdate: WebhookMessage = {
        object: "whatsapp_business_account",
        entry: [
          {
            id: "WHATSAPP_BUSINESS_ACCOUNT_ID",
            changes: [
              {
                value: {
                  messaging_product: "whatsapp",
                  metadata: {
                    display_phone_number: "1234567890",
                    phone_number_id: "PHONE_NUMBER_ID",
                  },
                  statuses: [
                    {
                      id: "message_id",
                      status: "delivered",
                      timestamp: "1234567890",
                      recipient_id: "1234567890",
                    },
                  ],
                },
                field: "messages",
              },
            ],
          },
        ],
      };

      webhookHandler.handleWebhook(statusUpdate);

      expect(mockHandler).toHaveBeenCalledWith(
        statusUpdate.entry[0].changes[0].value.statuses[0]
      );
    });

    it("should handle multiple message types correctly", () => {
      // Arrange
      const messageTypes: WebhookMessageType[] = [
        "text",
        "image",
        "video",
        "audio",
        "document",
        "location",
        "contacts",
        "interactive",
        "button",
        "reaction",
        "sticker",
        "order",
        "system",
      ];

      const handlers = new Map<WebhookMessageType, vi.Mock>();
      messageTypes.forEach((type) => {
        const handler = vi.fn();
        handlers.set(type, handler);
        webhookHandler.onMessageType(type, handler);
      });

      const messages = messageTypes.map((type) => ({
        from: "1234567890",
        id: `message_id_${type}`,
        timestamp: "1234567890",
        type,
        [type]: {
          /* type-specific payload */
        },
      }));

      const webhook: WebhookMessage = {
        object: "whatsapp_business_account",
        entry: [
          {
            id: "WHATSAPP_BUSINESS_ACCOUNT_ID",
            changes: [
              {
                value: {
                  messaging_product: "whatsapp",
                  metadata: {
                    display_phone_number: "1234567890",
                    phone_number_id: "PHONE_NUMBER_ID",
                  },
                  contacts: [
                    {
                      profile: {
                        name: "Test User",
                      },
                      wa_id: "1234567890",
                    },
                  ],
                  messages,
                },
                field: "messages",
              },
            ],
          },
        ],
      };

      webhookHandler.handleWebhook(webhook);

      messages.forEach((message, index) => {
        const handler = handlers.get(messageTypes[index]);
        expect(handler).toHaveBeenCalledWith(message);
      });
    });

    it("should throw error for invalid webhook payload", () => {
      const invalidPayload = {
        object: "invalid",
        entry: [],
      };

      expect(() => {
        webhookHandler.handleWebhook(invalidPayload as any);
      }).toThrow("Invalid webhook payload");
    });

    it("should handle interactive messages with different types", () => {
      const interactiveTypes = [
        { type: "button_reply", button: { id: "btn1", title: "Button 1" } },
        { type: "list_reply", list: { id: "item1", title: "Item 1" } },
      ];

      interactiveTypes.forEach((interactiveType) => {
        const webhookHandler = new WebhookHandler();
        const mockHandler = vi.fn();
        webhookHandler.onMessageType("interactive", mockHandler);

        const message: WebhookMessage = {
          object: "whatsapp_business_account",
          entry: [
            {
              id: "WHATSAPP_BUSINESS_ACCOUNT_ID",
              changes: [
                {
                  value: {
                    messaging_product: "whatsapp",
                    metadata: {
                      display_phone_number: "1234567890",
                      phone_number_id: "PHONE_NUMBER_ID",
                    },
                    contacts: [
                      {
                        profile: {
                          name: "Test User",
                        },
                        wa_id: "1234567890",
                      },
                    ],
                    messages: [
                      {
                        from: "1234567890",
                        id: "message_id",
                        timestamp: "1234567890",
                        type: "interactive",
                        interactive: interactiveType,
                      },
                    ],
                  },
                  field: "messages",
                },
              ],
            },
          ],
        };

        webhookHandler.handleWebhook(message);

        expect(mockHandler).toHaveBeenCalledTimes(1);
        expect(mockHandler).toHaveBeenCalledWith(
          message.entry[0].changes[0].value.messages[0]
        );
      });
    });
  });
});
