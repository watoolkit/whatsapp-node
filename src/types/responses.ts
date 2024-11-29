export interface MessageResponse {
  messaging_product: string;
  contacts: Array<{ wa_id: string }>;
  messages: Array<{ id: string }>;
}

export interface RegistrationResponse {
  success: boolean;
}

export interface RegistrationData {
  messaging_product: "whatsapp";
  pin: string;
  data_localization_region?: string;
}
