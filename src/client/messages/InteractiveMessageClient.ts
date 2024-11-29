import { BaseClient } from "../BaseClient";
import {
  MessageResponse,
  InteractiveListMessage,
  InteractiveButtonMessage,
  InteractiveProductMessage,
  InteractiveProductListMessage,
  InteractiveFlowMessage,
  InteractiveRatingMessage,
  InteractiveMessage,
} from "../../types";

export class InteractiveMessageClient extends BaseClient {
  /**
   * Sends an interactive message (buttons, lists, etc.)
   * @param to - Recipient's phone number
   * @param interactive - Interactive message configuration
   * @returns Promise with the message response
   * @throws WhatsAppError if the request fails
   */
  async sendInteractive(
    to: string,
    interactive: InteractiveMessage["interactive"]
  ): Promise<MessageResponse> {
    const message: InteractiveMessage = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "interactive",
      interactive,
    };

    return this.sendMessage(message);
  }

  /**
   * Sends a list message with multiple selectable options
   * @param to - Recipient's phone number
   * @param body - Message body text
   * @param buttonText - Text to display on the button
   * @param sections - Array of sections containing rows of options
   * @param header - Optional header text
   * @param footer - Optional footer text
   * @returns Promise with the message response
   */
  async sendListMessage(
    to: string,
    body: string,
    buttonText: string,
    sections: InteractiveListMessage["interactive"]["action"]["sections"],
    header?: { text: string },
    footer?: { text: string }
  ): Promise<MessageResponse> {
    const message: InteractiveListMessage = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "interactive",
      interactive: {
        type: "list",
        body: { text: body },
        action: {
          button: buttonText,
          sections,
        },
      },
    };

    if (header) {
      message.interactive.header = {
        type: "text",
        text: header.text,
      };
    }

    if (footer) {
      message.interactive.footer = footer;
    }

    return this.sendMessage(message);
  }

  /**
   * Sends a message with reply buttons
   * @param to - Recipient's phone number
   * @param body - Message body text
   * @param buttons - Array of button objects
   * @param header - Optional header configuration
   * @param footer - Optional footer text
   * @returns Promise with the message response
   */
  async sendButtonMessage(
    to: string,
    body: string,
    buttons: Array<{ id: string; title: string }>,
    header?: InteractiveButtonMessage["interactive"]["header"],
    footer?: { text: string }
  ): Promise<MessageResponse> {
    const message: InteractiveButtonMessage = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "interactive",
      interactive: {
        type: "button",
        body: { text: body },
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
    };

    if (header) {
      message.interactive.header = header;
    }

    if (footer) {
      message.interactive.footer = footer;
    }

    return this.sendMessage(message);
  }

  /**
   * Sends a single product message
   * @param to - Recipient's phone number
   * @param catalogId - ID of the catalog
   * @param productRetailerId - ID of the product
   * @param body - Optional body text
   * @param footer - Optional footer text
   * @returns Promise with the message response
   */
  async sendProductMessage(
    to: string,
    catalogId: string,
    productRetailerId: string,
    body?: string,
    footer?: { text: string }
  ): Promise<MessageResponse> {
    const message: InteractiveProductMessage = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "interactive",
      interactive: {
        type: "product",
        action: {
          catalog_id: catalogId,
          product_retailer_id: productRetailerId,
        },
      },
    };

    if (body) {
      message.interactive.body = { text: body };
    }

    if (footer) {
      message.interactive.footer = footer;
    }

    return this.sendMessage(message);
  }

  /**
   * Sends a multi-product message
   * @param to - Recipient's phone number
   * @param catalogId - ID of the catalog
   * @param sections - Array of sections containing product items
   * @param headerText - Header text
   * @param bodyText - Body text
   * @param footer - Optional footer text
   * @returns Promise with the message response
   */
  async sendProductListMessage(
    to: string,
    catalogId: string,
    sections: InteractiveProductListMessage["interactive"]["action"]["sections"],
    headerText: string,
    bodyText: string,
    footer?: { text: string }
  ): Promise<MessageResponse> {
    const message: InteractiveProductListMessage = {
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
        action: {
          catalog_id: catalogId,
          sections,
        },
      },
    };

    if (footer) {
      message.interactive.footer = footer;
    }

    return this.sendMessage(message);
  }

  /**
   * Sends a flow message
   * @param to - Recipient's phone number
   * @param flowId - ID of the flow
   * @param flowToken - Flow token
   * @param flowCta - Call to action text
   * @param body - Body text
   * @param header - Optional header text
   * @param footer - Optional footer text
   * @param screen - Optional screen ID for navigation
   * @param data - Optional data for the flow
   * @returns Promise with the message response
   */
  async sendFlowMessage(
    to: string,
    flowId: string,
    flowToken: string,
    flowCta: string,
    body: string,
    header?: { text: string },
    footer?: { text: string },
    screen?: string,
    data?: Record<string, any>
  ): Promise<MessageResponse> {
    const message: InteractiveFlowMessage = {
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
    };

    if (header) {
      message.interactive.header = {
        type: "text",
        text: header.text,
      };
    }

    if (footer) {
      message.interactive.footer = footer;
    }

    if (screen) {
      message.interactive.action.parameters.flow_action = "navigate";
      message.interactive.action.parameters.flow_action_payload = {
        screen,
        ...(data && { data }),
      };
    }

    return this.sendMessage(message);
  }

  /**
   * Sends a rating message
   * @param to - Recipient's phone number
   * @param headerText - Header text
   * @param subText - Sub text for the header
   * @param ratingId - ID for the rating component
   * @returns Promise with the message response
   */
  async sendRatingMessage(
    to: string,
    headerText: string,
    subText: string,
    ratingId: string
  ): Promise<MessageResponse> {
    const message: InteractiveRatingMessage = {
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
    };

    return this.sendMessage(message);
  }
}
