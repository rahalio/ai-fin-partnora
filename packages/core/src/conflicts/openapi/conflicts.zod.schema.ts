import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createConflict_Body = z
  .object({
    dealId: z.string(),
    description: z.string().min(1),
    mitigation: z.string().optional(),
    overlappingProducts: z.array(z.string()).optional(),
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
const ConflictId = z.string();
const ConflictStatus = z.enum(['open', 'mitigated', 'accepted']);
const Conflict = z
  .object({
    conflictId: z.string().regex(/^cfl_[0-9A-HJKMNP-TV-Z]{26}$/),
    dealId: z.string(),
    description: z.string().min(1),
    mitigation: z.string().optional(),
    overlappingProducts: z.array(z.string()).optional(),
    status: z.enum(['open', 'mitigated', 'accepted']),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ConflictListData = z
  .object({
    items: z.array(
      z
        .object({
          conflictId: z.string().regex(/^cfl_[0-9A-HJKMNP-TV-Z]{26}$/),
          dealId: z.string(),
          description: z.string().min(1),
          mitigation: z.string().optional(),
          overlappingProducts: z.array(z.string()).optional(),
          status: z.enum(['open', 'mitigated', 'accepted']),
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
const ConflictListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              conflictId: z.string().regex(/^cfl_[0-9A-HJKMNP-TV-Z]{26}$/),
              dealId: z.string(),
              description: z.string().min(1),
              mitigation: z.string().optional(),
              overlappingProducts: z.array(z.string()).optional(),
              status: z.enum(['open', 'mitigated', 'accepted']),
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
const ConflictCreateRequest = z
  .object({
    dealId: z.string(),
    description: z.string().min(1),
    mitigation: z.string().optional(),
    overlappingProducts: z.array(z.string()).optional(),
  })
  .passthrough();
const ConflictResponse = z
  .object({
    data: z
      .object({
        conflictId: z.string().regex(/^cfl_[0-9A-HJKMNP-TV-Z]{26}$/),
        dealId: z.string(),
        description: z.string().min(1),
        mitigation: z.string().optional(),
        overlappingProducts: z.array(z.string()).optional(),
        status: z.enum(['open', 'mitigated', 'accepted']),
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
const AcceptConflictMitigationRequest = z
  .object({ notes: z.string() })
  .partial()
  .passthrough();

export const schemas: any = {
  createConflict_Body,
  Problem,
  ConflictId,
  ConflictStatus,
  Conflict,
  ConflictListData,
  ResponseMeta,
  ConflictListResponse,
  ConflictCreateRequest,
  ConflictResponse,
  AcceptConflictMitigationRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/conflicts',
    alias: 'listConflicts',
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
        name: 'dealId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  conflictId: z.string().regex(/^cfl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  dealId: z.string(),
                  description: z.string().min(1),
                  mitigation: z.string().optional(),
                  overlappingProducts: z.array(z.string()).optional(),
                  status: z.enum(['open', 'mitigated', 'accepted']),
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
    path: '/v1/conflicts',
    alias: 'createConflict',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createConflict_Body,
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
            conflictId: z.string().regex(/^cfl_[0-9A-HJKMNP-TV-Z]{26}$/),
            dealId: z.string(),
            description: z.string().min(1),
            mitigation: z.string().optional(),
            overlappingProducts: z.array(z.string()).optional(),
            status: z.enum(['open', 'mitigated', 'accepted']),
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
    path: '/v1/conflicts/:conflictId',
    alias: 'getConflict',
    requestFormat: 'json',
    parameters: [
      {
        name: 'conflictId',
        type: 'Path',
        schema: z.string().regex(/^cfl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            conflictId: z.string().regex(/^cfl_[0-9A-HJKMNP-TV-Z]{26}$/),
            dealId: z.string(),
            description: z.string().min(1),
            mitigation: z.string().optional(),
            overlappingProducts: z.array(z.string()).optional(),
            status: z.enum(['open', 'mitigated', 'accepted']),
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
    path: '/v1/conflicts/:conflictId/accept',
    alias: 'acceptConflictMitigation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ notes: z.string() })
          .partial()
          .passthrough()
          .optional(),
      },
      {
        name: 'conflictId',
        type: 'Path',
        schema: z.string().regex(/^cfl_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            conflictId: z.string().regex(/^cfl_[0-9A-HJKMNP-TV-Z]{26}$/),
            dealId: z.string(),
            description: z.string().min(1),
            mitigation: z.string().optional(),
            overlappingProducts: z.array(z.string()).optional(),
            status: z.enum(['open', 'mitigated', 'accepted']),
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
