---
sidebar_position: 5
---

# Error Handling

Learn how to handle errors in the SDK.

## WhatsAppError

The SDK throws `WhatsAppError` for API-related errors:

```typescript
import { WhatsAppError } from '@watoolkit/whatsapp-node';

try {
  await client.sendTextMessage('1234567890', 'Hello');
} catch (error) {
  if (error instanceof WhatsAppError) {
    console.error('WhatsApp API error:', error.message);
    console.error('Status code:', error.statusCode);
    console.error('Error details:', error.details);
  }
}
```

## Common Errors

### Authentication Errors

```typescript
try {
  await client.sendTextMessage('1234567890', 'Hello');
} catch (error) {
  if (error instanceof WhatsAppError) {
    if (error.statusCode === 401) {
      console.error('Invalid access token');
    }
  }
}
```

### Rate Limiting

```typescript
try {
  await client.sendTextMessage('1234567890', 'Hello');
} catch (error) {
  if (error instanceof WhatsAppError) {
    if (error.statusCode === 429) {
      console.error('Rate limit exceeded');
      // Implement retry logic
      const retryAfter = error.headers?.['retry-after'];
    }
  }
}
```

### Invalid Phone Numbers

```typescript
try {
  await client.sendTextMessage('invalid_number', 'Hello');
} catch (error) {
  if (error instanceof WhatsAppError) {
    if (error.details?.error?.code === 100) {
      console.error('Invalid phone number');
    }
  }
}
```

## Retry Strategy

Implement a retry strategy for transient errors:

```typescript
import { WhatsAppError } from '@watoolkit/whatsapp-node';

async function sendWithRetry(
  fn: () => Promise<any>,
  maxRetries = 3,
  delay = 1000
) {
  let lastError: Error | null = null;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error instanceof WhatsAppError) {
        // Don't retry client errors
        if (error.statusCode < 500) {
          throw error;
        }
        lastError = error;
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        continue;
      }
      throw error;
    }
  }
  
  throw lastError;
}

// Usage
await sendWithRetry(() => 
  client.sendTextMessage('1234567890', 'Hello')
);
```
