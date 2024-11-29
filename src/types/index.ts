import {
  ContactMessage,
  LocationMessage,
  MediaMessage,
  ReactionMessage,
  TextMessage,
  StickerMessage,
} from "./messages/basic";
import {
  InteractiveFlowMessage,
  InteractiveListMessage,
  InteractiveProductMessage,
  InteractiveMessage,
  InteractiveButtonMessage,
  InteractiveProductListMessage,
  InteractiveRatingMessage,
} from "./messages/interactive";
import { TemplateMessage } from "./messages/template";

export * from "./config";
export * from "./responses";
export * from "./messages/basic";
export * from "./messages/interactive";
export * from "./messages/template";
export * from "./webhook";

export type AnyMessage =
  | TextMessage
  | TemplateMessage
  | MediaMessage
  | LocationMessage
  | ContactMessage
  | StickerMessage
  | ReactionMessage
  | InteractiveMessage
  | InteractiveListMessage
  | InteractiveButtonMessage
  | InteractiveProductMessage
  | InteractiveProductListMessage
  | InteractiveFlowMessage
  | InteractiveRatingMessage;
