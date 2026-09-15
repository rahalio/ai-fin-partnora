/**
 * Opportunities Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/opportunities.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Opportunity = components["schemas"]["Opportunity"];
export type OpportunityId = components["schemas"]["OpportunityId"];
export type OpportunityListData = components["schemas"]["OpportunityListData"];
export type OpportunityStatus = components["schemas"]["OpportunityStatus"];
export type RegulatoryRisk = components["schemas"]["RegulatoryRisk"];
export type AdvanceOpportunityRequest = components["schemas"]["AdvanceOpportunityRequest"];
export type OpportunityCreateRequest = components["schemas"]["OpportunityCreateRequest"];
export type ScoreOpportunityRequest = components["schemas"]["ScoreOpportunityRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateOpportunityRequestInput = NonNullable<operations["createOpportunity"]["requestBody"]>["content"]["application/json"];
export type ScoreOpportunityRequestInput = NonNullable<operations["scoreOpportunity"]["requestBody"]>["content"]["application/json"];
export type AdvanceOpportunityRequestInput = NonNullable<operations["advanceOpportunity"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListOpportunitiesParams = NonNullable<operations["listOpportunities"]["parameters"]["query"]>;
export type GetOpportunityParams = operations["getOpportunity"]["parameters"]["path"];
export type ScoreOpportunityParams = operations["scoreOpportunity"]["parameters"]["path"];
export type AdvanceOpportunityParams = operations["advanceOpportunity"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListOpportunitiesResponse = operations["listOpportunities"]["responses"]["200"]["content"]["application/json"];
export type CreateOpportunityResponse = operations["createOpportunity"]["responses"]["201"]["content"]["application/json"];
export type GetOpportunityResponse = operations["getOpportunity"]["responses"]["200"]["content"]["application/json"];
export type ScoreOpportunityResponse = operations["scoreOpportunity"]["responses"]["200"]["content"]["application/json"];
export type AdvanceOpportunityResponse = operations["advanceOpportunity"]["responses"]["200"]["content"]["application/json"];


