---
sidebar_position: 1
---

# WAToolkit WhatsApp SDK

A modern, lightweight TypeScript SDK for the WhatsApp Cloud API with full type safety and comprehensive webhook handling.

## Overview

WAToolkit WhatsApp SDK provides a simple yet powerful interface to interact with WhatsApp's Cloud API. Built with TypeScript, it offers complete type safety, comprehensive webhook handling, and support for all message types.

## Key Features

- 🚀 Full TypeScript support
- 📦 Tiny bundle size (tree-shaken)
- 🔄 Complete webhook handling
- 💬 All message types supported
- 🔒 Built-in error handling
- 📱 Phone number registration management
- ✨ Zero dependencies

## Quick Example

```typescript
import { WhatsAppClient } from '@watoolkit/whatsapp-node';

const client = new WhatsAppClient({
  accessToken: 'your_access_token',
  phoneNumberId: 'your_phone_number_id'
});

// Send a text message
await client.sendTextMessage('1234567890', 'Hello, World!');
``` 