/**
 * Audits Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/audits.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AuditExport = components["schemas"]["AuditExport"];
export type AuditExportId = components["schemas"]["AuditExportId"];
export type AuditExportListData = components["schemas"]["AuditExportListData"];
export type AuditExportStatus = components["schemas"]["AuditExportStatus"];
export type Incident = components["schemas"]["Incident"];
export type IncidentId = components["schemas"]["IncidentId"];
export type IncidentListData = components["schemas"]["IncidentListData"];
export type IncidentSeverity = components["schemas"]["IncidentSeverity"];
export type AuditExportCreateRequest = components["schemas"]["AuditExportCreateRequest"];
export type IncidentCreateRequest = components["schemas"]["IncidentCreateRequest"];
export type Export = operations["listAuditExports"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateAuditExportRequestInput = NonNullable<operations["createAuditExport"]["requestBody"]>["content"]["application/json"];
export type CreateIncidentRequestInput = NonNullable<operations["createIncident"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListAuditExportsParams = NonNullable<operations["listAuditExports"]["parameters"]["query"]>;
export type GetAuditExportParams = operations["getAuditExport"]["parameters"]["path"];
export type ListIncidentsParams = NonNullable<operations["listIncidents"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListAuditExportsResponse = operations["listAuditExports"]["responses"]["200"]["content"]["application/json"];
export type CreateAuditExportResponse = operations["createAuditExport"]["responses"]["201"]["content"]["application/json"];
export type GetAuditExportResponse = operations["getAuditExport"]["responses"]["200"]["content"]["application/json"];
export type ListIncidentsResponse = operations["listIncidents"]["responses"]["200"]["content"]["application/json"];
export type CreateIncidentResponse = operations["createIncident"]["responses"]["201"]["content"]["application/json"];


