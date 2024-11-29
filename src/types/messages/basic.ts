export interface TextMessage {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "text";
  text: {
    preview_url?: boolean;
    body: string;
  };
}

export interface MediaMessage {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "image" | "video" | "audio" | "document";
  [key: string]:
    | {
        id?: string;
        link?: string;
        caption?: string;
        filename?: string;
      }
    | string;
}

export interface LocationMessage {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "location";
  location: {
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
  };
}

export interface ContactMessage {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "contacts";
  contacts: Array<{
    name: {
      formatted_name: string;
      first_name: string;
      last_name?: string;
    };
    phones?: Array<{
      phone: string;
      type?: "HOME" | "WORK" | "CELL" | "MAIN" | "IPHONE" | "OTHER";
    }>;
    emails?: Array<{
      email: string;
      type?: "HOME" | "WORK" | "OTHER";
    }>;
  }>;
}

export interface StickerMessage {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "sticker";
  sticker: {
    id?: string;
    link?: string;
  };
}

export interface ReactionMessage {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "reaction";
  reaction: {
    message_id: string;
    emoji: string;
  };
}
