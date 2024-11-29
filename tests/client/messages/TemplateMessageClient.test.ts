import { describe, it, expect, beforeEach } from "vitest";
import { TemplateMessageClient } from "../../../src/client/messages/TemplateMessageClient";
import { server } from "../../setup";
import { http, HttpResponse } from "msw";

describe("TemplateMessageClient", () => {
  let client: TemplateMessageClient;

  beforeEach(() => {
    client = new TemplateMessageClient({
      accessToken: "test_token",
      phoneNumberId: "test_phone_id",
    });
  });

  describe("sendTemplate", () => {
    it("should send template messages successfully", async () => {
      const to = "1234567890";
      const templateName = "hello_world";
      const languageCode = "en";
      const components = [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: "John",
            },
          ],
        },
      ];

      server.use(
        http.post("*/messages", async ({ request }) => {
          const body = await request.json();
          expect(body).toEqual({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to,
            type: "template",
            template: {
              name: templateName,
              language: {
                code: languageCode,
              },
              components,
            },
          });

          return HttpResponse.json({
            messaging_product: "whatsapp",
            contacts: [{ wa_id: to }],
            messages: [{ id: "test_message_id" }],
          });
        })
      );

      const response = await client.sendTemplate(
        to,
        templateName,
        languageCode,
        components
      );

      expect(response.messaging_product).toBe("whatsapp");
      expect(response.contacts[0].wa_id).toBe(to);
    });
  });
});
