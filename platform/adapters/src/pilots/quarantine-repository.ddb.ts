/**
 * QuarantineRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { QuarantineRepository } from "@partnora/services/pilots";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("pilots", "pilotId", ["quarantinePilot"]);

export class QuarantineRepositoryDdb implements QuarantineRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async quarantinePilot(input: Parameters<QuarantineRepository['quarantinePilot']>[0]): Promise<Awaited<ReturnType<QuarantineRepository['quarantinePilot']>>> {
    return _sandbox.quarantinePilot(input) as Promise<Awaited<ReturnType<QuarantineRepository['quarantinePilot']>>>;
  }
}
