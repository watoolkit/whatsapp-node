---
sidebar_position: 1
---

# Client API Reference

## WhatsAppClient

Main client class for interacting with the WhatsApp Cloud API.

### Constructor

```typescript
const client = new WhatsAppClient({
  accessToken: string;    // Meta access token
  phoneNumberId: string;  // WhatsApp phone number ID
  version?: string;       // API version (default: 'v16.0')
  baseUrl?: string;       // API base URL (default: 'https://graph.facebook.com')
});
```

### Methods

#### Basic Messages

```typescript
// Send text message
sendTextMessage(to: string, text: string): Promise<MessageResponse>

// Send media message
sendMedia(
  to: string,
  type: 'image' | 'video' | 'audio' | 'document',
  media: {
    id?: string;
    link?: string;
    caption?: string;
    filename?: string;
  }
): Promise<MessageResponse>

// Send location
sendLocation(
  to: string,
  latitude: number,
  longitude: number,
  name?: string,
  address?: string
): Promise<MessageResponse>

// Send contacts
sendContact(
  to: string,
  contacts: Array<Contact>
): Promise<MessageResponse>

// Send reaction
sendReaction(
  to: string,
  messageId: string,
  emoji: string
): Promise<MessageResponse>
```
