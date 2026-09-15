import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createOwnershipRule_Body = z
  .object({
    dealId: z.string(),
    journeyStep: z.string(),
    ownerParty: z.string(),
    complaintLiability: z.string(),
    routingSlaHours: z.number().int().gte(1).optional(),
  })
  .passthrough();
const updateOwnershipRule_Body = z
  .object({
    ownerParty: z.string(),
    complaintLiability: z.string(),
    routingSlaHours: z.number().int().gte(1),
  })
  .partial()
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
const OwnershipRuleId = z.string();
const CustomerOwnershipRule = z
  .object({
    ownershipRuleId: z.string().regex(/^own_[0-9A-HJKMNP-TV-Z]{26}$/),
    dealId: z.string(),
    journeyStep: z.string(),
    ownerParty: z.string(),
    complaintLiability: z.string(),
    routingSlaHours: z.number().int().gte(1).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const CustomerOwnershipRuleListData = z
  .object({
    items: z.array(
      z
        .object({
          ownershipRuleId: z.string().regex(/^own_[0-9A-HJKMNP-TV-Z]{26}$/),
          dealId: z.string(),
          journeyStep: z.string(),
          ownerParty: z.string(),
          complaintLiability: z.string(),
          routingSlaHours: z.number().int().gte(1).optional(),
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
const CustomerOwnershipRuleListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              ownershipRuleId: z.string().regex(/^own_[0-9A-HJKMNP-TV-Z]{26}$/),
              dealId: z.string(),
              journeyStep: z.string(),
              ownerParty: z.string(),
              complaintLiability: z.string(),
              routingSlaHours: z.number().int().gte(1).optional(),
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
const OwnershipRuleCreateRequest = z
  .object({
    dealId: z.string(),
    journeyStep: z.string(),
    ownerParty: z.string(),
    complaintLiability: z.string(),
    routingSlaHours: z.number().int().gte(1).optional(),
  })
  .passthrough();
const CustomerOwnershipRuleResponse = z
  .object({
    data: z
      .object({
        ownershipRuleId: z.string().regex(/^own_[0-9A-HJKMNP-TV-Z]{26}$/),
        dealId: z.string(),
        journeyStep: z.string(),
        ownerParty: z.string(),
        complaintLiability: z.string(),
        routingSlaHours: z.number().int().gte(1).optional(),
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
const UpdateOwnershipRuleRequest = z
  .object({
    ownerParty: z.string(),
    complaintLiability: z.string(),
    routingSlaHours: z.number().int().gte(1),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  createOwnershipRule_Body,
  updateOwnershipRule_Body,
  Problem,
  OwnershipRuleId,
  CustomerOwnershipRule,
  CustomerOwnershipRuleListData,
  ResponseMeta,
  CustomerOwnershipRuleListResponse,
  OwnershipRuleCreateRequest,
  CustomerOwnershipRuleResponse,
  UpdateOwnershipRuleRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/ownership-rules',
    alias: 'listOwnershipRules',
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
                  ownershipRuleId: z
                    .string()
                    .regex(/^own_[0-9A-HJKMNP-TV-Z]{26}$/),
                  dealId: z.string(),
                  journeyStep: z.string(),
                  ownerParty: z.string(),
                  complaintLiability: z.string(),
                  routingSlaHours: z.number().int().gte(1).optional(),
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
    path: '/v1/ownership-rules',
    alias: 'createOwnershipRule',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createOwnershipRule_Body,
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
            ownershipRuleId: z.string().regex(/^own_[0-9A-HJKMNP-TV-Z]{26}$/),
            dealId: z.string(),
            journeyStep: z.string(),
            ownerParty: z.string(),
            complaintLiability: z.string(),
            routingSlaHours: z.number().int().gte(1).optional(),
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
    path: '/v1/ownership-rules/:ownershipRuleId',
    alias: 'getOwnershipRule',
    requestFormat: 'json',
    parameters: [
      {
        name: 'ownershipRuleId',
        type: 'Path',
        schema: z.string().regex(/^own_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            ownershipRuleId: z.string().regex(/^own_[0-9A-HJKMNP-TV-Z]{26}$/),
            dealId: z.string(),
            journeyStep: z.string(),
            ownerParty: z.string(),
            complaintLiability: z.string(),
            routingSlaHours: z.number().int().gte(1).optional(),
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
    method: 'patch',
    path: '/v1/ownership-rules/:ownershipRuleId',
    alias: 'updateOwnershipRule',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateOwnershipRule_Body,
      },
      {
        name: 'ownershipRuleId',
        type: 'Path',
        schema: z.string().regex(/^own_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            ownershipRuleId: z.string().regex(/^own_[0-9A-HJKMNP-TV-Z]{26}$/),
            dealId: z.string(),
            journeyStep: z.string(),
            ownerParty: z.string(),
            complaintLiability: z.string(),
            routingSlaHours: z.number().int().gte(1).optional(),
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
