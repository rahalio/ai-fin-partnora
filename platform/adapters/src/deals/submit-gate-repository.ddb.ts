/**
 * SubmitGateRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { SubmitGateRepository } from "@partnora/services/deals";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("deals", "dealId", ["submitDealToGates"]);

export class SubmitGateRepositoryDdb implements SubmitGateRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async submitDealToGates(input: Parameters<SubmitGateRepository['submitDealToGates']>[0]): Promise<Awaited<ReturnType<SubmitGateRepository['submitDealToGates']>>> {
    return _sandbox.submitDealToGates(input) as Promise<Awaited<ReturnType<SubmitGateRepository['submitDealToGates']>>>;
  }
}
