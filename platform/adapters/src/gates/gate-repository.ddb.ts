/**
 * GateRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { GateRepository } from "@partnora/services/gates";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("gates", "gateId", ["listDealGates", "submitGateEvidence", "decideGate"]);

export class GateRepositoryDdb implements GateRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async listDealGates(input: Parameters<GateRepository['listDealGates']>[0]): Promise<Awaited<ReturnType<GateRepository['listDealGates']>>> {
    return _sandbox.listDealGates(input) as Promise<Awaited<ReturnType<GateRepository['listDealGates']>>>;
  }

  async submitGateEvidence(input: Parameters<GateRepository['submitGateEvidence']>[0]): Promise<Awaited<ReturnType<GateRepository['submitGateEvidence']>>> {
    return _sandbox.submitGateEvidence(input) as Promise<Awaited<ReturnType<GateRepository['submitGateEvidence']>>>;
  }

  async decideGate(input: Parameters<GateRepository['decideGate']>[0]): Promise<Awaited<ReturnType<GateRepository['decideGate']>>> {
    return _sandbox.decideGate(input) as Promise<Awaited<ReturnType<GateRepository['decideGate']>>>;
  }
}
