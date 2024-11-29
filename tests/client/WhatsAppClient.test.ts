import { describe, it, expect, beforeEach } from "vitest";
import { WhatsAppClient } from "../../src/client/WhatsAppClient";
import { server } from "../setup";
import { http, HttpResponse } from "msw";

describe("WhatsAppClient", () => {
  let client: WhatsAppClient;

  beforeEach(() => {
    client = new WhatsAppClient({
      accessToken: "test_token",
      phoneNumberId: "test_phone_id",
    });
  });

  describe("sendTextMessage", () => {
    it("should send a text message successfully", async () => {
      // Arrange
      const to = "1234567890";
      const text = "Hello, World!";

      server.use(
        http.post("*/messages", async ({ request }) => {
          const body = await request.json();
          expect(body).toEqual({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to,
            type: "text",
            text: { body: text },
          });

          return HttpResponse.json({
            messaging_product: "whatsapp",
            contacts: [{ wa_id: to }],
            messages: [{ id: "test_message_id" }],
          });
        })
      );

      // Act
      const response = await client.sendTextMessage(to, text);

      // Assert
      expect(response).toEqual({
        messaging_product: "whatsapp",
        contacts: [{ wa_id: to }],
        messages: [{ id: "test_message_id" }],
      });
    });

    it("should handle API errors correctly", async () => {
      // Arrange
      server.use(
        http.post("*/messages", () => {
          return new HttpResponse(null, {
            status: 400,
            statusText: "Bad Request",
          });
        })
      );

      // Act & Assert
      await expect(
        client.sendTextMessage("1234567890", "Hello")
      ).rejects.toThrow();
    });
  });

  describe("sendTemplate", () => {
    it("should send a template message successfully", async () => {
      // Arrange
      const to = "1234567890";
      const templateName = "hello_world";
      const languageCode = "en";

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
            },
          });

          return HttpResponse.json({
            messaging_product: "whatsapp",
            contacts: [{ wa_id: to }],
            messages: [{ id: "test_message_id" }],
          });
        })
      );

      // Act
      const response = await client.sendTemplate(
        to,
        templateName,
        languageCode
      );

      // Assert
      expect(response).toEqual({
        messaging_product: "whatsapp",
        contacts: [{ wa_id: to }],
        messages: [{ id: "test_message_id" }],
      });
    });
  });
});
