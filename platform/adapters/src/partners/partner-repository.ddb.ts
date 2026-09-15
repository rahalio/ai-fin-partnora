/**
 * PartnerRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { PartnerRepository } from "@partnora/services/partners";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("partners", "partnerId", ["listPartners", "createPartner", "getPartner", "updatePartner"]);

export class PartnerRepositoryDdb implements PartnerRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async listPartners(input: Parameters<PartnerRepository['listPartners']>[0]): Promise<Awaited<ReturnType<PartnerRepository['listPartners']>>> {
    return _sandbox.listPartners(input) as Promise<Awaited<ReturnType<PartnerRepository['listPartners']>>>;
  }

  async createPartner(input: Parameters<PartnerRepository['createPartner']>[0]): Promise<Awaited<ReturnType<PartnerRepository['createPartner']>>> {
    return _sandbox.createPartner(input) as Promise<Awaited<ReturnType<PartnerRepository['createPartner']>>>;
  }

  async getPartner(input: Parameters<PartnerRepository['getPartner']>[0]): Promise<Awaited<ReturnType<PartnerRepository['getPartner']>>> {
    return _sandbox.getPartner(input) as Promise<Awaited<ReturnType<PartnerRepository['getPartner']>>>;
  }

  async updatePartner(input: Parameters<PartnerRepository['updatePartner']>[0]): Promise<Awaited<ReturnType<PartnerRepository['updatePartner']>>> {
    return _sandbox.updatePartner(input) as Promise<Awaited<ReturnType<PartnerRepository['updatePartner']>>>;
  }
}
