/**
 * EconomicRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { EconomicRepository } from "@partnora/services/economics";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("economics", "economicsSnapshotId", ["listEconomicsSnapshots", "createEconomicsSnapshot", "getEconomicsSnapshot"]);

export class EconomicRepositoryDdb implements EconomicRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async listEconomicsSnapshots(input: Parameters<EconomicRepository['listEconomicsSnapshots']>[0]): Promise<Awaited<ReturnType<EconomicRepository['listEconomicsSnapshots']>>> {
    return _sandbox.listEconomicsSnapshots(input) as Promise<Awaited<ReturnType<EconomicRepository['listEconomicsSnapshots']>>>;
  }

  async createEconomicsSnapshot(input: Parameters<EconomicRepository['createEconomicsSnapshot']>[0]): Promise<Awaited<ReturnType<EconomicRepository['createEconomicsSnapshot']>>> {
    return _sandbox.createEconomicsSnapshot(input) as Promise<Awaited<ReturnType<EconomicRepository['createEconomicsSnapshot']>>>;
  }

  async getEconomicsSnapshot(input: Parameters<EconomicRepository['getEconomicsSnapshot']>[0]): Promise<Awaited<ReturnType<EconomicRepository['getEconomicsSnapshot']>>> {
    return _sandbox.getEconomicsSnapshot(input) as Promise<Awaited<ReturnType<EconomicRepository['getEconomicsSnapshot']>>>;
  }
}
