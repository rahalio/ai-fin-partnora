import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createDeal_Body = z
  .object({
    opportunityId: z.string(),
    commercialModel: z.enum(['revenueShare', 'fee', 'costPerActivation']),
    commercialTerms: z
      .object({
        model: z.enum(['revenueShare', 'fee', 'costPerActivation']),
        bankRole: z.string().optional(),
        partnerRole: z.string().optional(),
        shareBps: z.number().int().gte(0).lte(10000).optional(),
        feeAmount: z.number().optional(),
        currency: z.string().optional().default('INR'),
      })
      .passthrough()
      .optional(),
    inclusionKpis: z
      .array(
        z
          .object({
            name: z.string(),
            target: z.number(),
            unit: z.string().optional(),
            actual: z.number().optional(),
          })
          .passthrough()
      )
      .optional(),
    exitTerms: z.string().min(1),
  })
  .passthrough();
const updateDeal_Body = z
  .object({
    commercialTerms: z
      .object({
        model: z.enum(['revenueShare', 'fee', 'costPerActivation']),
        bankRole: z.string().optional(),
        partnerRole: z.string().optional(),
        shareBps: z.number().int().gte(0).lte(10000).optional(),
        feeAmount: z.number().optional(),
        currency: z.string().optional().default('INR'),
      })
      .passthrough(),
    inclusionKpis: z.array(
      z
        .object({
          name: z.string(),
          target: z.number(),
          unit: z.string().optional(),
          actual: z.number().optional(),
        })
        .passthrough()
    ),
    exitTerms: z.string(),
  })
  .partial()
  .passthrough();
const startMaReassessment_Body = z
  .object({
    inheritedDealIds: z.array(z.string()).min(1),
    notes: z.string().optional(),
  })
  .passthrough();
const DealStatus = z.enum(['draft', 'gated', 'live', 'remediating', 'exiting']);
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
const DealId = z.string();
const CommercialModel = z.enum(['revenueShare', 'fee', 'costPerActivation']);
const CommercialTerm = z
  .object({
    model: z.enum(['revenueShare', 'fee', 'costPerActivation']),
    bankRole: z.string().optional(),
    partnerRole: z.string().optional(),
    shareBps: z.number().int().gte(0).lte(10000).optional(),
    feeAmount: z.number().optional(),
    currency: z.string().optional().default('INR'),
  })
  .passthrough();
const InclusionKpi = z
  .object({
    name: z.string(),
    target: z.number(),
    unit: z.string().optional(),
    actual: z.number().optional(),
  })
  .passthrough();
