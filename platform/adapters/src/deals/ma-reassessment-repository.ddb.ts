/**
 * MaReassessmentRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { MaReassessmentRepository } from "@partnora/services/deals";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("deals", "dealId", ["startMaReassessment"]);

export class MaReassessmentRepositoryDdb implements MaReassessmentRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async startMaReassessment(input: Parameters<MaReassessmentRepository['startMaReassessment']>[0]): Promise<Awaited<ReturnType<MaReassessmentRepository['startMaReassessment']>>> {
    return _sandbox.startMaReassessment(input) as Promise<Awaited<ReturnType<MaReassessmentRepository['startMaReassessment']>>>;
  }
}
