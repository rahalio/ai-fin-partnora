/** Compliance gate stamp (WEBAPP.md). */
export function ComplianceGateStamp({ status, gateType }: { status: string; gateType: string }) {
  const open = status !== "passed";
  return (
    <span className={`chip ${open ? "chip-gate-open" : "chip-ok"}`}>
      {gateType}:{status}
    </span>
  );
}
