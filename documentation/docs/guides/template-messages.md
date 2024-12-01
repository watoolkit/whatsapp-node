---
sidebar_position: 3
---

# Template Messages

Learn how to work with message templates.

## Basic Template

Send a simple template message:

```typescript
await client.sendTemplate(
  '1234567890',
  'hello_world',
  'en'
);
```

## Templates with Parameters

Send templates with dynamic content:

```typescript
await client.sendTemplate(
  '1234567890',
  'order_update',
  'en',
  [
    {
      type: 'body',
      parameters: [
        { type: 'text', text: 'John' },
        { type: 'text', text: '12345' }
      ]
    }
  ]
);
```

## Template Components

Templates can include different components:

```typescript
await client.sendTemplate(
  '1234567890',
  'promotional_sale',
  'en',
  [
    // Header with image
    {
      type: 'header',
      parameters: [
        {
          type: 'image',
          image: {
            link: 'https://example.com/promo.jpg'
          }
        }
      ]
    },
    // Body with dynamic parameters
    {
      type: 'body',
      parameters: [
        { type: 'text', text: '50%' },
        { type: 'text', text: 'this weekend' }
      ]
    },
    // Button parameters
    {
      type: 'button',
      sub_type: 'url',
      index: 0,
      parameters: [
        { type: 'text', text: 'promo-123' }
      ]
    }
  ]
);
```

## Language Support

Templates support multiple languages:

```typescript
// English
await client.sendTemplate('1234567890', 'hello_world', 'en');

// Spanish
await client.sendTemplate('1234567890', 'hello_world', 'es');

// Portuguese
await client.sendTemplate('1234567890', 'hello_world', 'pt_BR');
```
