---
sidebar_position: 4
---

# Webhook API Reference

## WebhookHandler

Main class for handling incoming webhooks.

### Constructor

```typescript
const handler = new WebhookHandler();
```

### Methods

```typescript
// Handle incoming webhook data
handleWebhook(data: WebhookMessage): void

// Register message type handler
onMessageType(
  type: WebhookMessageType,
  handler: (message: WebhookMessageData) => void | Promise<void>
): void

// Register status update handler
onStatus(
  handler: (status: MessageStatus) => void | Promise<void>
): void
```

### Types

```typescript
type WebhookMessageType = 
  | 'text'
  | 'image'
  | 'video'
  | 'audio'
  | 'document'
  | 'location'
  | 'contacts'
  | 'interactive'
  | 'button'
  | 'reaction';

interface MessageStatus {
  id: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
  recipient_id: string;
  errors?: Array<{
    code: number;
    title: string;
    message: string;
    error_data: {
      details: string;
    };
  }>;
}
```
