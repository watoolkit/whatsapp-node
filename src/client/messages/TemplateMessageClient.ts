import { BaseClient } from "../BaseClient";
import { MessageResponse, TemplateMessage } from "../../types";

export class TemplateMessageClient extends BaseClient {
  /**
   * Sends a template message to a WhatsApp user
   * @param to - Recipient's phone number
   * @param templateName - Name of the template to use
   * @param languageCode - Language code for the template (e.g., 'en')
   * @param components - Optional template components for customization
   * @returns Promise with the message response
   * @throws WhatsAppError if the request fails
   */
  async sendTemplate(
    to: string,
    templateName: string,
    languageCode: string,
    components?: TemplateMessage["template"]["components"]
  ): Promise<MessageResponse> {
    const message: TemplateMessage = {
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
    };

    return this.sendMessage(message);
  }
}
