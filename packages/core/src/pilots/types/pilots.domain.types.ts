/**
 * Pilots Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/pilots.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Pilot = components["schemas"]["Pilot"];
export type PilotId = components["schemas"]["PilotId"];
export type PilotKind = components["schemas"]["PilotKind"];
export type PilotListData = components["schemas"]["PilotListData"];
export type PilotStatus = components["schemas"]["PilotStatus"];
export type AttachPilotParentRequest = components["schemas"]["AttachPilotParentRequest"];
export type PilotCreateRequest = components["schemas"]["PilotCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreatePilotRequestInput = NonNullable<operations["createPilot"]["requestBody"]>["content"]["application/json"];
export type AttachPilotParentRequestInput = NonNullable<operations["attachPilotParent"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListPilotsParams = NonNullable<operations["listPilots"]["parameters"]["query"]>;
export type GetPilotParams = operations["getPilot"]["parameters"]["path"];
export type AttachPilotParentParams = operations["attachPilotParent"]["parameters"]["path"];
export type QuarantinePilotParams = operations["quarantinePilot"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListPilotsResponse = operations["listPilots"]["responses"]["200"]["content"]["application/json"];
export type CreatePilotResponse = operations["createPilot"]["responses"]["201"]["content"]["application/json"];
export type GetPilotResponse = operations["getPilot"]["responses"]["200"]["content"]["application/json"];
export type AttachPilotParentResponse = operations["attachPilotParent"]["responses"]["200"]["content"]["application/json"];
export type QuarantinePilotResponse = operations["quarantinePilot"]["responses"]["200"]["content"]["application/json"];


