---
sidebar_position: 3
---

# Template Messages API

## Methods

### Send Template

```typescript
sendTemplate(
  to: string,
  templateName: string,
  languageCode: string,
  components?: Array<TemplateComponent>
): Promise<MessageResponse>
```

## Types

### TemplateComponent

```typescript
type TemplateComponent = {
  type: 'header' | 'body' | 'button';
  sub_type?: 'quick_reply' | 'url';
  index?: number;
  parameters: Array<TemplateParameter>;
};

type TemplateParameter = {
  type: 'text' | 'currency' | 'date_time' | 'image' | 'document' | 'video';
  text?: string;
  currency?: {
    fallback_value: string;
    code: string;
    amount_1000: number;
  };
  date_time?: {
    fallback_value: string;
  };
  image?: {
    id?: string;
    link?: string;
  };
  document?: {
    id?: string;
    link?: string;
    filename?: string;
  };
  video?: {
    id?: string;
    link?: string;
  };
};
```

### Examples

```typescript
// Simple template
await client.sendTemplate(
  '1234567890',
  'hello_world',
  'en'
);

// Template with parameters
await client.sendTemplate(
  '1234567890',
  'order_update',
  'en',
  [
    {
      type: 'body',
      parameters: [
        { type: 'text', text: 'ORDER123' },
        { type: 'text', text: 'shipped' }
      ]
    }
  ]
);

// Template with media header
await client.sendTemplate(
  '1234567890',
  'promotion',
  'en',
  [
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
    }
  ]
);
```
