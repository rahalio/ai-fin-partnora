import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createChannelNode_Body = z
  .object({
    dealId: z.string(),
    nodeType: z.enum(['bc', 'merchant', 'telco', 'ngo']),
    geography: z.string(),
  })
  .passthrough();
const ingestChannelMetrics_Body = z
  .object({
    channelNodeId: z.string(),
    activations: z.number().int().gte(0),
    dormancyRate: z.number().gte(0).lte(1),
    asOf: z.string().datetime({ offset: true }).optional(),
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
const ChannelNodeId = z.string();
const NodeType = z.enum(['bc', 'merchant', 'telco', 'ngo']);
const ChannelNode = z
  .object({
    channelNodeId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
    dealId: z.string(),
    nodeType: z.enum(['bc', 'merchant', 'telco', 'ngo']),
    geography: z.string(),
    activations: z.number().int().gte(0).optional(),
    dormancyRate: z.number().gte(0).lte(1).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ChannelNodeListData = z
  .object({
    items: z.array(
      z
        .object({
          channelNodeId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
          dealId: z.string(),
          nodeType: z.enum(['bc', 'merchant', 'telco', 'ngo']),
          geography: z.string(),
          activations: z.number().int().gte(0).optional(),
          dormancyRate: z.number().gte(0).lte(1).optional(),
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
const ChannelNodeListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              channelNodeId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
              dealId: z.string(),
              nodeType: z.enum(['bc', 'merchant', 'telco', 'ngo']),
              geography: z.string(),
              activations: z.number().int().gte(0).optional(),
              dormancyRate: z.number().gte(0).lte(1).optional(),
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
const ChannelNodeCreateRequest = z
  .object({
    dealId: z.string(),
    nodeType: z.enum(['bc', 'merchant', 'telco', 'ngo']),
    geography: z.string(),
  })
  .passthrough();
const ChannelNodeResponse = z
  .object({
    data: z
      .object({
        channelNodeId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
        dealId: z.string(),
        nodeType: z.enum(['bc', 'merchant', 'telco', 'ngo']),
        geography: z.string(),
        activations: z.number().int().gte(0).optional(),
        dormancyRate: z.number().gte(0).lte(1).optional(),
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
const ChannelMetricsIngestRequest = z
  .object({
    channelNodeId: z.string(),
    activations: z.number().int().gte(0),
    dormancyRate: z.number().gte(0).lte(1),
    asOf: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();

export const schemas: any = {
  createChannelNode_Body,
  ingestChannelMetrics_Body,
  Problem,
  ChannelNodeId,
  NodeType,
  ChannelNode,
  ChannelNodeListData,
  ResponseMeta,
  ChannelNodeListResponse,
  ChannelNodeCreateRequest,
  ChannelNodeResponse,
  ChannelMetricsIngestRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/channels',
    alias: 'listChannelNodes',
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
                  channelNodeId: z
                    .string()
                    .regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
                  dealId: z.string(),
                  nodeType: z.enum(['bc', 'merchant', 'telco', 'ngo']),
                  geography: z.string(),
                  activations: z.number().int().gte(0).optional(),
                  dormancyRate: z.number().gte(0).lte(1).optional(),
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
    path: '/v1/channels',
    alias: 'createChannelNode',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createChannelNode_Body,
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
            channelNodeId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
            dealId: z.string(),
            nodeType: z.enum(['bc', 'merchant', 'telco', 'ngo']),
            geography: z.string(),
            activations: z.number().int().gte(0).optional(),
            dormancyRate: z.number().gte(0).lte(1).optional(),
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
    path: '/v1/channels/:channelNodeId',
    alias: 'getChannelNode',
    requestFormat: 'json',
    parameters: [
      {
        name: 'channelNodeId',
        type: 'Path',
        schema: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            channelNodeId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
            dealId: z.string(),
            nodeType: z.enum(['bc', 'merchant', 'telco', 'ngo']),
            geography: z.string(),
            activations: z.number().int().gte(0).optional(),
            dormancyRate: z.number().gte(0).lte(1).optional(),
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
    path: '/v1/channels/metrics',
    alias: 'ingestChannelMetrics',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: ingestChannelMetrics_Body,
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
            channelNodeId: z.string().regex(/^chn_[0-9A-HJKMNP-TV-Z]{26}$/),
            dealId: z.string(),
            nodeType: z.enum(['bc', 'merchant', 'telco', 'ngo']),
            geography: z.string(),
            activations: z.number().int().gte(0).optional(),
            dormancyRate: z.number().gte(0).lte(1).optional(),
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
