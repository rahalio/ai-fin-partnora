/**
 * DealRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { DealRepository } from "@partnora/services/deals";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("deals", "dealId", ["listDeals", "createDeal", "getDeal", "updateDeal"]);

export class DealRepositoryDdb implements DealRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async listDeals(input: Parameters<DealRepository['listDeals']>[0]): Promise<Awaited<ReturnType<DealRepository['listDeals']>>> {
    return _sandbox.listDeals(input) as Promise<Awaited<ReturnType<DealRepository['listDeals']>>>;
  }

  async createDeal(input: Parameters<DealRepository['createDeal']>[0]): Promise<Awaited<ReturnType<DealRepository['createDeal']>>> {
    return _sandbox.createDeal(input) as Promise<Awaited<ReturnType<DealRepository['createDeal']>>>;
  }

  async getDeal(input: Parameters<DealRepository['getDeal']>[0]): Promise<Awaited<ReturnType<DealRepository['getDeal']>>> {
    return _sandbox.getDeal(input) as Promise<Awaited<ReturnType<DealRepository['getDeal']>>>;
  }

  async updateDeal(input: Parameters<DealRepository['updateDeal']>[0]): Promise<Awaited<ReturnType<DealRepository['updateDeal']>>> {
    return _sandbox.updateDeal(input) as Promise<Awaited<ReturnType<DealRepository['updateDeal']>>>;
  }
}
