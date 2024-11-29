export interface TemplateMessage {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "template";
  template: {
    name: string;
    language: {
      code: string;
    };
    components?: Array<{
      type: "body" | "header" | "button";
      parameters: Array<{
        type:
          | "text"
          | "currency"
          | "date_time"
          | "image"
          | "document"
          | "video";
        text?: string;
        currency?: {
          fallback_value: string;
          code: string;
          amount_1000: number;
        };
        date_time?: {
          fallback_value: string;
        };
        image?: {
          link: string;
        };
      }>;
    }>;
  };
}
