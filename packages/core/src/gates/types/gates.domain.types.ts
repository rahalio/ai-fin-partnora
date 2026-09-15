/**
 * Gates Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/gates.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ComplianceGate = components["schemas"]["ComplianceGate"];
export type ComplianceGateId = components["schemas"]["ComplianceGateId"];
export type ComplianceGateListData = components["schemas"]["ComplianceGateListData"];
export type GateStatus = components["schemas"]["GateStatus"];
export type GateType = components["schemas"]["GateType"];
export type GateEvidenceRequest = components["schemas"]["GateEvidenceRequest"];
export type PassFailGateRequest = components["schemas"]["PassFailGateRequest"];
export type Gate = operations["listDealGates"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type SubmitGateEvidenceRequestInput = NonNullable<operations["submitGateEvidence"]["requestBody"]>["content"]["application/json"];
export type DecideGateRequestInput = NonNullable<operations["decideGate"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListDealGatesParams = operations["listDealGates"]["parameters"]["path"];
export type SubmitGateEvidenceParams = operations["submitGateEvidence"]["parameters"]["path"];
export type DecideGateParams = operations["decideGate"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListDealGatesResponse = operations["listDealGates"]["responses"]["200"]["content"]["application/json"];
export type SubmitGateEvidenceResponse = operations["submitGateEvidence"]["responses"]["201"]["content"]["application/json"];
export type DecideGateResponse = operations["decideGate"]["responses"]["200"]["content"]["application/json"];


