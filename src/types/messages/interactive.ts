export interface InteractiveAction {
  button: string;
  sections: Array<{
    title?: string;
    rows: Array<{ id: string; title: string; description?: string }>;
  }>;
}

export interface InteractiveParameters {
  version: string;
  layout: Array<{ type: "Rating"; rating_type: "STAR_RATING"; id: string }>;
}

export interface InteractiveListMessage {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "interactive";
  interactive: {
    type: "list";
    header?: {
      type: "text";
      text: string;
    };
    body: {
      text: string;
    };
    footer?: {
      text: string;
    };
    action: {
      button: string;
      sections: Array<{
        title?: string;
        rows: Array<{
          id: string;
          title: string;
          description?: string;
        }>;
      }>;
    };
  };
}

export interface InteractiveButtonMessage {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "interactive";
  interactive: {
    type: "button";
    header?: {
      type: "text" | "video" | "image" | "document";
      text?: string;
      video?: { link: string };
      image?: { link: string };
      document?: { link: string };
    };
    body: {
      text: string;
    };
    footer?: {
      text: string;
    };
    action: {
      buttons: Array<{
        type: "reply";
        reply: {
          id: string;
          title: string;
        };
      }>;
    };
  };
}

export interface InteractiveProductMessage {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "interactive";
  interactive: {
    type: "product";
    body?: {
      text: string;
    };
    footer?: {
      text: string;
    };
    action: {
      catalog_id: string;
      product_retailer_id: string;
    };
  };
}

export interface InteractiveProductListMessage {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "interactive";
  interactive: {
    type: "product_list";
    header: {
      type: "text";
      text: string;
    };
    body: {
      text: string;
    };
    footer?: {
      text: string;
    };
    action: {
      catalog_id: string;
      sections: Array<{
        title: string;
        product_items: Array<{
          product_retailer_id: string;
        }>;
      }>;
    };
  };
}

export interface InteractiveFlowMessage {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "interactive";
  interactive: {
    type: "flow";
    header?: {
      type: "text";
      text: string;
    };
    body: {
      text: string;
    };
    footer?: {
      text: string;
    };
    action: {
      parameters: {
        flow_message_version: string;
        flow_token: string;
        flow_id: string;
        flow_cta: string;
        flow_action?: "navigate" | "data_exchange";
        flow_action_payload?: {
          screen: string;
          data?: Record<string, any>;
        };
      };
    };
  };
}

export interface InteractiveRatingMessage {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "interactive";
  interactive: {
    type: "form_message";
    header: {
      type: "text";
      text: string;
      sub_text: string;
    };
    parameters: {
      version: string;
      layout: Array<{
        type: "Rating";
        rating_type: "STAR_RATING";
        id: string;
      }>;
    };
    action: {
      name: "form_message";
    };
  };
}

export interface InteractiveMessage {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "interactive";
  interactive: {
    type:
      | "list"
      | "button"
      | "product"
      | "product_list"
      | "flow"
      | "form_message";
    header?: {
      type: "text" | "video" | "image" | "document";
      text?: string;
      video?: { link: string };
      image?: { link: string };
      document?: { link: string };
    };
    body?: {
      text: string;
    };
    footer?: {
      text: string;
    };
    action?: {
      button?: string;
      buttons?: Array<{
        type: "reply";
        reply: {
          id: string;
          title: string;
        };
      }>;
      sections?: Array<{
        title?: string;
        rows: Array<{
          id: string;
          title: string;
          description?: string;
        }>;
      }>;
      catalog_id?: string;
      product_retailer_id?: string;
      parameters?: {
        flow_message_version?: string;
        flow_token?: string;
        flow_id?: string;
        flow_cta?: string;
        flow_action?: "navigate" | "data_exchange";
        flow_action_payload?: {
          screen: string;
          data?: Record<string, any>;
        };
        version?: string;
      };
    };
    parameters?: {
      version: string;
      layout: Array<{
        type: "Rating";
        rating_type: "STAR_RATING";
        id: string;
      }>;
    };
  };
}
