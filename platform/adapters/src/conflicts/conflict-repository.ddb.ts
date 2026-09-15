/**
 * ConflictRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { ConflictRepository } from "@partnora/services/conflicts";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("conflicts", "conflictId", ["listConflicts", "createConflict", "getConflict"]);

export class ConflictRepositoryDdb implements ConflictRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async listConflicts(input: Parameters<ConflictRepository['listConflicts']>[0]): Promise<Awaited<ReturnType<ConflictRepository['listConflicts']>>> {
    return _sandbox.listConflicts(input) as Promise<Awaited<ReturnType<ConflictRepository['listConflicts']>>>;
  }

  async createConflict(input: Parameters<ConflictRepository['createConflict']>[0]): Promise<Awaited<ReturnType<ConflictRepository['createConflict']>>> {
    return _sandbox.createConflict(input) as Promise<Awaited<ReturnType<ConflictRepository['createConflict']>>>;
  }

  async getConflict(input: Parameters<ConflictRepository['getConflict']>[0]): Promise<Awaited<ReturnType<ConflictRepository['getConflict']>>> {
    return _sandbox.getConflict(input) as Promise<Awaited<ReturnType<ConflictRepository['getConflict']>>>;
  }
}
