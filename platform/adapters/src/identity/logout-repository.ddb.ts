/**
 * LogoutRepositoryDdb — sandbox no-op logout.
 */

import type { LogoutRepository } from "@partnora/services/identity";

export class LogoutRepositoryDdb implements LogoutRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async operatorLogout(
    _input: Parameters<LogoutRepository["operatorLogout"]>[0]
  ): Promise<Awaited<ReturnType<LogoutRepository["operatorLogout"]>>> {
    return {} as Awaited<ReturnType<LogoutRepository["operatorLogout"]>>;
  }
}
