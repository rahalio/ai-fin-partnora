/**
 * AdvanceRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { AdvanceRepository } from "@partnora/services/opportunities";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("opportunities", "opportunityId", ["advanceOpportunity"]);

export class AdvanceRepositoryDdb implements AdvanceRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async advanceOpportunity(input: Parameters<AdvanceRepository['advanceOpportunity']>[0]): Promise<Awaited<ReturnType<AdvanceRepository['advanceOpportunity']>>> {
    return _sandbox.advanceOpportunity(input) as Promise<Awaited<ReturnType<AdvanceRepository['advanceOpportunity']>>>;
  }
}
