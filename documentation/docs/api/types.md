---
sidebar_position: 5
---

# Types Reference

## Common Types

### Client Configuration

```typescript
interface WhatsAppClientConfig {
  accessToken: string;
  phoneNumberId: string;
  version?: string;
  baseUrl?: string;
}
```

### Message Components

```typescript
interface Header {
  type: 'text' | 'image' | 'video' | 'document';
  text?: string;
  media?: {
    id?: string;
    link?: string;
  };
}

interface Footer {
  text: string;
}

interface Contact {
  name: {
    first_name?: string;
    last_name?: string;
    formatted_name: string;
  };
  phones?: Array<{
    phone: string;
    type?: 'HOME' | 'WORK' | 'CELL';
    wa_id?: string;
  }>;
}
```

### Response Types

```typescript
interface MessageResponse {
  messaging_product: 'whatsapp';
  contacts: Array<{
    input: string;
    wa_id: string;
  }>;
  messages: Array<{
    id: string;
  }>;
}

interface RegistrationResponse {
  success: boolean;
  message: string;
  data?: {
    registered: boolean;
    expires_at?: string;
  };
}
```

### Error Types

```typescript
class WhatsAppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: any,
    public headers?: Record<string, string>
  );
}
```
