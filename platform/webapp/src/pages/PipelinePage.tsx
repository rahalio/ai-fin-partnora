import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, type ListEnvelope } from "../lib/api";

type Opportunity = {
  opportunityId: string;
  title: string;
  partnerId?: string;
  status: string;
  fitScore?: number;
  regulatoryRisk?: string;
};

export function PipelinePage() {
  const [items, setItems] = useState<Opportunity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<ListEnvelope<Opportunity>>("/v1/opportunities")
      .then((res) => setItems(res.data.items ?? []))
      .catch((e) => setError(String(e.message || e)));
  }, []);

  return (
    <section>
      <h1 className="page-title">Opportunity pipeline</h1>
      <p className="page-lead">
        Score PB, fintech, BC, and NGO opportunities on fit and regulatory risk — stop decorative MoUs.
      </p>
      <div className="toolbar">
        <button
          className="btn"
          type="button"
          onClick={async () => {
            await api("/v1/opportunities", {
              method: "POST",
              body: JSON.stringify({
                title: "Telco remittance corridor pilot",
                partnerId: "ptn_01DEMO00000000000000000001",
                thesis: "Last-mile remittance via agent network under PB deposit-cap",
              }),
            });
            const res = await api<ListEnvelope<Opportunity>>("/v1/opportunities");
            setItems(res.data.items ?? []);
          }}
        >
          Add opportunity
        </button>
      </div>
      {error && <div className="gate-banner lock-banner">{error}</div>}
      {items.length === 0 ? (
        <div className="empty">Empty pipeline — import partner types or create an opportunity.</div>
      ) : (
        <table className="ledger">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Fit</th>
              <th>Risk</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((o) => (
              <tr key={o.opportunityId}>
                <td>{o.title}</td>
                <td>
                  <span className="chip chip-peacock">{o.status}</span>
                </td>
                <td className="mono">{o.fitScore ?? "—"}</td>
                <td className="mono">{o.regulatoryRisk ?? "—"}</td>
                <td>
                  <Link to={`/deals?from=${o.opportunityId}`}>Open deal draft</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
