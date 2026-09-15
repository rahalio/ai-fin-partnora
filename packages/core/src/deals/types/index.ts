/**
 * Deals Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/deals.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CommercialModel = components["schemas"]["CommercialModel"];
export type CommercialTerm = components["schemas"]["CommercialTerm"];
export type Deal = components["schemas"]["Deal"];
export type DealId = components["schemas"]["DealId"];
export type DealListData = components["schemas"]["DealListData"];
export type DealStatus = components["schemas"]["DealStatus"];
export type InclusionKpi = components["schemas"]["InclusionKpi"];
export type DealCreateRequest = components["schemas"]["DealCreateRequest"];
export type StartMaReassessmentRequest = components["schemas"]["StartMaReassessmentRequest"];
export type UpdateDealRequest = components["schemas"]["UpdateDealRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateDealRequestInput = NonNullable<operations["createDeal"]["requestBody"]>["content"]["application/json"];
export type UpdateDealRequestInput = NonNullable<operations["updateDeal"]["requestBody"]>["content"]["application/json"];
export type StartMaReassessmentRequestInput = NonNullable<operations["startMaReassessment"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListDealsParams = NonNullable<operations["listDeals"]["parameters"]["query"]>;
export type GetDealParams = operations["getDeal"]["parameters"]["path"];
export type UpdateDealParams = operations["updateDeal"]["parameters"]["path"];
export type SubmitDealToGatesParams = operations["submitDealToGates"]["parameters"]["path"];
export type LaunchDealParams = operations["launchDeal"]["parameters"]["path"];
export type RemediateDealParams = operations["remediateDeal"]["parameters"]["path"];
export type StartDealExitParams = operations["startDealExit"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListDealsResponse = operations["listDeals"]["responses"]["200"]["content"]["application/json"];
export type CreateDealResponse = operations["createDeal"]["responses"]["201"]["content"]["application/json"];
export type GetDealResponse = operations["getDeal"]["responses"]["200"]["content"]["application/json"];
export type UpdateDealResponse = operations["updateDeal"]["responses"]["200"]["content"]["application/json"];
export type SubmitDealToGatesResponse = operations["submitDealToGates"]["responses"]["200"]["content"]["application/json"];
export type LaunchDealResponse = operations["launchDeal"]["responses"]["200"]["content"]["application/json"];
export type RemediateDealResponse = operations["remediateDeal"]["responses"]["200"]["content"]["application/json"];
export type StartDealExitResponse = operations["startDealExit"]["responses"]["200"]["content"]["application/json"];
export type StartMaReassessmentResponse = operations["startMaReassessment"]["responses"]["200"]["content"]["application/json"];


