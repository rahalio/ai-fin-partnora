import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createDataPurpose_Body = z
  .object({
    dealId: z.string(),
    purpose: z.string().min(1),
    attributes: z.array(z.string()).optional(),
    retentionDays: z.number().int().gte(1),
    aadhaarLinked: z.boolean().optional(),
  })
  .passthrough();
const checkDataExport_Body = z
  .object({
    dealId: z.string(),
    purpose: z.string(),
    attributeCount: z.number().int().gte(1),
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
const DataPurposeId = z.string();
const DataPurpose = z
  .object({
    dataPurposeId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
    dealId: z.string(),
    purpose: z.string().min(1),
    attributes: z.array(z.string()).optional(),
    retentionDays: z.number().int().gte(1),
    aadhaarLinked: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DataPurposeListData = z
  .object({
    items: z.array(
      z
        .object({
          dataPurposeId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
          dealId: z.string(),
          purpose: z.string().min(1),
          attributes: z.array(z.string()).optional(),
          retentionDays: z.number().int().gte(1),
          aadhaarLinked: z.boolean().optional(),
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
const DataPurposeListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              dataPurposeId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
              dealId: z.string(),
              purpose: z.string().min(1),
              attributes: z.array(z.string()).optional(),
              retentionDays: z.number().int().gte(1),
              aadhaarLinked: z.boolean().optional(),
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
const DataPurposeCreateRequest = z
  .object({
    dealId: z.string(),
    purpose: z.string().min(1),
    attributes: z.array(z.string()).optional(),
    retentionDays: z.number().int().gte(1),
    aadhaarLinked: z.boolean().optional(),
  })
  .passthrough();
const DataPurposeResponse = z
  .object({
    data: z
      .object({
        dataPurposeId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
        dealId: z.string(),
        purpose: z.string().min(1),
        attributes: z.array(z.string()).optional(),
        retentionDays: z.number().int().gte(1),
        aadhaarLinked: z.boolean().optional(),
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
const DataExportAttemptRequest = z
  .object({
    dealId: z.string(),
    purpose: z.string(),
    attributeCount: z.number().int().gte(1),
  })
  .passthrough();
const DataExportAttempt = z
  .object({ allowed: z.boolean(), reason: z.string() })
  .passthrough();
const DataExportAttemptResponse = z
  .object({
    data: z.object({ allowed: z.boolean(), reason: z.string() }).passthrough(),
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
  createDataPurpose_Body,
  checkDataExport_Body,
  Problem,
  DataPurposeId,
  DataPurpose,
  DataPurposeListData,
  ResponseMeta,
  DataPurposeListResponse,
  DataPurposeCreateRequest,
  DataPurposeResponse,
  DataExportAttemptRequest,
  DataExportAttempt,
  DataExportAttemptResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/data-purposes',
    alias: 'listDataPurposes',
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
                  dataPurposeId: z
                    .string()
                    .regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  dealId: z.string(),
                  purpose: z.string().min(1),
                  attributes: z.array(z.string()).optional(),
                  retentionDays: z.number().int().gte(1),
                  aadhaarLinked: z.boolean().optional(),
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
    path: '/v1/data-purposes',
    alias: 'createDataPurpose',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createDataPurpose_Body,
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
            dataPurposeId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
            dealId: z.string(),
            purpose: z.string().min(1),
            attributes: z.array(z.string()).optional(),
            retentionDays: z.number().int().gte(1),
            aadhaarLinked: z.boolean().optional(),
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
    path: '/v1/data-purposes/:dataPurposeId',
    alias: 'getDataPurpose',
    requestFormat: 'json',
    parameters: [
      {
        name: 'dataPurposeId',
        type: 'Path',
        schema: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            dataPurposeId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
            dealId: z.string(),
            purpose: z.string().min(1),
            attributes: z.array(z.string()).optional(),
            retentionDays: z.number().int().gte(1),
            aadhaarLinked: z.boolean().optional(),
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
    method: 'delete',
    path: '/v1/data-purposes/:dataPurposeId',
    alias: 'revokeDataPurpose',
    requestFormat: 'json',
    parameters: [
      {
        name: 'dataPurposeId',
        type: 'Path',
        schema: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z.void(),
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
    path: '/v1/data-purposes/export-check',
    alias: 'checkDataExport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: checkDataExport_Body,
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
          .object({ allowed: z.boolean(), reason: z.string() })
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
