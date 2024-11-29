import { beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";

// Create MSW server for API mocking
export const server = setupServer(
  // Default handlers
  http.post("*/messages", () => {
    return HttpResponse.json({
      messaging_product: "whatsapp",
      contacts: [{ wa_id: "123456789" }],
      messages: [{ id: "message_id" }],
    });
  })
);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Clean up after all tests
afterAll(() => server.close());
