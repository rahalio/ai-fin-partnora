/** Regulatory posture + prohibited-activity lock chip (WEBAPP.md). */
export function RegulatoryPostureLock({
  posture,
  prohibited = [],
}: {
  posture: string;
  prohibited?: string[];
}) {
  return (
    <div className="lock-banner">
      <span className="chip chip-posture">{posture}</span>
      <div>
        {prohibited.length > 0
          ? `Prohibited: ${prohibited.join(", ")}`
          : "No prohibited activities listed"}
      </div>
    </div>
  );
}
