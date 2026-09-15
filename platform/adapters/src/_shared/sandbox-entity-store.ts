/**
 * In-memory entity store for Partnora product domains (sandbox / local).
 * Used when OpenAPI ops lack x-dynamodb metadata.
 */

import { nowIso, responseMeta } from './sandbox-store.js';

const stores = new Map<string, Map<string, Record<string, unknown>>>();

function bucket(name: string): Map<string, Record<string, unknown>> {
  let b = stores.get(name);
  if (!b) {
    b = new Map();
    stores.set(name, b);
    seed(name, b);
  }
  return b;
}

function seed(name: string, b: Map<string, Record<string, unknown>>) {
  const ts = nowIso();
  if (name === 'partners' && b.size === 0) {
    b.set('ptn_01DEMO00000000000000000001', {
      partnerId: 'ptn_01DEMO00000000000000000001',
      name: 'Fino Payments Bank (demo)',
      posture: 'paymentsBank',
      prohibitedActivities: ['lending', 'creditBook'],
      createdAt: ts,
      updatedAt: ts,
    });
  }
}

function pickId(raw: Record<string, unknown>, keys: string[]): string | undefined {
  for (const k of keys) {
    const v = raw[k];
    if (typeof v === 'string' && v.length > 0) return v;
  }
  return undefined;
}

function envelope(data: unknown, correlationId?: string) {
  return { data, ...responseMeta(correlationId) };
}

/**
 * Create a sandbox DDB-style repository implementing the given method names.
 * Heuristics: listXxx returns items; createXxx persists; getXxx fetches;
 * updateXxx or patchXxx merges; other verbs mutate or return decisions.
 */
