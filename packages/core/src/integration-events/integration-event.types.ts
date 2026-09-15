/**
 * Hand-maintained integration event type definition.
 * Consumed by generated `integration-events/generated/registry.ts`.
 */

export type IntegrationEventDeliveryMode = "sync" | "async";

export type IntegrationEventTypeDefinition = {
  type: string;
  domain: string;
  aggregateType: string;
  description: string;
  defaultDeliveryMode: IntegrationEventDeliveryMode;
};
