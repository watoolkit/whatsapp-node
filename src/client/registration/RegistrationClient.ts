import { BaseClient } from "../BaseClient";
import { RegistrationResponse, RegistrationData } from "../../types";

export class RegistrationClient extends BaseClient {
  /**
   * Registers a phone number with WhatsApp Business API
   * @param pin - 6-digit PIN for two-step verification
   * @param dataLocalizationRegion - Optional 2-letter ISO 3166 country code for local storage
   * @returns Promise with the registration response
   * @throws WhatsAppError if the request fails or rate limit is reached (10 requests per 72 hours)
   */
  async registerPhone(
    pin: string,
    dataLocalizationRegion?: string
  ): Promise<RegistrationResponse> {
    const data: RegistrationData = {
      messaging_product: "whatsapp",
      pin,
    };

    if (dataLocalizationRegion) {
      data.data_localization_region = dataLocalizationRegion;
    }

    return this.makeRequest<RegistrationResponse>(
      "post",
      `/${this.phoneNumberId}/register`,
      data
    );
  }

  /**
   * Deregisters a phone number from WhatsApp Business API
   * @returns Promise with the deregistration response
   * @throws WhatsAppError if the request fails
   */
  async deregisterPhone(): Promise<RegistrationResponse> {
    return this.makeRequest<RegistrationResponse>(
      "post",
      `/${this.phoneNumberId}/deregister`
    );
  }
}
