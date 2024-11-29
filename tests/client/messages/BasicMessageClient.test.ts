import { describe, it, expect, beforeEach } from "vitest";
import { BasicMessageClient } from "../../../src/client/messages/BasicMessageClient";
import { server } from "../../setup";
import { http, HttpResponse } from "msw";

describe("BasicMessageClient", () => {
  let client: BasicMessageClient;

  beforeEach(() => {
    client = new BasicMessageClient({
      accessToken: "test_token",
      phoneNumberId: "test_phone_id",
    });
  });

  describe("sendMedia", () => {
    it("should send media messages successfully", async () => {
      const to = "1234567890";
      const mediaTypes = ["image", "video", "audio", "document"] as const;

      for (const type of mediaTypes) {
        server.use(
          http.post("*/messages", async ({ request }) => {
            const body = await request.json();
            expect(body).toEqual({
              messaging_product: "whatsapp",
              recipient_type: "individual",
              to,
              type,
              [type]: {
                link: "https://example.com/media.jpg",
                caption: "Test caption",
              },
            });

            return HttpResponse.json({
              messaging_product: "whatsapp",
              contacts: [{ wa_id: to }],
              messages: [{ id: "test_message_id" }],
            });
          })
        );

        const response = await client.sendMedia(to, type, {
          link: "https://example.com/media.jpg",
          caption: "Test caption",
        });

        expect(response.messaging_product).toBe("whatsapp");
        expect(response.contacts[0].wa_id).toBe(to);
      }
    });
  });

  describe("sendLocation", () => {
    it("should send location messages successfully", async () => {
      const to = "1234567890";
      const latitude = 37.422;
      const longitude = -122.084;
      const name = "Googleplex";
      const address = "1600 Amphitheatre Parkway";

      server.use(
        http.post("*/messages", async ({ request }) => {
          const body = await request.json();
          expect(body).toEqual({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to,
            type: "location",
            location: {
              latitude,
              longitude,
              name,
              address,
            },
          });

          return HttpResponse.json({
            messaging_product: "whatsapp",
            contacts: [{ wa_id: to }],
            messages: [{ id: "test_message_id" }],
          });
        })
      );

      const response = await client.sendLocation(
        to,
        latitude,
        longitude,
        name,
        address
      );

      expect(response.messaging_product).toBe("whatsapp");
      expect(response.contacts[0].wa_id).toBe(to);
    });
  });

  describe("sendContact", () => {
    it("should send contact messages successfully", async () => {
      const to = "1234567890";
      const contacts = [
        {
          name: {
            formatted_name: "John Doe",
            first_name: "John",
            last_name: "Doe",
          },
          phones: [
            {
              phone: "+1234567890",
              type: "CELL",
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
            type: "contacts",
            contacts,
          });

          return HttpResponse.json({
            messaging_product: "whatsapp",
            contacts: [{ wa_id: to }],
            messages: [{ id: "test_message_id" }],
          });
        })
      );

      const response = await client.sendContact(to, contacts);

      expect(response.messaging_product).toBe("whatsapp");
      expect(response.contacts[0].wa_id).toBe(to);
    });
  });

  describe("sendReaction", () => {
    it("should send reaction messages successfully", async () => {
      const to = "1234567890";
      const messageId = "original_message_id";
      const emoji = "👍";

      server.use(
        http.post("*/messages", async ({ request }) => {
          const body = await request.json();
          expect(body).toEqual({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to,
            type: "reaction",
            reaction: {
              message_id: messageId,
              emoji,
            },
          });

          return HttpResponse.json({
            messaging_product: "whatsapp",
            contacts: [{ wa_id: to }],
            messages: [{ id: "test_message_id" }],
          });
        })
      );

      const response = await client.sendReaction(to, messageId, emoji);

      expect(response.messaging_product).toBe("whatsapp");
      expect(response.contacts[0].wa_id).toBe(to);
    });
  });
});
