/**
 * PilotRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { PilotRepository } from "@partnora/services/pilots";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("pilots", "pilotId", ["listPilots", "createPilot", "getPilot"]);

export class PilotRepositoryDdb implements PilotRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async listPilots(input: Parameters<PilotRepository['listPilots']>[0]): Promise<Awaited<ReturnType<PilotRepository['listPilots']>>> {
    return _sandbox.listPilots(input) as Promise<Awaited<ReturnType<PilotRepository['listPilots']>>>;
  }

  async createPilot(input: Parameters<PilotRepository['createPilot']>[0]): Promise<Awaited<ReturnType<PilotRepository['createPilot']>>> {
    return _sandbox.createPilot(input) as Promise<Awaited<ReturnType<PilotRepository['createPilot']>>>;
  }

  async getPilot(input: Parameters<PilotRepository['getPilot']>[0]): Promise<Awaited<ReturnType<PilotRepository['getPilot']>>> {
    return _sandbox.getPilot(input) as Promise<Awaited<ReturnType<PilotRepository['getPilot']>>>;
  }
}
