/**
 * Partners Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/partners.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Partner = components["schemas"]["Partner"];
export type PartnerId = components["schemas"]["PartnerId"];
export type PartnerListData = components["schemas"]["PartnerListData"];
export type RegulatoryPosture = components["schemas"]["RegulatoryPosture"];
export type PartnerCreateRequest = components["schemas"]["PartnerCreateRequest"];
export type UpdatePartnerRequest = components["schemas"]["UpdatePartnerRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreatePartnerRequestInput = NonNullable<operations["createPartner"]["requestBody"]>["content"]["application/json"];
export type UpdatePartnerRequestInput = NonNullable<operations["updatePartner"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListPartnersParams = NonNullable<operations["listPartners"]["parameters"]["query"]>;
export type GetPartnerParams = operations["getPartner"]["parameters"]["path"];
export type UpdatePartnerParams = operations["updatePartner"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListPartnersResponse = operations["listPartners"]["responses"]["200"]["content"]["application/json"];
export type CreatePartnerResponse = operations["createPartner"]["responses"]["201"]["content"]["application/json"];
export type GetPartnerResponse = operations["getPartner"]["responses"]["200"]["content"]["application/json"];
export type UpdatePartnerResponse = operations["updatePartner"]["responses"]["200"]["content"]["application/json"];


