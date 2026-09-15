/**
 * AcceptRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { AcceptRepository } from "@partnora/services/conflicts";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("conflicts", "conflictId", ["acceptConflictMitigation"]);

export class AcceptRepositoryDdb implements AcceptRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async acceptConflictMitigation(input: Parameters<AcceptRepository['acceptConflictMitigation']>[0]): Promise<Awaited<ReturnType<AcceptRepository['acceptConflictMitigation']>>> {
    return _sandbox.acceptConflictMitigation(input) as Promise<Awaited<ReturnType<AcceptRepository['acceptConflictMitigation']>>>;
  }
}
