/**
 * LaunchRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { LaunchRepository } from "@partnora/services/deals";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("deals", "dealId", ["launchDeal"]);

export class LaunchRepositoryDdb implements LaunchRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async launchDeal(input: Parameters<LaunchRepository['launchDeal']>[0]): Promise<Awaited<ReturnType<LaunchRepository['launchDeal']>>> {
    return _sandbox.launchDeal(input) as Promise<Awaited<ReturnType<LaunchRepository['launchDeal']>>>;
  }
}
