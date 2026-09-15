import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api, type ListEnvelope } from "../lib/api";

type Conflict = {
  conflictId: string;
  dealId: string;
  description: string;
  mitigation?: string;
  status: string;
};

export function ConflictsPage() {
  const [params] = useSearchParams();
  const dealId = params.get("dealId") || "";
  const [items, setItems] = useState<Conflict[]>([]);

  async function refresh() {
    const q = dealId ? `?dealId=${encodeURIComponent(dealId)}` : "";
    const res = await api<ListEnvelope<Conflict>>(`/v1/conflicts${q}`);
    setItems(res.data.items ?? []);
  }

  useEffect(() => {
    refresh().catch(console.error);
  }, [dealId]);

  return (
    <section>
      <h1 className="page-title">Coopetition conflict register</h1>
      <p className="page-lead">
        Log overlapping products with mitigations (exclusivity, Chinese walls, ownership). Stale conflicts block renewal
        (BR-4). Commercial terms stay need-to-know redacted.
      </p>
      <div className="toolbar">
        <button
          className="btn"
          type="button"
          onClick={async () => {
            await api("/v1/conflicts", {
              method: "POST",
              body: JSON.stringify({
                dealId: dealId || "deal_unknown",
                description: "Partner wallet competes with bank UPI offer in same corridor",
                mitigation: "Chinese wall on pricing; exclusivity window 12 months on remittance",
                overlappingProducts: ["UPI", "remittance"],
              }),
            });
            await refresh();
          }}
        >
          Log conflict
        </button>
      </div>
      <table className="ledger">
        <thead>
          <tr>
            <th>Conflict</th>
            <th>Status</th>
            <th>Mitigation</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.conflictId}>
              <td>{c.description}</td>
              <td>
                <span className={`chip ${c.status === "accepted" ? "chip-ok" : "chip-gate-open"}`}>{c.status}</span>
              </td>
              <td>{c.mitigation || "—"}</td>
              <td>
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={async () => {
                    await api(`/v1/conflicts/${c.conflictId}/accept`, { method: "POST", body: "{}" });
                    await refresh();
                  }}
                >
                  Accept mitigation
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
