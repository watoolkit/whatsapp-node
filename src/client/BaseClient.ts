import { WhatsAppClientConfig, MessageResponse } from "../types";
import { WhatsAppError } from "../utils/errors";

/**
 * Base client class for WhatsApp API interactions
 * Provides common functionality for all client implementations
 */
export abstract class BaseClient {
  /**
   * Base URL for API requests
   * @protected
   */
  protected readonly baseURL: string;

  /**
   * WhatsApp phone number ID
   * @protected
   */
  protected readonly phoneNumberId: string;

  /**
   * Authorization header for API requests
   * @protected
   */
  protected readonly headers: HeadersInit;

  /**
   * Creates a new instance of the BaseClient
   * @param config - Configuration object for the WhatsApp client
   * @param config.accessToken - Facebook access token
   * @param config.phoneNumberId - WhatsApp phone number ID
   * @param config.version - API version (default: 'v21.0')
   * @param config.baseUrl - Base URL for the API (default: 'https://graph.facebook.com')
   */
  constructor(config: WhatsAppClientConfig) {
    const {
      accessToken,
      phoneNumberId,
      version = "v21.0",
      baseUrl = "https://graph.facebook.com",
    } = config;

    this.phoneNumberId = phoneNumberId;
    this.baseURL = `${baseUrl}/${version}`;
    this.headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
  }

  /**
   * Makes an HTTP request to the WhatsApp API
   * @param method - HTTP method to use
   * @param endpoint - API endpoint
   * @param data - Request payload (optional)
   * @returns Promise with the API response
   * @throws WhatsAppError if the request fails
   * @protected
   */
  protected async makeRequest<T>(
    method: "GET" | "POST" | "DELETE" | "PUT",
    endpoint: string,
    data?: any
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        method,
        headers: this.headers,
        body: data ? JSON.stringify(data) : undefined,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new WhatsAppError(
          responseData.error?.message || "WhatsApp API error",
          response.status,
          responseData
        );
      }

      return responseData;
    } catch (error) {
      if (error instanceof WhatsAppError) {
        throw error;
      }
      throw new WhatsAppError((error as Error).message);
    }
  }

  /**
   * Protected method to send messages to WhatsApp API
   * @param message - The message payload to send
   * @returns Promise with the message response
   * @throws WhatsAppError if the request fails
   * @protected
   */
  protected async sendMessage(message: any): Promise<MessageResponse> {
    return this.makeRequest<MessageResponse>(
      "POST",
      `/${this.phoneNumberId}/messages`,
      message
    );
  }
}
