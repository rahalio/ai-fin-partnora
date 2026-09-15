/**
 * Channels Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/channels.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ChannelNode = components["schemas"]["ChannelNode"];
export type ChannelNodeId = components["schemas"]["ChannelNodeId"];
export type ChannelNodeListData = components["schemas"]["ChannelNodeListData"];
export type NodeType = components["schemas"]["NodeType"];
export type ChannelMetricsIngestRequest = components["schemas"]["ChannelMetricsIngestRequest"];
export type ChannelNodeCreateRequest = components["schemas"]["ChannelNodeCreateRequest"];
export type Channel = operations["listChannelNodes"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateChannelNodeRequestInput = NonNullable<operations["createChannelNode"]["requestBody"]>["content"]["application/json"];
export type IngestChannelMetricsRequestInput = NonNullable<operations["ingestChannelMetrics"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListChannelNodesParams = NonNullable<operations["listChannelNodes"]["parameters"]["query"]>;
export type GetChannelNodeParams = operations["getChannelNode"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListChannelNodesResponse = operations["listChannelNodes"]["responses"]["200"]["content"]["application/json"];
export type CreateChannelNodeResponse = operations["createChannelNode"]["responses"]["201"]["content"]["application/json"];
export type GetChannelNodeResponse = operations["getChannelNode"]["responses"]["200"]["content"]["application/json"];
export type IngestChannelMetricsResponse = operations["ingestChannelMetrics"]["responses"]["202"]["content"]["application/json"];