export function createSandboxRepository(
  storeName: string,
  idField: string,
  methodNames: string[]
): Record<string, (input: unknown) => Promise<unknown>> {
  const impl: Record<string, (input: unknown) => Promise<unknown>> = {};
  const b = () => bucket(storeName);

  for (const method of methodNames) {
    const lower = method.toLowerCase();
    if (lower.startsWith('list')) {
      impl[method] = async (input) => {
        const raw = (input ?? {}) as Record<string, unknown>;
        const items = [...b().values()];
        const dealId = raw.dealId ? String(raw.dealId) : undefined;
        const filtered = dealId
          ? items.filter((i) => String(i.dealId ?? '') === dealId)
          : items;
        return envelope({ items: filtered }, String(raw.correlationId ?? ''));
      };
    } else if (lower.startsWith('create') || lower.startsWith('submit')) {
      impl[method] = async (input) => {
        const raw = { ...((input ?? {}) as Record<string, unknown>) };
        const correlationId = String(raw.correlationId ?? '');
        const id =
          pickId(raw, ['id', idField]) ??
          `${idField.replace(/Id$/, '')}_${Date.now().toString(36)}`;
        const ts = nowIso();
        const { orgId: _o, correlationId: _c, createdByActorId: _a, createdByActorType: _t, id: _id, ...rest } = raw;
        const entity: Record<string, unknown> = {
          ...rest,
          [idField]: id,
          createdAt: ts,
          updatedAt: ts,
        };
        // Defaults for common fields
        if (storeName === 'partners' && !entity.posture) entity.posture = 'fintech';
        if (storeName === 'opportunities' && !entity.status) entity.status = 'pipeline';
        if (storeName === 'deals') {
          if (!entity.status) entity.status = 'draft';
          if (entity.gatesComplete === undefined) entity.gatesComplete = false;
        }
        if (storeName === 'gates' && !entity.status) entity.status = 'pending';
        if (storeName === 'conflicts' && !entity.status) entity.status = 'open';
        if (storeName === 'pilots' && !entity.status) entity.status = 'active';
        if (storeName === 'audits' && !entity.status) entity.status = 'pending';
        b().set(String(id), entity);
        return envelope(entity, correlationId);
      };
    } else if (lower.startsWith('get')) {
      impl[method] = async (input) => {
        const raw = (input ?? {}) as Record<string, unknown>;
        const id = pickId(raw, [idField, 'id', Object.keys(raw).find((k) => k.endsWith('Id')) ?? '']);
        const entity = id ? b().get(id) : undefined;
        if (!entity) {
          const err = new Error('Not found') as Error & { statusCode?: number };
          err.statusCode = 404;
          throw err;
        }
        return envelope(entity, String(raw.correlationId ?? ''));
      };
    } else if (lower.startsWith('update') || lower.startsWith('patch')) {
      impl[method] = async (input) => {
        const raw = (input ?? {}) as Record<string, unknown>;
        const id = pickId(raw, [idField, 'id']);
        if (!id || !b().has(id)) {
          const err = new Error('Not found') as Error & { statusCode?: number };
          err.statusCode = 404;
          throw err;
        }
        const prev = b().get(id)!;
        const { orgId: _o, correlationId, createdByActorId: _a, createdByActorType: _t, id: _id, ...rest } = raw;
        const next = { ...prev, ...rest, [idField]: id, updatedAt: nowIso() };
        b().set(id, next);
        return envelope(next, String(correlationId ?? ''));
      };
    } else if (lower.startsWith('revoke') || lower.startsWith('delete')) {
      impl[method] = async (input) => {
        const raw = (input ?? {}) as Record<string, unknown>;
        const id = pickId(raw, [idField, 'id', 'dataPurposeId']);
        if (id) b().delete(id);
        return undefined;
      };
    } else if (lower.includes('export') && lower.includes('check')) {
      impl[method] = async (input) => {
        const raw = (input ?? {}) as Record<string, unknown>;
        const purpose = String(raw.purpose ?? '');
        const allowed = purpose.trim().length > 0;
        return envelope(
          {
            allowed,
            reason: allowed
              ? 'Purpose matches an active data-purpose grant'
              : 'Missing or empty purpose - export blocked (BR-7)',
          },
          String(raw.correlationId ?? '')
        );
      };
    } else {
      // Action verbs: launch, score, advance, quarantine, accept, remediate, exit, ingest, decide, attach...
      impl[method] = async (input) => {
        const raw = (input ?? {}) as Record<string, unknown>;
        const correlationId = String(raw.correlationId ?? '');
        const id = pickId(raw, [idField, 'id', 'dealId', 'opportunityId', 'pilotId', 'conflictId', 'gateId', 'channelNodeId']);
        if (id && b().has(id)) {
          const prev = b().get(id)!;
          const next: Record<string, unknown> = { ...prev, ...raw, updatedAt: nowIso() };
          if (lower.includes('launch')) {
            next.status = prev.gatesComplete ? 'live' : prev.status;
            if (!prev.gatesComplete) {
              next.launchBlocked = true;
              next.launchBlockReason = 'Incomplete compliance gates (BR-3)';
            }
          }
          if (lower.includes('score')) next.status = 'scoring';
          if (lower.includes('advance')) next.status = raw.status ?? 'scoring';
          if (lower.includes('quarantine')) next.status = 'quarantined';
          if (lower.includes('accept')) next.status = 'accepted';
          if (lower.includes('remediate')) next.status = 'remediating';
          if (lower.includes('exit')) next.status = 'exiting';
          if (lower.includes('ingest')) {
            if (raw.activations !== undefined) next.activations = raw.activations;
            if (raw.dormancyRate !== undefined) next.dormancyRate = raw.dormancyRate;
          }
          if (lower.includes('decide') && raw.status) next.status = raw.status;
          if (lower.includes('attach') && raw.parentDealId) {
            next.parentDealId = raw.parentDealId;
            next.status = 'active';
          }
          if (lower.includes('submit') && storeName === 'deals') next.status = 'gated';
          b().set(id, next);
          return envelope(next, correlationId);
        }
        // list-like action (e.g. startMaReassessment)
        if (lower.includes('reassessment')) {
          const items: Record<string, unknown>[] = [...b().values()].map((d) => ({
            ...d,
            reassessmentStatus: 'pending',
            updatedAt: nowIso(),
          }));
          for (const item of items) {
            const key = String(item[idField] ?? '');
            if (key) b().set(key, item);
          }
          return envelope({ items }, correlationId);
        }
        return envelope({ items: [...b().values()] }, correlationId);
      };
    }
  }

  return impl;
}

export function assignSandboxMethods<T extends object>(
  target: T,
  storeName: string,
  idField: string,
  methodNames: string[]
): T {
  const impl = createSandboxRepository(storeName, idField, methodNames);
  for (const [name, fn] of Object.entries(impl)) {
    (target as Record<string, unknown>)[name] = fn.bind(target);
  }
  return target;
}
