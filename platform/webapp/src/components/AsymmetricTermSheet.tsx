/** Two-column asymmetric term sheet (WEBAPP.md). */
export function AsymmetricTermSheet({
  bankRole,
  partnerRole,
}: {
  bankRole: string;
  partnerRole: string;
}) {
  return (
    <div className="term-sheet">
      <div className="term-col">
        <h3>Bank column</h3>
        <p>{bankRole}</p>
      </div>
      <div className="term-col">
        <h3>Partner column</h3>
        <p>{partnerRole}</p>
      </div>
    </div>
  );
}
