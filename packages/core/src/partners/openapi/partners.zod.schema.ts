import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createPartner_Body = z
  .object({
    name: z.string().min(1).max(200),
    posture: z.enum([
      'bank',
      'paymentsBank',
      'smallFinanceBank',
      'nbfc',
      'fintech',
      'bc',
      'ngo',
      'merchant',
    ]),
    prohibitedActivities: z.array(z.string()).optional(),
  })
  .passthrough();
const updatePartner_Body = z
  .object({
    name: z.string().min(1).max(200),
    prohibitedActivities: z.array(z.string()),
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
const PartnerId = z.string();
const RegulatoryPosture = z.enum([
  'bank',
  'paymentsBank',
  'smallFinanceBank',
  'nbfc',
  'fintech',
  'bc',
  'ngo',
  'merchant',
]);
const Partner = z
  .object({
    partnerId: z.string().regex(/^ptn_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1).max(200),
    posture: z.enum([
      'bank',
      'paymentsBank',
      'smallFinanceBank',
      'nbfc',
      'fintech',
      'bc',
      'ngo',
      'merchant',
    ]),
    prohibitedActivities: z.array(z.string()).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const PartnerListData = z
  .object({
    items: z.array(
      z
        .object({
          partnerId: z.string().regex(/^ptn_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1).max(200),
          posture: z.enum([
            'bank',
            'paymentsBank',
            'smallFinanceBank',
            'nbfc',
            'fintech',
            'bc',
            'ngo',
            'merchant',
          ]),
          prohibitedActivities: z.array(z.string()).optional(),
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
const PartnerListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              partnerId: z.string().regex(/^ptn_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1).max(200),
              posture: z.enum([
                'bank',
                'paymentsBank',
                'smallFinanceBank',
                'nbfc',
                'fintech',
                'bc',
                'ngo',
                'merchant',
              ]),
              prohibitedActivities: z.array(z.string()).optional(),
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
const PartnerCreateRequest = z
  .object({
    name: z.string().min(1).max(200),
    posture: z.enum([
      'bank',
      'paymentsBank',
      'smallFinanceBank',
      'nbfc',
      'fintech',
      'bc',
      'ngo',
      'merchant',
    ]),
    prohibitedActivities: z.array(z.string()).optional(),
  })
  .passthrough();
const PartnerResponse = z
  .object({
    data: z
      .object({
        partnerId: z.string().regex(/^ptn_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1).max(200),
        posture: z.enum([
          'bank',
          'paymentsBank',
          'smallFinanceBank',
          'nbfc',
          'fintech',
          'bc',
          'ngo',
          'merchant',
        ]),
        prohibitedActivities: z.array(z.string()).optional(),
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
const UpdatePartnerRequest = z
  .object({
    name: z.string().min(1).max(200),
    prohibitedActivities: z.array(z.string()),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  createPartner_Body,
  updatePartner_Body,
  Problem,
  PartnerId,
  RegulatoryPosture,
  Partner,
  PartnerListData,
  ResponseMeta,
  PartnerListResponse,
  PartnerCreateRequest,
  PartnerResponse,
  UpdatePartnerRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/partners',
    alias: 'listPartners',
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
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  partnerId: z.string().regex(/^ptn_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1).max(200),
                  posture: z.enum([
                    'bank',
                    'paymentsBank',
                    'smallFinanceBank',
                    'nbfc',
                    'fintech',
                    'bc',
                    'ngo',
                    'merchant',
                  ]),
                  prohibitedActivities: z.array(z.string()).optional(),
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
    path: '/v1/partners',
    alias: 'createPartner',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createPartner_Body,
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
            partnerId: z.string().regex(/^ptn_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            posture: z.enum([
              'bank',
              'paymentsBank',
              'smallFinanceBank',
              'nbfc',
              'fintech',
              'bc',
              'ngo',
              'merchant',
            ]),
            prohibitedActivities: z.array(z.string()).optional(),
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
    path: '/v1/partners/:partnerId',
    alias: 'getPartner',
    requestFormat: 'json',
    parameters: [
      {
        name: 'partnerId',
        type: 'Path',
        schema: z.string().regex(/^ptn_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            partnerId: z.string().regex(/^ptn_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            posture: z.enum([
              'bank',
              'paymentsBank',
              'smallFinanceBank',
              'nbfc',
              'fintech',
              'bc',
              'ngo',
              'merchant',
            ]),
            prohibitedActivities: z.array(z.string()).optional(),
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
    path: '/v1/partners/:partnerId',
    alias: 'updatePartner',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updatePartner_Body,
      },
      {
        name: 'partnerId',
        type: 'Path',
        schema: z.string().regex(/^ptn_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            partnerId: z.string().regex(/^ptn_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            posture: z.enum([
              'bank',
              'paymentsBank',
              'smallFinanceBank',
              'nbfc',
              'fintech',
              'bc',
              'ngo',
              'merchant',
            ]),
            prohibitedActivities: z.array(z.string()).optional(),
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
