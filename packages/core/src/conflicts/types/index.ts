/**
 * Conflicts Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/conflicts.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Conflict = components["schemas"]["Conflict"];
export type ConflictId = components["schemas"]["ConflictId"];
export type ConflictListData = components["schemas"]["ConflictListData"];
export type ConflictStatus = components["schemas"]["ConflictStatus"];
export type AcceptConflictMitigationRequest = components["schemas"]["AcceptConflictMitigationRequest"];
export type ConflictCreateRequest = components["schemas"]["ConflictCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateConflictRequestInput = NonNullable<operations["createConflict"]["requestBody"]>["content"]["application/json"];
export type AcceptConflictMitigationRequestInput = NonNullable<operations["acceptConflictMitigation"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListConflictsParams = NonNullable<operations["listConflicts"]["parameters"]["query"]>;
export type GetConflictParams = operations["getConflict"]["parameters"]["path"];
export type AcceptConflictMitigationParams = operations["acceptConflictMitigation"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListConflictsResponse = operations["listConflicts"]["responses"]["200"]["content"]["application/json"];
export type CreateConflictResponse = operations["createConflict"]["responses"]["201"]["content"]["application/json"];
export type GetConflictResponse = operations["getConflict"]["responses"]["200"]["content"]["application/json"];
export type AcceptConflictMitigationResponse = operations["acceptConflictMitigation"]["responses"]["200"]["content"]["application/json"];


