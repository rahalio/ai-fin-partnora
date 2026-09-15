/**
 * OwnershipRuleRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { OwnershipRuleRepository } from "@partnora/services/ownership";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("ownership", "ownershipRuleId", ["listOwnershipRules", "createOwnershipRule", "getOwnershipRule", "updateOwnershipRule"]);

export class OwnershipRuleRepositoryDdb implements OwnershipRuleRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async listOwnershipRules(input: Parameters<OwnershipRuleRepository['listOwnershipRules']>[0]): Promise<Awaited<ReturnType<OwnershipRuleRepository['listOwnershipRules']>>> {
    return _sandbox.listOwnershipRules(input) as Promise<Awaited<ReturnType<OwnershipRuleRepository['listOwnershipRules']>>>;
  }

  async createOwnershipRule(input: Parameters<OwnershipRuleRepository['createOwnershipRule']>[0]): Promise<Awaited<ReturnType<OwnershipRuleRepository['createOwnershipRule']>>> {
    return _sandbox.createOwnershipRule(input) as Promise<Awaited<ReturnType<OwnershipRuleRepository['createOwnershipRule']>>>;
  }

  async getOwnershipRule(input: Parameters<OwnershipRuleRepository['getOwnershipRule']>[0]): Promise<Awaited<ReturnType<OwnershipRuleRepository['getOwnershipRule']>>> {
    return _sandbox.getOwnershipRule(input) as Promise<Awaited<ReturnType<OwnershipRuleRepository['getOwnershipRule']>>>;
  }

  async updateOwnershipRule(input: Parameters<OwnershipRuleRepository['updateOwnershipRule']>[0]): Promise<Awaited<ReturnType<OwnershipRuleRepository['updateOwnershipRule']>>> {
    return _sandbox.updateOwnershipRule(input) as Promise<Awaited<ReturnType<OwnershipRuleRepository['updateOwnershipRule']>>>;
  }
}
