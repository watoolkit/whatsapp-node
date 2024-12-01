---
sidebar_position: 1
---

# Basic Messages

Learn how to send basic message types using the SDK.

## Text Messages

Send simple text messages:

```typescript
await client.sendTextMessage('1234567890', 'Hello, World!');
```

## Media Messages

Send images, videos, audio, or documents:

```typescript
// Send an image
await client.sendMedia('1234567890', 'image', {
  link: 'https://example.com/image.jpg',
  caption: 'Check out this image!'
});

// Send a document
await client.sendMedia('1234567890', 'document', {
  link: 'https://example.com/doc.pdf',
  caption: 'Important document'
});
```

## Location Messages

Share locations with optional name and address:

```typescript
await client.sendLocation(
  '1234567890',
  37.7749, // latitude
  -122.4194, // longitude
  'San Francisco', // name
  '123 Main St' // address
);
```

## Contact Messages

Share contact information:

```typescript
await client.sendContact('1234567890', [{
  name: {
    first_name: 'John',
    last_name: 'Doe',
    formatted_name: 'John Doe'
  },
  phones: [{
    phone: '+1234567890',
    type: 'CELL'
  }]
}]);
```

## Reactions

React to messages with emojis:

```typescript
await client.sendReaction(
  '1234567890',
  'original_message_id',
  '👍'
);
```
