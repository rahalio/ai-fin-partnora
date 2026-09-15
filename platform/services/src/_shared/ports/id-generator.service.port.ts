/**
 * IdGeneratorService Port — Partnora domain prefixes.
 */

import type { DomainCode } from '@partnora/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  ptnId(): string;
  oppId(): string;
  dealId(): string;
  gateId(): string;
  chnId(): string;
  cflId(): string;
  ownId(): string;
  dprId(): string;
  ecoId(): string;
  pltId(): string;
  audId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
