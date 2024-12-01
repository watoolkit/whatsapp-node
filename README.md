# @watoolkit/whatsapp-node

A modern, lightweight TypeScript SDK for the WhatsApp Cloud API with full type safety and comprehensive webhook handling.

## Features

- � Full TypeScript support
- 📦 Tiny bundle size
- 🔄 Complete webhook handling
- 💬 All message types supported:
  - Text messages
  - Media messages (image, video, audio, documents)
  - Template messages
  - Interactive messages (buttons, lists)
  - Product messages
  - Location messages
  - Contact cards
  - Stickers
  - Reactions
  - Flow messages
  - Rating messages
- 🔒 Built-in error handling
- 📱 Phone number registration management
- ✨ Zero dependencies

## Installation

### npm

```bash
npm install @watoolkit/whatsapp-node
```

### pnpm

```bash
pnpm add @watoolkit/whatsapp-node
```

### yarn

```bash
yarn add @watoolkit/whatsapp-node
```

## Quick Start

```typescript
import { WhatsAppClient } from "@watoolkit/whatsapp-node";

// Initialize the client
const client = new WhatsAppClient({
  accessToken: "your_access_token",
  phoneNumberId: "your_phone_number_id",
});

// Send a text message
await client.sendTextMessage("1234567890", "Hello, World!");

// Send a template message
await client.sendTemplate("1234567890", "hello_world", "en", [
  {
    type: "body",
    parameters: [{ type: "text", text: "John" }],
  },
]);

// Send an interactive button message
await client.sendButtonMessage("1234567890", "Please choose an option", [
  { id: "btn1", title: "Yes" },
  { id: "btn2", title: "No" },
]);
```

## Webhook Handling

```typescript
import { WebhookHandler } from "@watoolkit/whatsapp-node";

const webhookHandler = new WebhookHandler();

// Handle text messages
webhookHandler.onMessageType("text", (message) => {
  console.log(`Received text: ${message.text.body}`);
});
// Handle message status updates
webhookHandler.onStatus((status) => {
  console.log(`Message ${status.id} status: ${status.status}`);
});

// Express.js example
app.post("/webhook", express.json(), (req, res) => {
  webhookHandler.handleWebhook(req.body);
  res.sendStatus(200);
});
```

## API Reference

### Client Initialization

```typescript
const client = new WhatsAppClient({
  accessToken: string; // Meta access token
  phoneNumberId: string; // WhatsApp phone number ID
  version?: string; // API version (default: 'v21.0')
  baseUrl?: string; // API base URL (default: 'https://graph.facebook.com')
});
```

### Basic Messages

```typescript
// Text messages
await client.sendTextMessage(to: string, text: string);

// Media messages
await client.sendMedia(
  to: string,
  type: "image" | "video" | "audio" | "document",
  media: {
    id?: string;
    link?: string;
    caption?: string;
  }
);

// Location messages
await client.sendLocation(
  to: string,
  latitude: number,
  longitude: number,
  name?: string,
  address?: string
);

// Contact messages
await client.sendContact(to: string, contacts: Array<Contact>);

// Reactions
await client.sendReaction(to: string, messageId: string, emoji: string);
```

### Interactive Messages

```typescript
// Button messages
await client.sendButtonMessage(
  to: string,
  body: string,
  buttons: Array<{ id: string; title: string }>,
  header?: Header,
  footer?: Footer
);

// List messages
await client.sendListMessage(
  to: string,
  body: string,
  buttonText: string,
  sections: Array<Section>,
  header?: Header,
  footer?: Footer
);

// Product messages
await client.sendProductMessage(
  to: string,
  catalogId: string,
  productRetailerId: string,
  body?: string,
  footer?: Footer
);
```

### Template Messages

```typescript
await client.sendTemplate(
  to: string,
  templateName: string,
  languageCode: string,
  components?: Array<TemplateComponent>
);
```

## Error Handling

The SDK throws `WhatsAppError` for API-related errors:

```typescript
try {
  await client.sendTextMessage("1234567890", "Hello");
} catch (error) {
  if (error instanceof WhatsAppError) {
    console.error("WhatsApp API error:", error.message);
    console.error("Status code:", error.statusCode);
    console.error("Error details:", error.details);
  }
}
```

## License

MIT © [WAToolkit](https://github.com/watoolkit)