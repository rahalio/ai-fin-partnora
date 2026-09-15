/**
 * ExitRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { ExitRepository } from "@partnora/services/deals";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("deals", "dealId", ["startDealExit"]);

export class ExitRepositoryDdb implements ExitRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async startDealExit(input: Parameters<ExitRepository['startDealExit']>[0]): Promise<Awaited<ReturnType<ExitRepository['startDealExit']>>> {
    return _sandbox.startDealExit(input) as Promise<Awaited<ReturnType<ExitRepository['startDealExit']>>>;
  }
}
