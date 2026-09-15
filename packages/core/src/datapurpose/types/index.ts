/**
 * Datapurpose Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/datapurpose.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DataExportAttempt = components["schemas"]["DataExportAttempt"];
export type DataPurpose = components["schemas"]["DataPurpose"];
export type DataPurposeId = components["schemas"]["DataPurposeId"];
export type DataPurposeListData = components["schemas"]["DataPurposeListData"];
export type DataExportAttemptRequest = components["schemas"]["DataExportAttemptRequest"];
export type DataPurposeCreateRequest = components["schemas"]["DataPurposeCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateDataPurposeRequestInput = NonNullable<operations["createDataPurpose"]["requestBody"]>["content"]["application/json"];
export type CheckDataExportRequestInput = NonNullable<operations["checkDataExport"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListDataPurposesParams = NonNullable<operations["listDataPurposes"]["parameters"]["query"]>;
export type GetDataPurposeParams = operations["getDataPurpose"]["parameters"]["path"];
export type RevokeDataPurposeParams = operations["revokeDataPurpose"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListDataPurposesResponse = operations["listDataPurposes"]["responses"]["200"]["content"]["application/json"];
export type CreateDataPurposeResponse = operations["createDataPurpose"]["responses"]["201"]["content"]["application/json"];
export type GetDataPurposeResponse = operations["getDataPurpose"]["responses"]["200"]["content"]["application/json"];
export type CheckDataExportResponse = operations["checkDataExport"]["responses"]["200"]["content"]["application/json"];


