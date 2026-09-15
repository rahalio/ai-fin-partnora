import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const submitGateEvidence_Body = z
  .object({
    gateType: z.enum([
      'outsourcing',
      'kycAml',
      'dataSharing',
      'consumerProtection',
    ]),
    evidenceUri: z.string().url(),
    notes: z.string().optional(),
  })
  .passthrough();
const decideGate_Body = z
  .object({
    status: z.enum(['passed', 'failed']),
    notes: z.string().optional(),
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
const ComplianceGateId = z.string();
const GateType = z.enum([
  'outsourcing',
  'kycAml',
  'dataSharing',
  'consumerProtection',
]);
const GateStatus = z.enum(['pending', 'passed', 'failed']);
const ComplianceGate = z
  .object({
    gateId: z.string().regex(/^gate_[0-9A-HJKMNP-TV-Z]{26}$/),
    dealId: z.string(),
    gateType: z.enum([
      'outsourcing',
      'kycAml',
      'dataSharing',
      'consumerProtection',
    ]),
    status: z.enum(['pending', 'passed', 'failed']),
    evidenceUri: z.string().url().optional(),
    notes: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ComplianceGateListData = z
  .object({
    items: z.array(
      z
        .object({
          gateId: z.string().regex(/^gate_[0-9A-HJKMNP-TV-Z]{26}$/),
          dealId: z.string(),
          gateType: z.enum([
            'outsourcing',
            'kycAml',
            'dataSharing',
            'consumerProtection',
          ]),
          status: z.enum(['pending', 'passed', 'failed']),
          evidenceUri: z.string().url().optional(),
          notes: z.string().optional(),
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
const ComplianceGateListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              gateId: z.string().regex(/^gate_[0-9A-HJKMNP-TV-Z]{26}$/),
              dealId: z.string(),
              gateType: z.enum([
                'outsourcing',
                'kycAml',
                'dataSharing',
                'consumerProtection',
              ]),
              status: z.enum(['pending', 'passed', 'failed']),
              evidenceUri: z.string().url().optional(),
              notes: z.string().optional(),
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
const GateEvidenceRequest = z
  .object({
    gateType: z.enum([
      'outsourcing',
      'kycAml',
      'dataSharing',
      'consumerProtection',
    ]),
    evidenceUri: z.string().url(),
    notes: z.string().optional(),
  })
  .passthrough();
const ComplianceGateResponse = z
  .object({
    data: z
      .object({
        gateId: z.string().regex(/^gate_[0-9A-HJKMNP-TV-Z]{26}$/),
        dealId: z.string(),
        gateType: z.enum([
          'outsourcing',
          'kycAml',
          'dataSharing',
          'consumerProtection',
        ]),
        status: z.enum(['pending', 'passed', 'failed']),
        evidenceUri: z.string().url().optional(),
        notes: z.string().optional(),
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
const PassFailGateRequest = z
  .object({
    status: z.enum(['passed', 'failed']),
    notes: z.string().optional(),
  })
  .passthrough();

export const schemas: any = {
  submitGateEvidence_Body,
  decideGate_Body,
  Problem,
  ComplianceGateId,
  GateType,
  GateStatus,
  ComplianceGate,
  ComplianceGateListData,
  ResponseMeta,
  ComplianceGateListResponse,
  GateEvidenceRequest,
  ComplianceGateResponse,
  PassFailGateRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/deals/:dealId/gates',
    alias: 'listDealGates',
    requestFormat: 'json',
    parameters: [
      {
        name: 'dealId',
        type: 'Path',
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
                  gateId: z.string().regex(/^gate_[0-9A-HJKMNP-TV-Z]{26}$/),
                  dealId: z.string(),
                  gateType: z.enum([
                    'outsourcing',
                    'kycAml',
                    'dataSharing',
                    'consumerProtection',
                  ]),
                  status: z.enum(['pending', 'passed', 'failed']),
                  evidenceUri: z.string().url().optional(),
                  notes: z.string().optional(),
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
    path: '/v1/deals/:dealId/gates',
    alias: 'submitGateEvidence',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: submitGateEvidence_Body,
      },
      {
        name: 'dealId',
        type: 'Path',
        schema: z.string(),
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
            gateId: z.string().regex(/^gate_[0-9A-HJKMNP-TV-Z]{26}$/),
            dealId: z.string(),
            gateType: z.enum([
              'outsourcing',
              'kycAml',
              'dataSharing',
              'consumerProtection',
            ]),
            status: z.enum(['pending', 'passed', 'failed']),
            evidenceUri: z.string().url().optional(),
            notes: z.string().optional(),
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
    path: '/v1/deals/:dealId/gates/:gateId',
    alias: 'decideGate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: decideGate_Body,
      },
      {
        name: 'dealId',
        type: 'Path',
        schema: z.string(),
      },
      {
        name: 'gateId',
        type: 'Path',
        schema: z.string().regex(/^gate_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            gateId: z.string().regex(/^gate_[0-9A-HJKMNP-TV-Z]{26}$/),
            dealId: z.string(),
            gateType: z.enum([
              'outsourcing',
              'kycAml',
              'dataSharing',
              'consumerProtection',
            ]),
            status: z.enum(['pending', 'passed', 'failed']),
            evidenceUri: z.string().url().optional(),
            notes: z.string().optional(),
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
