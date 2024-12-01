---
sidebar_position: 4
---

# Webhook Handling

Learn how to handle incoming webhooks from WhatsApp.

## Basic Setup

Create a webhook handler and register event listeners:

```typescript
import { WebhookHandler } from '@watoolkit/whatsapp-node';

const webhookHandler = new WebhookHandler();

// Express.js example
app.post('/webhook', express.json(), (req, res) => {
  webhookHandler.handleWebhook(req.body);
  res.sendStatus(200);
});
```

## Message Types

Handle different types of incoming messages:

```typescript
// Text messages
webhookHandler.onMessageType('text', (message) => {
  console.log(`Received text: ${message.text.body}`);
});

// Image messages
webhookHandler.onMessageType('image', (message) => {
  console.log(`Received image: ${message.image.id}`);
});

// Interactive messages (buttons, lists)
webhookHandler.onMessageType('interactive', (message) => {
  const { type, ...response } = message.interactive;
  console.log(`Received ${type} response:`, response);
});
```

## Status Updates

Handle message status updates:

```typescript
webhookHandler.onStatus((status) => {
  console.log(`Message ${status.id} status: ${status.status}`);
  
  switch (status.status) {
    case 'sent':
      console.log('Message was sent');
      break;
    case 'delivered':
      console.log('Message was delivered');
      break;
    case 'read':
      console.log('Message was read');
      break;
    case 'failed':
      console.log(`Message failed: ${status.errors?.[0]?.message}`);
      break;
  }
});
```
