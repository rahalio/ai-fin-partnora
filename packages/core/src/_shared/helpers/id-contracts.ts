/**
 * ID Contracts — Partnora
 *
 * Format: {prefix}_{ulid} (lowercase Crockford base32 ULID).
 */

export const DOMAIN_PREFIX_MAP = {
  tenant: 'tnt',
  auth: 'aut',
  apiKey: 'key',
  identity: 'idn',
  partners: 'ptn',
  opportunities: 'opp',
  deals: 'deal',
  gates: 'gate',
  channels: 'chn',
  conflicts: 'cfl',
  ownership: 'own',
  datapurpose: 'dpr',
  economics: 'eco',
  pilots: 'plt',
  audits: 'aud',
} as const;

export type DomainCode = keyof typeof DOMAIN_PREFIX_MAP;
export type DomainPrefix = (typeof DOMAIN_PREFIX_MAP)[DomainCode];

export function isValidDomainId(value: string): boolean {
  if (!value || typeof value !== 'string') return false;
  const normalized = value.toLowerCase();
  const idRegex = /^[a-z]{3,4}_[0-9a-hjkmnp-tv-z]{26}$/;
  return idRegex.test(normalized);
}

export function extractDomainFromId(id: string): DomainCode | null {
  if (!id || typeof id !== 'string') return null;
  const normalized = id.toLowerCase();
  if (!isValidDomainId(normalized)) return null;
  const underscore = normalized.indexOf('_');
  const prefix = normalized.substring(0, underscore);
  const entry = Object.entries(DOMAIN_PREFIX_MAP).find(
    ([_, domainPrefix]) => domainPrefix === prefix
  );
  return entry ? (entry[0] as DomainCode) : null;
}
