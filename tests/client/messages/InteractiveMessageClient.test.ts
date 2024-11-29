import { describe, it, expect, beforeEach } from "vitest";
import { InteractiveMessageClient } from "../../../src/client/messages/InteractiveMessageClient";
import { server } from "../../setup";
import { http, HttpResponse } from "msw";

describe("InteractiveMessageClient", () => {
  let client: InteractiveMessageClient;

  beforeEach(() => {
    client = new InteractiveMessageClient({
      accessToken: "test_token",
      phoneNumberId: "test_phone_id",
    });
  });

  describe("sendListMessage", () => {
    it("should send list messages successfully", async () => {
      const to = "1234567890";
      const body = "Please select an option";
      const buttonText = "View Options";
      const sections = [
        {
          title: "Section 1",
          rows: [
            { id: "1", title: "Option 1", description: "Description 1" },
            { id: "2", title: "Option 2", description: "Description 2" },
          ],
        },
      ];
      const header = { text: "List Header" };
      const footer = { text: "List Footer" };

      server.use(
        http.post("*/messages", async ({ request }) => {
          const requestBody = await request.json();
          expect(requestBody).toEqual({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to,
            type: "interactive",
            interactive: {
              type: "list",
              header: {
                type: "text",
                text: header.text,
              },
              body: { text: body },
              footer,
              action: {
                button: buttonText,
                sections,
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

      const response = await client.sendListMessage(
        to,
        body,
        buttonText,
        sections,
        header,
        footer
      );

      expect(response.messaging_product).toBe("whatsapp");
      expect(response.contacts[0].wa_id).toBe(to);
    });
  });

  describe("sendButtonMessage", () => {
    it("should send button messages successfully", async () => {
      const to = "1234567890";
      const body = "Please select a button";
      const buttons = [
        { id: "btn1", title: "Button 1" },
        { id: "btn2", title: "Button 2" },
      ];
      const header = { type: "text", text: "Button Header" };
      const footer = { text: "Button Footer" };

      server.use(
        http.post("*/messages", async ({ request }) => {
          const requestBody = await request.json();
          expect(requestBody).toEqual({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to,
            type: "interactive",
            interactive: {
              type: "button",
              header,
              body: { text: body },
              footer,
              action: {
                buttons: buttons.map((button) => ({
                  type: "reply",
                  reply: {
                    id: button.id,
                    title: button.title,
                  },
                })),
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

      const response = await client.sendButtonMessage(
        to,
        body,
        buttons,
        header,
        footer
      );

      expect(response.messaging_product).toBe("whatsapp");
      expect(response.contacts[0].wa_id).toBe(to);
    });
  });

  describe("sendProductMessage", () => {
    it("should send single product messages successfully", async () => {
      const to = "1234567890";
      const catalogId = "catalog123";
      const productRetailerId = "product123";
      const body = "Check out this product";
      const footer = { text: "Product Footer" };

      server.use(
        http.post("*/messages", async ({ request }) => {
          const requestBody = await request.json();
          expect(requestBody).toEqual({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to,
            type: "interactive",
            interactive: {
              type: "product",
              body: { text: body },
              footer,
              action: {
                catalog_id: catalogId,
                product_retailer_id: productRetailerId,
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

      const response = await client.sendProductMessage(
        to,
        catalogId,
        productRetailerId,
        body,
        footer
      );

      expect(response.messaging_product).toBe("whatsapp");
      expect(response.contacts[0].wa_id).toBe(to);
    });
  });

  describe("sendProductListMessage", () => {
    it("should send product list messages successfully", async () => {
      const to = "1234567890";
      const catalogId = "catalog123";
      const sections = [
        {
          title: "Popular Products",
          product_items: [
            { product_retailer_id: "product1" },
            { product_retailer_id: "product2" },
          ],
        },
      ];
      const headerText = "Our Products";
      const bodyText = "Check out our products";
      const footer = { text: "Product List Footer" };

      server.use(
        http.post("*/messages", async ({ request }) => {
          const requestBody = await request.json();
          expect(requestBody).toEqual({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to,
            type: "interactive",
            interactive: {
              type: "product_list",
              header: {
                type: "text",
                text: headerText,
              },
              body: {
                text: bodyText,
              },
              footer,
              action: {
                catalog_id: catalogId,
                sections,
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

      const response = await client.sendProductListMessage(
        to,
        catalogId,
        sections,
        headerText,
        bodyText,
        footer
      );

      expect(response.messaging_product).toBe("whatsapp");
      expect(response.contacts[0].wa_id).toBe(to);
    });
  });

  describe("sendFlowMessage", () => {
    it("should send flow messages successfully", async () => {
      const to = "1234567890";
      const flowId = "flow123";
      const flowToken = "token123";
      const flowCta = "Start Flow";
      const body = "Please start the flow";
      const header = { text: "Flow Header" };
      const footer = { text: "Flow Footer" };
      const screen = "screen1";
      const data = { key: "value" };

      server.use(
        http.post("*/messages", async ({ request }) => {
          const requestBody = await request.json();
          expect(requestBody).toEqual({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to,
            type: "interactive",
            interactive: {
              type: "flow",
              header: {
                type: "text",
                text: header.text,
              },
              body: {
                text: body,
              },
              footer,
              action: {
                parameters: {
                  flow_message_version: "3",
                  flow_token: flowToken,
                  flow_id: flowId,
                  flow_cta: flowCta,
                  flow_action: "navigate",
                  flow_action_payload: {
                    screen,
                    data,
                  },
                },
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

      const response = await client.sendFlowMessage(
        to,
        flowId,
        flowToken,
        flowCta,
        body,
        header,
        footer,
        screen,
        data
      );

      expect(response.messaging_product).toBe("whatsapp");
      expect(response.contacts[0].wa_id).toBe(to);
    });

    it("should send flow messages without optional parameters", async () => {
      const to = "1234567890";
      const flowId = "flow123";
      const flowToken = "token123";
      const flowCta = "Start Flow";
      const body = "Please start the flow";

      server.use(
        http.post("*/messages", async ({ request }) => {
          const requestBody = await request.json();
          expect(requestBody).toEqual({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to,
            type: "interactive",
            interactive: {
              type: "flow",
              body: {
                text: body,
              },
              action: {
                parameters: {
                  flow_message_version: "3",
                  flow_token: flowToken,
                  flow_id: flowId,
                  flow_cta: flowCta,
                },
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

      const response = await client.sendFlowMessage(
        to,
        flowId,
        flowToken,
        flowCta,
        body
      );

      expect(response.messaging_product).toBe("whatsapp");
      expect(response.contacts[0].wa_id).toBe(to);
    });
  });

  describe("sendRatingMessage", () => {
    it("should send rating messages successfully", async () => {
      const to = "1234567890";
      const headerText = "Rate our service";
      const subText = "Please rate your experience";
      const ratingId = "rating123";

      server.use(
        http.post("*/messages", async ({ request }) => {
          const requestBody = await request.json();
          expect(requestBody).toEqual({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to,
            type: "interactive",
            interactive: {
              type: "form_message",
              header: {
                type: "text",
                text: headerText,
                sub_text: subText,
              },
              parameters: {
                version: "1",
                layout: [
                  {
                    type: "Rating",
                    rating_type: "STAR_RATING",
                    id: ratingId,
                  },
                ],
              },
              action: {
                name: "form_message",
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

      const response = await client.sendRatingMessage(
        to,
        headerText,
        subText,
        ratingId
      );

      expect(response.messaging_product).toBe("whatsapp");
      expect(response.contacts[0].wa_id).toBe(to);
    });
  });
});
