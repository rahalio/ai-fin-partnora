import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createPilot_Body = z
  .object({
    name: z.string().min(1),
    kind: z.enum(['ai', 'rpa', 'blockchain', 'cyber', 'other']),
    parentDealId: z.string(),
  })
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const PilotId = z.string();
const PilotKind = z.enum(['ai', 'rpa', 'blockchain', 'cyber', 'other']);
const PilotStatus = z.enum(['active', 'quarantined', 'promoted', 'killed']);
const Pilot = z
  .object({
    pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1),
    kind: z.enum(['ai', 'rpa', 'blockchain', 'cyber', 'other']),
    parentDealId: z.string().optional(),
    status: z.enum(['active', 'quarantined', 'promoted', 'killed']),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const PilotListData = z
  .object({
    items: z.array(
      z
        .object({
          pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1),
          kind: z.enum(['ai', 'rpa', 'blockchain', 'cyber', 'other']),
          parentDealId: z.string().optional(),
          status: z.enum(['active', 'quarantined', 'promoted', 'killed']),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const PilotListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1),
              kind: z.enum(['ai', 'rpa', 'blockchain', 'cyber', 'other']),
              parentDealId: z.string().optional(),
              status: z.enum(['active', 'quarantined', 'promoted', 'killed']),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const PilotCreateRequest = z
  .object({
    name: z.string().min(1),
    kind: z.enum(['ai', 'rpa', 'blockchain', 'cyber', 'other']),
    parentDealId: z.string(),
  })
  .passthrough();
const PilotResponse = z
  .object({
    data: z
      .object({
        pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1),
        kind: z.enum(['ai', 'rpa', 'blockchain', 'cyber', 'other']),
        parentDealId: z.string().optional(),
        status: z.enum(['active', 'quarantined', 'promoted', 'killed']),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const AttachPilotParentRequest = z
  .object({ parentDealId: z.string() })
  .passthrough();

export const schemas: any = {
  createPilot_Body,
  Problem,
  PilotId,
  PilotKind,
  PilotStatus,
  Pilot,
  PilotListData,
  ResponseMeta,
  PilotListResponse,
  PilotCreateRequest,
  PilotResponse,
  AttachPilotParentRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/pilots',
    alias: 'listPilots',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'parentDealId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'orphansOnly',
        type: 'Query',
        schema: z.boolean().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1),
                  kind: z.enum(['ai', 'rpa', 'blockchain', 'cyber', 'other']),
                  parentDealId: z.string().optional(),
                  status: z.enum([
                    'active',
                    'quarantined',
                    'promoted',
                    'killed',
                  ]),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/pilots',
    alias: 'createPilot',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createPilot_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1),
            kind: z.enum(['ai', 'rpa', 'blockchain', 'cyber', 'other']),
            parentDealId: z.string().optional(),
            status: z.enum(['active', 'quarantined', 'promoted', 'killed']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/pilots/:pilotId',
    alias: 'getPilot',
    requestFormat: 'json',
    parameters: [
      {
        name: 'pilotId',
        type: 'Path',
        schema: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1),
            kind: z.enum(['ai', 'rpa', 'blockchain', 'cyber', 'other']),
            parentDealId: z.string().optional(),
            status: z.enum(['active', 'quarantined', 'promoted', 'killed']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/pilots/:pilotId/attach-parent',
    alias: 'attachPilotParent',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ parentDealId: z.string() }).passthrough(),
      },
      {
        name: 'pilotId',
        type: 'Path',
        schema: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1),
            kind: z.enum(['ai', 'rpa', 'blockchain', 'cyber', 'other']),
            parentDealId: z.string().optional(),
            status: z.enum(['active', 'quarantined', 'promoted', 'killed']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/pilots/:pilotId/quarantine',
    alias: 'quarantinePilot',
    requestFormat: 'json',
    parameters: [
      {
        name: 'pilotId',
        type: 'Path',
        schema: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            pilotId: z.string().regex(/^plt_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1),
            kind: z.enum(['ai', 'rpa', 'blockchain', 'cyber', 'other']),
            parentDealId: z.string().optional(),
            status: z.enum(['active', 'quarantined', 'promoted', 'killed']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
