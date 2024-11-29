import { describe, it, expect, beforeEach } from "vitest";
import { BaseClient } from "../../src/client/BaseClient";
import { WhatsAppError } from "../../src/utils/errors";
import { server } from "../setup";
import { http, HttpResponse } from "msw";

// Create a concrete implementation for testing
class TestClient extends BaseClient {
  public async testRequest<T>(
    method: "GET" | "POST" | "DELETE" | "PUT",
    endpoint: string,
    data?: any
  ): Promise<T> {
    return this.makeRequest<T>(method, endpoint, data);
  }
}

describe("BaseClient", () => {
  let client: TestClient;

  beforeEach(() => {
    client = new TestClient({
      accessToken: "test_token",
      phoneNumberId: "test_phone_id",
    });
  });

  describe("makeRequest", () => {
    it("should make successful requests", async () => {
      const expectedResponse = { success: true };
      server.use(
        http.post("*/test", () => {
          return HttpResponse.json(expectedResponse);
        })
      );

      const response = await client.testRequest("POST", "/test", {
        data: "test",
      });

      expect(response).toEqual(expectedResponse);
    });

    it("should handle API errors", async () => {
      server.use(
        http.post("*/test", () => {
          return HttpResponse.json(
            { error: { message: "Test error" } },
            { status: 400 }
          );
        })
      );

      await expect(
        client.testRequest("POST", "/test", { data: "test" })
      ).rejects.toThrow(WhatsAppError);
    });

    it("should handle network errors", async () => {
      server.use(
        http.post("*/test", () => {
          return HttpResponse.error();
        })
      );

      await expect(
        client.testRequest("POST", "/test", { data: "test" })
      ).rejects.toThrow();
    });
  });
});
