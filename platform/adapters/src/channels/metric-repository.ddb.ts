/**
 * MetricRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { MetricRepository } from "@partnora/services/channels";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("channels", "channelNodeId", ["ingestChannelMetrics"]);

export class MetricRepositoryDdb implements MetricRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async ingestChannelMetrics(input: Parameters<MetricRepository['ingestChannelMetrics']>[0]): Promise<Awaited<ReturnType<MetricRepository['ingestChannelMetrics']>>> {
    return _sandbox.ingestChannelMetrics(input) as Promise<Awaited<ReturnType<MetricRepository['ingestChannelMetrics']>>>;
  }
}
