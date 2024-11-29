import { BaseClient } from "../BaseClient";
import {
  MessageResponse,
  TextMessage,
  MediaMessage,
  LocationMessage,
  ContactMessage,
  StickerMessage,
  ReactionMessage,
} from "../../types";

export class BasicMessageClient extends BaseClient {
  /**
   * Sends a text message to a WhatsApp user
   * @param to - Recipient's phone number
   * @param text - Message text content
   * @returns Promise with the message response
   * @throws WhatsAppError if the request fails
   */
  async sendTextMessage(to: string, text: string): Promise<MessageResponse> {
    const message: TextMessage = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "text",
      text: {
        body: text,
      },
    };

    return this.sendMessage(message);
  }

  /**
   * Sends a media message to a WhatsApp user
   * @param to - Recipient's phone number
   * @param type - Type of media ('image', 'video', 'audio', 'document')
   * @param mediaInput - Media content details
   * @param mediaInput.id - Media ID (if uploaded to WhatsApp)
   * @param mediaInput.link - Public URL of the media
   * @param mediaInput.caption - Optional caption for the media
   * @param mediaInput.filename - Optional filename for documents
   * @returns Promise with the message response
   * @throws WhatsAppError if the request fails
   */
  async sendMedia(
    to: string,
    type: "image" | "video" | "audio" | "document",
    mediaInput: {
      id?: string;
      link?: string;
      caption?: string;
      filename?: string;
    }
  ): Promise<MessageResponse> {
    const message: MediaMessage = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type,
      [type]: mediaInput,
    };

    return this.sendMessage(message);
  }

  /**
   * Sends a location message to a WhatsApp user
   * @param to - Recipient's phone number
   * @param latitude - Location latitude
   * @param longitude - Location longitude
   * @param name - Optional location name
   * @param address - Optional location address
   * @returns Promise with the message response
   * @throws WhatsAppError if the request fails
   */
  async sendLocation(
    to: string,
    latitude: number,
    longitude: number,
    name?: string,
    address?: string
  ): Promise<MessageResponse> {
    const message: LocationMessage = {
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
    };

    return this.sendMessage(message);
  }

  /**
   * Sends contact information to a WhatsApp user
   * @param to - Recipient's phone number
   * @param contacts - Array of contact information
   * @returns Promise with the message response
   * @throws WhatsAppError if the request fails
   */
  async sendContact(
    to: string,
    contacts: ContactMessage["contacts"]
  ): Promise<MessageResponse> {
    const message: ContactMessage = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "contacts",
      contacts,
    };

    return this.sendMessage(message);
  }

  /**
   * Sends a sticker message
   * @param to - Recipient's phone number
   * @param sticker - Sticker content (id or link)
   * @returns Promise with the message response
   * @throws WhatsAppError if the request fails
   */
  async sendSticker(
    to: string,
    sticker: { id?: string; link?: string }
  ): Promise<MessageResponse> {
    const message: StickerMessage = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "sticker",
      sticker,
    };

    return this.sendMessage(message);
  }

  /**
   * Sends a reaction to a message
   * @param to - Recipient's phone number
   * @param messageId - ID of the message to react to
   * @param emoji - Emoji to send as reaction
   * @returns Promise with the message response
   * @throws WhatsAppError if the request fails
   */
  async sendReaction(
    to: string,
    messageId: string,
    emoji: string
  ): Promise<MessageResponse> {
    const message: ReactionMessage = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "reaction",
      reaction: {
        message_id: messageId,
        emoji: emoji,
      },
    };

    return this.sendMessage(message);
  }
}
