/**
 * Ownership Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/ownership.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CustomerOwnershipRule = components["schemas"]["CustomerOwnershipRule"];
export type CustomerOwnershipRuleListData = components["schemas"]["CustomerOwnershipRuleListData"];
export type OwnershipRuleId = components["schemas"]["OwnershipRuleId"];
export type OwnershipRuleCreateRequest = components["schemas"]["OwnershipRuleCreateRequest"];
export type UpdateOwnershipRuleRequest = components["schemas"]["UpdateOwnershipRuleRequest"];
export type OwnershipRule = operations["listOwnershipRules"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateOwnershipRuleRequestInput = NonNullable<operations["createOwnershipRule"]["requestBody"]>["content"]["application/json"];
export type UpdateOwnershipRuleRequestInput = NonNullable<operations["updateOwnershipRule"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListOwnershipRulesParams = NonNullable<operations["listOwnershipRules"]["parameters"]["query"]>;
export type GetOwnershipRuleParams = operations["getOwnershipRule"]["parameters"]["path"];
export type UpdateOwnershipRuleParams = operations["updateOwnershipRule"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListOwnershipRulesResponse = operations["listOwnershipRules"]["responses"]["200"]["content"]["application/json"];
export type CreateOwnershipRuleResponse = operations["createOwnershipRule"]["responses"]["201"]["content"]["application/json"];
export type GetOwnershipRuleResponse = operations["getOwnershipRule"]["responses"]["200"]["content"]["application/json"];
export type UpdateOwnershipRuleResponse = operations["updateOwnershipRule"]["responses"]["200"]["content"]["application/json"];


