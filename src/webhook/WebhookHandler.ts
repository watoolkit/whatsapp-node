import { WebhookMessage, WebhookStatus, WebhookMessageType } from "../types";

export class WebhookHandler {
  private messageHandlers: Map<
    WebhookMessageType,
    Array<(message: any) => void>
  > = new Map();
  private statusHandlers: Array<(status: WebhookStatus) => void> = [];

  /**
   * Handles incoming webhook payloads
   * @param body - The webhook payload
   * @throws Error if webhook payload is invalid
   */
  handleWebhook(body: WebhookMessage): void {
    if (!this.isValidWebhook(body)) {
      throw new Error("Invalid webhook payload");
    }

    body.entry.forEach((entry) => {
      entry.changes.forEach((change) => {
        const value = change.value;

        // Handle message statuses (sent, delivered, read, failed)
        if (value.statuses) {
          value.statuses.forEach((status) => {
            this.statusHandlers.forEach((handler) => handler(status));
          });
        }

        // Handle incoming messages
        if (value.messages) {
          value.messages.forEach((message) => {
            const handlers = this.messageHandlers.get(
              message.type as WebhookMessageType
            );
            if (handlers) {
              handlers.forEach((handler) => handler(message));
            }
          });
        }
      });
    });
  }

  /**
   * Register a handler for a specific message type
   * @param type - Type of message to handle
   * @param handler - Handler function
   */
  onMessageType(
    type: WebhookMessageType,
    handler: (message: any) => void
  ): void {
    const handlers = this.messageHandlers.get(type) || [];
    handlers.push(handler);
    this.messageHandlers.set(type, handlers);
  }

  /**
   * Register a handler for message status updates
   * @param handler - Handler function
   */
  onStatus(handler: (status: WebhookStatus) => void): void {
    this.statusHandlers.push(handler);
  }

  /**
   * Validates webhook payload structure
   * @param body - Webhook payload to validate
   * @returns true if valid, false otherwise
   */
  private isValidWebhook(body: any): body is WebhookMessage {
    return (
      body &&
      body.object === "whatsapp_business_account" &&
      body.entry &&
      Array.isArray(body.entry) &&
      body.entry.every(
        (entry: any) => entry.changes && Array.isArray(entry.changes)
      )
    );
  }
}
