/**
 * ID Generator Service Implementation — Partnora prefixes.
 */

import type { DomainCode } from '@partnora/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@partnora/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@partnora/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length < 3 || prefix.length > 4 || !/^[a-z]{3,4}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be 3–4 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  ptnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.partners);
  }
  oppId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.opportunities);
  }
  dealId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.deals);
  }
  gateId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.gates);
  }
  chnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.channels);
  }
  cflId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.conflicts);
  }
  ownId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.ownership);
  }
  dprId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.datapurpose);
  }
  ecoId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.economics);
  }
  pltId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.pilots);
  }
  audId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.audits);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
