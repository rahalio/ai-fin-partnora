import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createEconomicsSnapshot_Body = z
  .object({
    dealId: z.string(),
    period: z.string(),
    costToServe: z.number(),
    feeIncome: z.number(),
    floatIncome: z.number(),
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
const EconomicsSnapshotId = z.string();
const EconomicsSnapshot = z
  .object({
    economicsSnapshotId: z.string().regex(/^eco_[0-9A-HJKMNP-TV-Z]{26}$/),
    dealId: z.string(),
    period: z.string(),
    costToServe: z.number(),
    feeIncome: z.number(),
    floatIncome: z.number(),
    valueDestroying: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const EconomicsSnapshotListData = z
  .object({
    items: z.array(
      z
        .object({
          economicsSnapshotId: z.string().regex(/^eco_[0-9A-HJKMNP-TV-Z]{26}$/),
          dealId: z.string(),
          period: z.string(),
          costToServe: z.number(),
          feeIncome: z.number(),
          floatIncome: z.number(),
          valueDestroying: z.boolean().optional(),
          createdAt: z.string().datetime({ offset: true }),
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
const EconomicsSnapshotListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              economicsSnapshotId: z
                .string()
                .regex(/^eco_[0-9A-HJKMNP-TV-Z]{26}$/),
              dealId: z.string(),
              period: z.string(),
              costToServe: z.number(),
              feeIncome: z.number(),
              floatIncome: z.number(),
              valueDestroying: z.boolean().optional(),
              createdAt: z.string().datetime({ offset: true }),
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
const EconomicsSnapshotCreateRequest = z
  .object({
    dealId: z.string(),
    period: z.string(),
    costToServe: z.number(),
    feeIncome: z.number(),
    floatIncome: z.number(),
  })
  .passthrough();
const EconomicsSnapshotResponse = z
  .object({
    data: z
      .object({
        economicsSnapshotId: z.string().regex(/^eco_[0-9A-HJKMNP-TV-Z]{26}$/),
        dealId: z.string(),
        period: z.string(),
        costToServe: z.number(),
        feeIncome: z.number(),
        floatIncome: z.number(),
        valueDestroying: z.boolean().optional(),
        createdAt: z.string().datetime({ offset: true }),
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

export const schemas: any = {
  createEconomicsSnapshot_Body,
  Problem,
  EconomicsSnapshotId,
  EconomicsSnapshot,
  EconomicsSnapshotListData,
  ResponseMeta,
  EconomicsSnapshotListResponse,
  EconomicsSnapshotCreateRequest,
  EconomicsSnapshotResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/economics',
    alias: 'listEconomicsSnapshots',
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
        schema: z.string(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  economicsSnapshotId: z
                    .string()
                    .regex(/^eco_[0-9A-HJKMNP-TV-Z]{26}$/),
                  dealId: z.string(),
                  period: z.string(),
                  costToServe: z.number(),
                  feeIncome: z.number(),
                  floatIncome: z.number(),
                  valueDestroying: z.boolean().optional(),
                  createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/economics',
    alias: 'createEconomicsSnapshot',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createEconomicsSnapshot_Body,
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
            economicsSnapshotId: z
              .string()
              .regex(/^eco_[0-9A-HJKMNP-TV-Z]{26}$/),
            dealId: z.string(),
            period: z.string(),
            costToServe: z.number(),
            feeIncome: z.number(),
            floatIncome: z.number(),
            valueDestroying: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/economics/:economicsSnapshotId',
    alias: 'getEconomicsSnapshot',
    requestFormat: 'json',
    parameters: [
      {
        name: 'economicsSnapshotId',
        type: 'Path',
        schema: z.string().regex(/^eco_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            economicsSnapshotId: z
              .string()
              .regex(/^eco_[0-9A-HJKMNP-TV-Z]{26}$/),
            dealId: z.string(),
            period: z.string(),
            costToServe: z.number(),
            feeIncome: z.number(),
            floatIncome: z.number(),
            valueDestroying: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
