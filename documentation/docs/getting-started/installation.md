---
sidebar_position: 2
---

# Installation

Install the WAToolkit WhatsApp SDK using your preferred package manager:

```bash
# npm
npm install @watoolkit/whatsapp-node

# pnpm
pnpm add @watoolkit/whatsapp-node

# yarn
yarn add @watoolkit/whatsapp-node
```

## Quick Start

```typescript
import { WhatsAppClient } from '@watoolkit/whatsapp-node';

const client = new WhatsAppClient({
  accessToken: 'your_access_token',
  phoneNumberId: 'your_phone_number_id'
});

// Send a text message
await client.sendTextMessage('1234567890', 'Hello, World!');
``` 


## Client Configuration

```typescript
const client = new WhatsAppClient({
  // Required
  accessToken: 'your_access_token',
  phoneNumberId: 'your_phone_number_id',
  
  // Optional
  version: 'v21.0',
  baseUrl: 'https://graph.facebook.com'
});
```

### Configuration Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| accessToken | string | Yes | - | Your Meta access token |
| phoneNumberId | string | Yes | - | Your WhatsApp phone number ID |
| version | string | No | v21.0 | API version |
| baseUrl | string | No | https://graph.facebook.com | API base URL |