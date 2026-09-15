/**
 * ScoreRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { ScoreRepository } from "@partnora/services/opportunities";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("opportunities", "opportunityId", ["scoreOpportunity"]);

export class ScoreRepositoryDdb implements ScoreRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async scoreOpportunity(input: Parameters<ScoreRepository['scoreOpportunity']>[0]): Promise<Awaited<ReturnType<ScoreRepository['scoreOpportunity']>>> {
    return _sandbox.scoreOpportunity(input) as Promise<Awaited<ReturnType<ScoreRepository['scoreOpportunity']>>>;
  }
}
