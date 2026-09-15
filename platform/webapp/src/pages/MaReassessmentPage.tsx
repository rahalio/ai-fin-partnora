import { useState } from "react";
import { api, type ListEnvelope } from "../lib/api";

type Deal = {
  dealId: string;
  reassessmentStatus?: string;
  status: string;
};

export function MaReassessmentPage() {
  const [items, setItems] = useState<Deal[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <section>
      <h1 className="page-title">M&A partnership reassessment</h1>
      <p className="page-lead">
        Consolidation that inherits partnerships triggers portfolio reassessment (BR-8). Unassessed inherited deals
        cannot claim steady state.
      </p>
      <div className="toolbar">
        <button
          className="btn"
          type="button"
          onClick={async () => {
            const list = await api<ListEnvelope<Deal>>("/v1/deals");
            const ids = (list.data.items ?? []).map((d) => d.dealId);
            if (ids.length === 0) {
              setMsg("No deals to reassess yet.");
              return;
            }
            const res = await api<ListEnvelope<Deal>>("/v1/deals/ma-reassessments", {
              method: "POST",
              body: JSON.stringify({ inheritedDealIds: ids, notes: "Post-amalgamation portfolio review" }),
            });
            setItems(res.data.items ?? []);
            setMsg(`Reassessment pending for ${res.data.items?.length ?? 0} deals`);
          }}
        >
          Start reassessment
        </button>
      </div>
      {msg && <div className="lock-banner">{msg}</div>}
      <table className="ledger">
        <thead>
          <tr>
            <th>Deal</th>
            <th>Status</th>
            <th>Reassessment</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.dealId}>
              <td className="mono">{d.dealId}</td>
              <td>{d.status}</td>
              <td>
                <span className="chip chip-gate-open">{d.reassessmentStatus || "pending"}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
