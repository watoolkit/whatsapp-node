import {
  WhatsAppClientConfig,
  MessageResponse,
  AnyMessage,
  RegistrationResponse,
  RegistrationData,
} from "../types";
import { BaseClient } from "./BaseClient";
import { BasicMessageClient } from "./messages/BasicMessageClient";
import { InteractiveMessageClient } from "./messages/InteractiveMessageClient";
import { TemplateMessageClient } from "./messages/TemplateMessageClient";
import { RegistrationClient } from "./registration/RegistrationClient";

export class WhatsAppClient extends BaseClient {
  private readonly basicMessages: BasicMessageClient;
  private readonly interactiveMessages: InteractiveMessageClient;
  private readonly templateMessages: TemplateMessageClient;
  private readonly registration: RegistrationClient;

  constructor(config: WhatsAppClientConfig) {
    super(config);
    this.basicMessages = new BasicMessageClient(config);
    this.interactiveMessages = new InteractiveMessageClient(config);
    this.templateMessages = new TemplateMessageClient(config);
    this.registration = new RegistrationClient(config);

    this.sendTextMessage = this.basicMessages.sendTextMessage.bind(
      this.basicMessages
    );
    this.sendMedia = this.basicMessages.sendMedia.bind(this.basicMessages);
    this.sendLocation = this.basicMessages.sendLocation.bind(
      this.basicMessages
    );
    this.sendContact = this.basicMessages.sendContact.bind(this.basicMessages);
    this.sendTemplate = this.templateMessages.sendTemplate.bind(
      this.templateMessages
    );
    this.sendListMessage = this.interactiveMessages.sendListMessage.bind(
      this.interactiveMessages
    );
    this.sendButtonMessage = this.interactiveMessages.sendButtonMessage.bind(
      this.interactiveMessages
    );
    this.sendProductMessage = this.interactiveMessages.sendProductMessage.bind(
      this.interactiveMessages
    );
    this.sendProductListMessage =
      this.interactiveMessages.sendProductListMessage.bind(
        this.interactiveMessages
      );
    this.sendFlowMessage = this.interactiveMessages.sendFlowMessage.bind(
      this.interactiveMessages
    );
    this.sendRatingMessage = this.interactiveMessages.sendRatingMessage.bind(
      this.interactiveMessages
    );
    this.registerPhone = this.registration.registerPhone.bind(
      this.registration
    );
    this.deregisterPhone = this.registration.deregisterPhone.bind(
      this.registration
    );
  }

  /**
   * Generic method to send any type of WhatsApp message
   * @override
   */
  async sendMessage(message: AnyMessage): Promise<MessageResponse> {
    return super.sendMessage(message);
  }

  sendTextMessage!: (to: string, text: string) => Promise<MessageResponse>;
  sendMedia!: (
    to: string,
    type: "image" | "video" | "audio" | "document",
    mediaInput: {
      id?: string;
      link?: string;
      caption?: string;
      filename?: string;
    }
  ) => Promise<MessageResponse>;
  sendLocation!: (
    to: string,
    latitude: number,
    longitude: number,
    name?: string,
    address?: string
  ) => Promise<MessageResponse>;
  sendContact!: (to: string, contacts: any[]) => Promise<MessageResponse>;
  sendTemplate!: (
    to: string,
    templateName: string,
    languageCode: string,
    components?: any
  ) => Promise<MessageResponse>;
  sendListMessage!: (
    to: string,
    body: string,
    buttonText: string,
    sections: any[],
    header?: { text: string },
    footer?: { text: string }
  ) => Promise<MessageResponse>;
  sendButtonMessage!: (
    to: string,
    body: string,
    buttons: Array<{ id: string; title: string }>,
    header?: any,
    footer?: { text: string }
  ) => Promise<MessageResponse>;
  sendProductMessage!: (
    to: string,
    catalogId: string,
    productRetailerId: string,
    body?: string,
    footer?: { text: string }
  ) => Promise<MessageResponse>;
  sendProductListMessage!: (
    to: string,
    catalogId: string,
    sections: any[],
    headerText: string,
    bodyText: string,
    footer?: { text: string }
  ) => Promise<MessageResponse>;
  sendFlowMessage!: (
    to: string,
    flowId: string,
    flowToken: string,
    flowCta: string,
    body: string,
    header?: { text: string },
    footer?: { text: string },
    screen?: string,
    data?: Record<string, any>
  ) => Promise<MessageResponse>;
  sendRatingMessage!: (
    to: string,
    headerText: string,
    subText: string,
    ratingId: string
  ) => Promise<MessageResponse>;
  registerPhone!: (
    pin: string,
    dataLocalizationRegion?: string
  ) => Promise<RegistrationResponse>;
  deregisterPhone!: () => Promise<RegistrationResponse>;
}
