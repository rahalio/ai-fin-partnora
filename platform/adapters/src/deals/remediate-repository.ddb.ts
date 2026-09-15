/**
 * RemediateRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { RemediateRepository } from "@partnora/services/deals";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("deals", "dealId", ["remediateDeal"]);

export class RemediateRepositoryDdb implements RemediateRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async remediateDeal(input: Parameters<RemediateRepository['remediateDeal']>[0]): Promise<Awaited<ReturnType<RemediateRepository['remediateDeal']>>> {
    return _sandbox.remediateDeal(input) as Promise<Awaited<ReturnType<RemediateRepository['remediateDeal']>>>;
  }
}
