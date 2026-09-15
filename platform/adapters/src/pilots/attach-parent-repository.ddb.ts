/**
 * AttachParentRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { AttachParentRepository } from "@partnora/services/pilots";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("pilots", "pilotId", ["attachPilotParent"]);

export class AttachParentRepositoryDdb implements AttachParentRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async attachPilotParent(input: Parameters<AttachParentRepository['attachPilotParent']>[0]): Promise<Awaited<ReturnType<AttachParentRepository['attachPilotParent']>>> {
    return _sandbox.attachPilotParent(input) as Promise<Awaited<ReturnType<AttachParentRepository['attachPilotParent']>>>;
  }
}
