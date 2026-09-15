/**
 * ExportRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { ExportRepository } from "@partnora/services/audits";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("audits-exports", "auditExportId", ["listAuditExports", "createAuditExport", "getAuditExport"]);

export class ExportRepositoryDdb implements ExportRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async listAuditExports(input: Parameters<ExportRepository['listAuditExports']>[0]): Promise<Awaited<ReturnType<ExportRepository['listAuditExports']>>> {
    return _sandbox.listAuditExports(input) as Promise<Awaited<ReturnType<ExportRepository['listAuditExports']>>>;
  }

  async createAuditExport(input: Parameters<ExportRepository['createAuditExport']>[0]): Promise<Awaited<ReturnType<ExportRepository['createAuditExport']>>> {
    return _sandbox.createAuditExport(input) as Promise<Awaited<ReturnType<ExportRepository['createAuditExport']>>>;
  }

  async getAuditExport(input: Parameters<ExportRepository['getAuditExport']>[0]): Promise<Awaited<ReturnType<ExportRepository['getAuditExport']>>> {
    return _sandbox.getAuditExport(input) as Promise<Awaited<ReturnType<ExportRepository['getAuditExport']>>>;
  }
}
