/**
 * IncidentRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { IncidentRepository } from "@partnora/services/audits";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("audits-incidents", "incidentId", ["listIncidents", "createIncident"]);

export class IncidentRepositoryDdb implements IncidentRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async listIncidents(input: Parameters<IncidentRepository['listIncidents']>[0]): Promise<Awaited<ReturnType<IncidentRepository['listIncidents']>>> {
    return _sandbox.listIncidents(input) as Promise<Awaited<ReturnType<IncidentRepository['listIncidents']>>>;
  }

  async createIncident(input: Parameters<IncidentRepository['createIncident']>[0]): Promise<Awaited<ReturnType<IncidentRepository['createIncident']>>> {
    return _sandbox.createIncident(input) as Promise<Awaited<ReturnType<IncidentRepository['createIncident']>>>;
  }
}
