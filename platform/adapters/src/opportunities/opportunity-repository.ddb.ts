/**
 * OpportunityRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { OpportunityRepository } from "@partnora/services/opportunities";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("opportunities", "opportunityId", ["listOpportunities", "createOpportunity", "getOpportunity"]);

export class OpportunityRepositoryDdb implements OpportunityRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async listOpportunities(input: Parameters<OpportunityRepository['listOpportunities']>[0]): Promise<Awaited<ReturnType<OpportunityRepository['listOpportunities']>>> {
    return _sandbox.listOpportunities(input) as Promise<Awaited<ReturnType<OpportunityRepository['listOpportunities']>>>;
  }

  async createOpportunity(input: Parameters<OpportunityRepository['createOpportunity']>[0]): Promise<Awaited<ReturnType<OpportunityRepository['createOpportunity']>>> {
    return _sandbox.createOpportunity(input) as Promise<Awaited<ReturnType<OpportunityRepository['createOpportunity']>>>;
  }

  async getOpportunity(input: Parameters<OpportunityRepository['getOpportunity']>[0]): Promise<Awaited<ReturnType<OpportunityRepository['getOpportunity']>>> {
    return _sandbox.getOpportunity(input) as Promise<Awaited<ReturnType<OpportunityRepository['getOpportunity']>>>;
  }
}
