/**
 * DataPurposeRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { DataPurposeRepository } from "@partnora/services/datapurpose";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("datapurpose", "dataPurposeId", ["listDataPurposes", "createDataPurpose", "getDataPurpose", "revokeDataPurpose"]);

export class DataPurposeRepositoryDdb implements DataPurposeRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async listDataPurposes(input: Parameters<DataPurposeRepository['listDataPurposes']>[0]): Promise<Awaited<ReturnType<DataPurposeRepository['listDataPurposes']>>> {
    return _sandbox.listDataPurposes(input) as Promise<Awaited<ReturnType<DataPurposeRepository['listDataPurposes']>>>;
  }

  async createDataPurpose(input: Parameters<DataPurposeRepository['createDataPurpose']>[0]): Promise<Awaited<ReturnType<DataPurposeRepository['createDataPurpose']>>> {
    return _sandbox.createDataPurpose(input) as Promise<Awaited<ReturnType<DataPurposeRepository['createDataPurpose']>>>;
  }

  async getDataPurpose(input: Parameters<DataPurposeRepository['getDataPurpose']>[0]): Promise<Awaited<ReturnType<DataPurposeRepository['getDataPurpose']>>> {
    return _sandbox.getDataPurpose(input) as Promise<Awaited<ReturnType<DataPurposeRepository['getDataPurpose']>>>;
  }

  async revokeDataPurpose(input: Parameters<DataPurposeRepository['revokeDataPurpose']>[0]): Promise<Awaited<ReturnType<DataPurposeRepository['revokeDataPurpose']>>> {
    return _sandbox.revokeDataPurpose(input) as Promise<Awaited<ReturnType<DataPurposeRepository['revokeDataPurpose']>>>;
  }
}
