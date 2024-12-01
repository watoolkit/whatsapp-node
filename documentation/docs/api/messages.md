---
sidebar_position: 1
---

# Messages

Learn how to send different types of messages using the SDK.

## Text Messages

Send simple text messages to your users:

```typescript
await client.sendTextMessage(
  to: string,
  text: string
);
```

## Template Messages

Send template messages with dynamic parameters:

```typescript
await client.sendTemplate(
  to: string,
  templateName: string,
  languageCode: string,
  components?: Array<TemplateComponent>
);
```

## Interactive Messages

Send interactive messages with buttons and lists:

```typescript
// Button message
await client.sendButtonMessage(
  to: string,
  body: string,
  buttons: Array<{ id: string; title: string }>,
  header?: Header,
  footer?: Footer
);

// List message
await client.sendListMessage(
  to: string,
  body: string,
  buttonText: string,
  sections: Array<Section>,
  header?: Header,
  footer?: Footer
);
```