const Deal = z
  .object({
    dealId: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
    opportunityId: z.string().optional(),
    status: z.enum(['draft', 'gated', 'live', 'remediating', 'exiting']),
    commercialModel: z.enum(['revenueShare', 'fee', 'costPerActivation']),
    commercialTerms: z
      .object({
        model: z.enum(['revenueShare', 'fee', 'costPerActivation']),
        bankRole: z.string().optional(),
        partnerRole: z.string().optional(),
        shareBps: z.number().int().gte(0).lte(10000).optional(),
        feeAmount: z.number().optional(),
        currency: z.string().optional().default('INR'),
      })
      .passthrough()
      .optional(),
    inclusionKpis: z
      .array(
        z
          .object({
            name: z.string(),
            target: z.number(),
            unit: z.string().optional(),
            actual: z.number().optional(),
          })
          .passthrough()
      )
      .optional(),
    exitTerms: z.string().optional(),
    gatesComplete: z.boolean(),
    inheritedFromDealId: z.string().optional(),
    reassessmentStatus: z.enum(['none', 'pending', 'complete']).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DealListData = z
  .object({
    items: z.array(
      z
        .object({
          dealId: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
          opportunityId: z.string().optional(),
          status: z.enum(['draft', 'gated', 'live', 'remediating', 'exiting']),
          commercialModel: z.enum(['revenueShare', 'fee', 'costPerActivation']),
          commercialTerms: z
            .object({
              model: z.enum(['revenueShare', 'fee', 'costPerActivation']),
              bankRole: z.string().optional(),
              partnerRole: z.string().optional(),
              shareBps: z.number().int().gte(0).lte(10000).optional(),
              feeAmount: z.number().optional(),
              currency: z.string().optional().default('INR'),
            })
            .passthrough()
            .optional(),
          inclusionKpis: z
            .array(
              z
                .object({
                  name: z.string(),
                  target: z.number(),
                  unit: z.string().optional(),
                  actual: z.number().optional(),
                })
                .passthrough()
            )
            .optional(),
          exitTerms: z.string().optional(),
          gatesComplete: z.boolean(),
          inheritedFromDealId: z.string().optional(),
          reassessmentStatus: z
            .enum(['none', 'pending', 'complete'])
            .optional(),
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
const DealListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              dealId: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
              opportunityId: z.string().optional(),
              status: z.enum([
                'draft',
                'gated',
                'live',
                'remediating',
                'exiting',
              ]),
              commercialModel: z.enum([
                'revenueShare',
                'fee',
                'costPerActivation',
              ]),
              commercialTerms: z
                .object({
                  model: z.enum(['revenueShare', 'fee', 'costPerActivation']),
                  bankRole: z.string().optional(),
                  partnerRole: z.string().optional(),
                  shareBps: z.number().int().gte(0).lte(10000).optional(),
                  feeAmount: z.number().optional(),
                  currency: z.string().optional().default('INR'),
                })
                .passthrough()
                .optional(),
              inclusionKpis: z
                .array(
                  z
                    .object({
                      name: z.string(),
                      target: z.number(),
                      unit: z.string().optional(),
                      actual: z.number().optional(),
                    })
                    .passthrough()
                )
                .optional(),
              exitTerms: z.string().optional(),
              gatesComplete: z.boolean(),
              inheritedFromDealId: z.string().optional(),
              reassessmentStatus: z
                .enum(['none', 'pending', 'complete'])
                .optional(),
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
const DealCreateRequest = z
  .object({
    opportunityId: z.string(),
    commercialModel: z.enum(['revenueShare', 'fee', 'costPerActivation']),
    commercialTerms: z
      .object({
        model: z.enum(['revenueShare', 'fee', 'costPerActivation']),
        bankRole: z.string().optional(),
        partnerRole: z.string().optional(),
        shareBps: z.number().int().gte(0).lte(10000).optional(),
        feeAmount: z.number().optional(),
        currency: z.string().optional().default('INR'),
      })
      .passthrough()
      .optional(),
    inclusionKpis: z
      .array(
        z
          .object({
            name: z.string(),
            target: z.number(),
            unit: z.string().optional(),
            actual: z.number().optional(),
          })
          .passthrough()
      )
      .optional(),
    exitTerms: z.string().min(1),
  })
  .passthrough();
const DealResponse = z
  .object({
    data: z
      .object({
        dealId: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
        opportunityId: z.string().optional(),
        status: z.enum(['draft', 'gated', 'live', 'remediating', 'exiting']),
        commercialModel: z.enum(['revenueShare', 'fee', 'costPerActivation']),
        commercialTerms: z
          .object({
            model: z.enum(['revenueShare', 'fee', 'costPerActivation']),
            bankRole: z.string().optional(),
            partnerRole: z.string().optional(),
            shareBps: z.number().int().gte(0).lte(10000).optional(),
            feeAmount: z.number().optional(),
            currency: z.string().optional().default('INR'),
          })
          .passthrough()
          .optional(),
        inclusionKpis: z
          .array(
            z
              .object({
                name: z.string(),
                target: z.number(),
                unit: z.string().optional(),
                actual: z.number().optional(),
              })
              .passthrough()
          )
          .optional(),
        exitTerms: z.string().optional(),
        gatesComplete: z.boolean(),
        inheritedFromDealId: z.string().optional(),
        reassessmentStatus: z.enum(['none', 'pending', 'complete']).optional(),
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
const UpdateDealRequest = z
  .object({
    commercialTerms: z
      .object({
        model: z.enum(['revenueShare', 'fee', 'costPerActivation']),
        bankRole: z.string().optional(),
        partnerRole: z.string().optional(),
        shareBps: z.number().int().gte(0).lte(10000).optional(),
        feeAmount: z.number().optional(),
        currency: z.string().optional().default('INR'),
      })
      .passthrough(),
    inclusionKpis: z.array(
      z
        .object({
          name: z.string(),
          target: z.number(),
          unit: z.string().optional(),
          actual: z.number().optional(),
        })
        .passthrough()
    ),
    exitTerms: z.string(),
  })
  .partial()
  .passthrough();
const StartMaReassessmentRequest = z
  .object({
    inheritedDealIds: z.array(z.string()).min(1),
    notes: z.string().optional(),
  })
  .passthrough();

export const schemas: any = {
  createDeal_Body,
  updateDeal_Body,
  startMaReassessment_Body,
  DealStatus,
  Problem,
  DealId,
  CommercialModel,
  CommercialTerm,
  InclusionKpi,
  Deal,
  DealListData,
  ResponseMeta,
  DealListResponse,
  DealCreateRequest,
  DealResponse,
  UpdateDealRequest,
  StartMaReassessmentRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/deals',
    alias: 'listDeals',
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
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['draft', 'gated', 'live', 'remediating', 'exiting'])
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  dealId: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
                  opportunityId: z.string().optional(),
                  status: z.enum([
                    'draft',
                    'gated',
                    'live',
                    'remediating',
                    'exiting',
                  ]),
                  commercialModel: z.enum([
                    'revenueShare',
                    'fee',
                    'costPerActivation',
                  ]),
                  commercialTerms: z
                    .object({
                      model: z.enum([
                        'revenueShare',
                        'fee',
                        'costPerActivation',
                      ]),
                      bankRole: z.string().optional(),
                      partnerRole: z.string().optional(),
                      shareBps: z.number().int().gte(0).lte(10000).optional(),
                      feeAmount: z.number().optional(),
                      currency: z.string().optional().default('INR'),
                    })
                    .passthrough()
                    .optional(),
                  inclusionKpis: z
                    .array(
                      z
                        .object({
                          name: z.string(),
                          target: z.number(),
                          unit: z.string().optional(),
                          actual: z.number().optional(),
                        })
                        .passthrough()
                    )
                    .optional(),
                  exitTerms: z.string().optional(),
                  gatesComplete: z.boolean(),
                  inheritedFromDealId: z.string().optional(),
                  reassessmentStatus: z
                    .enum(['none', 'pending', 'complete'])
                    .optional(),
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
    path: '/v1/deals',
    alias: 'createDeal',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createDeal_Body,
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
            dealId: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
            opportunityId: z.string().optional(),
            status: z.enum([
              'draft',
              'gated',
              'live',
              'remediating',
              'exiting',
            ]),
            commercialModel: z.enum([
              'revenueShare',
              'fee',
              'costPerActivation',
            ]),
            commercialTerms: z
              .object({
                model: z.enum(['revenueShare', 'fee', 'costPerActivation']),
                bankRole: z.string().optional(),
                partnerRole: z.string().optional(),
                shareBps: z.number().int().gte(0).lte(10000).optional(),
                feeAmount: z.number().optional(),
                currency: z.string().optional().default('INR'),
              })
              .passthrough()
              .optional(),
            inclusionKpis: z
              .array(
                z
                  .object({
                    name: z.string(),
                    target: z.number(),
                    unit: z.string().optional(),
                    actual: z.number().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            exitTerms: z.string().optional(),
            gatesComplete: z.boolean(),
            inheritedFromDealId: z.string().optional(),
            reassessmentStatus: z
              .enum(['none', 'pending', 'complete'])
              .optional(),
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
    path: '/v1/deals/:dealId',
    alias: 'getDeal',
    requestFormat: 'json',
    parameters: [
      {
        name: 'dealId',
        type: 'Path',
        schema: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            dealId: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
            opportunityId: z.string().optional(),
            status: z.enum([
              'draft',
              'gated',
              'live',
              'remediating',
              'exiting',
            ]),
            commercialModel: z.enum([
              'revenueShare',
              'fee',
              'costPerActivation',
            ]),
            commercialTerms: z
              .object({
                model: z.enum(['revenueShare', 'fee', 'costPerActivation']),
                bankRole: z.string().optional(),
                partnerRole: z.string().optional(),
                shareBps: z.number().int().gte(0).lte(10000).optional(),
                feeAmount: z.number().optional(),
                currency: z.string().optional().default('INR'),
              })
              .passthrough()
              .optional(),
            inclusionKpis: z
              .array(
                z
                  .object({
                    name: z.string(),
                    target: z.number(),
                    unit: z.string().optional(),
                    actual: z.number().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            exitTerms: z.string().optional(),
            gatesComplete: z.boolean(),
            inheritedFromDealId: z.string().optional(),
            reassessmentStatus: z
              .enum(['none', 'pending', 'complete'])
              .optional(),
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
    path: '/v1/deals/:dealId',
    alias: 'updateDeal',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateDeal_Body,
      },
      {
        name: 'dealId',
        type: 'Path',
        schema: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            dealId: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
            opportunityId: z.string().optional(),
            status: z.enum([
              'draft',
              'gated',
              'live',
              'remediating',
              'exiting',
            ]),
            commercialModel: z.enum([
              'revenueShare',
              'fee',
              'costPerActivation',
            ]),
            commercialTerms: z
              .object({
                model: z.enum(['revenueShare', 'fee', 'costPerActivation']),
                bankRole: z.string().optional(),
                partnerRole: z.string().optional(),
                shareBps: z.number().int().gte(0).lte(10000).optional(),
                feeAmount: z.number().optional(),
                currency: z.string().optional().default('INR'),
              })
              .passthrough()
              .optional(),
            inclusionKpis: z
              .array(
                z
                  .object({
                    name: z.string(),
                    target: z.number(),
                    unit: z.string().optional(),
                    actual: z.number().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            exitTerms: z.string().optional(),
            gatesComplete: z.boolean(),
            inheritedFromDealId: z.string().optional(),
            reassessmentStatus: z
              .enum(['none', 'pending', 'complete'])
              .optional(),
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
    path: '/v1/deals/:dealId/exit',
    alias: 'startDealExit',
    requestFormat: 'json',
    parameters: [
      {
        name: 'dealId',
        type: 'Path',
        schema: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            dealId: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
            opportunityId: z.string().optional(),
            status: z.enum([
              'draft',
              'gated',
              'live',
              'remediating',
              'exiting',
            ]),
            commercialModel: z.enum([
              'revenueShare',
              'fee',
              'costPerActivation',
            ]),
            commercialTerms: z
              .object({
                model: z.enum(['revenueShare', 'fee', 'costPerActivation']),
                bankRole: z.string().optional(),
                partnerRole: z.string().optional(),
                shareBps: z.number().int().gte(0).lte(10000).optional(),
                feeAmount: z.number().optional(),
                currency: z.string().optional().default('INR'),
              })
              .passthrough()
              .optional(),
            inclusionKpis: z
              .array(
                z
                  .object({
                    name: z.string(),
                    target: z.number(),
                    unit: z.string().optional(),
                    actual: z.number().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            exitTerms: z.string().optional(),
            gatesComplete: z.boolean(),
            inheritedFromDealId: z.string().optional(),
            reassessmentStatus: z
              .enum(['none', 'pending', 'complete'])
              .optional(),
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
    path: '/v1/deals/:dealId/launch',
    alias: 'launchDeal',
    requestFormat: 'json',
    parameters: [
      {
        name: 'dealId',
        type: 'Path',
        schema: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            dealId: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
            opportunityId: z.string().optional(),
            status: z.enum([
              'draft',
              'gated',
              'live',
              'remediating',
              'exiting',
            ]),
            commercialModel: z.enum([
              'revenueShare',
              'fee',
              'costPerActivation',
            ]),
            commercialTerms: z
              .object({
                model: z.enum(['revenueShare', 'fee', 'costPerActivation']),
                bankRole: z.string().optional(),
                partnerRole: z.string().optional(),
                shareBps: z.number().int().gte(0).lte(10000).optional(),
                feeAmount: z.number().optional(),
                currency: z.string().optional().default('INR'),
              })
              .passthrough()
              .optional(),
            inclusionKpis: z
              .array(
                z
                  .object({
                    name: z.string(),
                    target: z.number(),
                    unit: z.string().optional(),
                    actual: z.number().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            exitTerms: z.string().optional(),
            gatesComplete: z.boolean(),
            inheritedFromDealId: z.string().optional(),
            reassessmentStatus: z
              .enum(['none', 'pending', 'complete'])
              .optional(),
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
    path: '/v1/deals/:dealId/remediate',
    alias: 'remediateDeal',
    requestFormat: 'json',
    parameters: [
      {
        name: 'dealId',
        type: 'Path',
        schema: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            dealId: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
            opportunityId: z.string().optional(),
            status: z.enum([
              'draft',
              'gated',
              'live',
              'remediating',
              'exiting',
            ]),
            commercialModel: z.enum([
              'revenueShare',
              'fee',
              'costPerActivation',
            ]),
            commercialTerms: z
              .object({
                model: z.enum(['revenueShare', 'fee', 'costPerActivation']),
                bankRole: z.string().optional(),
                partnerRole: z.string().optional(),
                shareBps: z.number().int().gte(0).lte(10000).optional(),
                feeAmount: z.number().optional(),
                currency: z.string().optional().default('INR'),
              })
              .passthrough()
              .optional(),
            inclusionKpis: z
              .array(
                z
                  .object({
                    name: z.string(),
                    target: z.number(),
                    unit: z.string().optional(),
                    actual: z.number().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            exitTerms: z.string().optional(),
            gatesComplete: z.boolean(),
            inheritedFromDealId: z.string().optional(),
            reassessmentStatus: z
              .enum(['none', 'pending', 'complete'])
              .optional(),
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
    path: '/v1/deals/:dealId/submit-gates',
    alias: 'submitDealToGates',
    requestFormat: 'json',
    parameters: [
      {
        name: 'dealId',
        type: 'Path',
        schema: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            dealId: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
            opportunityId: z.string().optional(),
            status: z.enum([
              'draft',
              'gated',
              'live',
              'remediating',
              'exiting',
            ]),
            commercialModel: z.enum([
              'revenueShare',
              'fee',
              'costPerActivation',
            ]),
            commercialTerms: z
              .object({
                model: z.enum(['revenueShare', 'fee', 'costPerActivation']),
                bankRole: z.string().optional(),
                partnerRole: z.string().optional(),
                shareBps: z.number().int().gte(0).lte(10000).optional(),
                feeAmount: z.number().optional(),
                currency: z.string().optional().default('INR'),
              })
              .passthrough()
              .optional(),
            inclusionKpis: z
              .array(
                z
                  .object({
                    name: z.string(),
                    target: z.number(),
                    unit: z.string().optional(),
                    actual: z.number().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            exitTerms: z.string().optional(),
            gatesComplete: z.boolean(),
            inheritedFromDealId: z.string().optional(),
            reassessmentStatus: z
              .enum(['none', 'pending', 'complete'])
              .optional(),
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
    path: '/v1/deals/ma-reassessments',
    alias: 'startMaReassessment',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: startMaReassessment_Body,
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
            items: z.array(
              z
                .object({
                  dealId: z.string().regex(/^deal_[0-9A-HJKMNP-TV-Z]{26}$/),
                  opportunityId: z.string().optional(),
                  status: z.enum([
                    'draft',
                    'gated',
                    'live',
                    'remediating',
                    'exiting',
                  ]),
                  commercialModel: z.enum([
                    'revenueShare',
                    'fee',
                    'costPerActivation',
                  ]),
                  commercialTerms: z
                    .object({
                      model: z.enum([
                        'revenueShare',
                        'fee',
                        'costPerActivation',
                      ]),
                      bankRole: z.string().optional(),
                      partnerRole: z.string().optional(),
                      shareBps: z.number().int().gte(0).lte(10000).optional(),
                      feeAmount: z.number().optional(),
                      currency: z.string().optional().default('INR'),
                    })
                    .passthrough()
                    .optional(),
                  inclusionKpis: z
                    .array(
                      z
                        .object({
                          name: z.string(),
                          target: z.number(),
                          unit: z.string().optional(),
                          actual: z.number().optional(),
                        })
                        .passthrough()
                    )
                    .optional(),
                  exitTerms: z.string().optional(),
                  gatesComplete: z.boolean(),
                  inheritedFromDealId: z.string().optional(),
                  reassessmentStatus: z
                    .enum(['none', 'pending', 'complete'])
                    .optional(),
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
