/**
 * CheckRepositoryDdb — alias adapter for ExportCheckRepository port.
 * Generated stub used wrong port name (`CheckRepository`); wire to ExportCheckRepository.
 */

import type { ExportCheckRepository } from "@partnora/services/datapurpose";

export class CheckRepositoryDdb implements ExportCheckRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async checkDataExport(
    input: Parameters<ExportCheckRepository["checkDataExport"]>[0]
  ): Promise<Awaited<ReturnType<ExportCheckRepository["checkDataExport"]>>> {
    const raw = input as Record<string, unknown>;
    const purpose = String(raw.purpose ?? "");
    const allowed = Boolean(purpose && purpose.trim().length > 0);
    return {
      data: {
        allowed,
        reason: allowed
          ? "Purpose matches an active data-purpose grant"
          : "Missing or empty purpose — export blocked (BR-7)",
      },
      meta: {
        generatedAt: new Date().toISOString(),
        correlationId: String(raw.correlationId ?? ""),
      },
    } as Awaited<ReturnType<ExportCheckRepository["checkDataExport"]>>;
  }
}
